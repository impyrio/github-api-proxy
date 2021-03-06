'use strict';

const express = require('express');
const session = require('express-session');
const proxy = require('express-http-proxy');

// Configuration
const host = 'https://api.github.com/';
const archon_auth = process.env.AUTH;
const port = process.env.PORT || 8000;
const mongo_config = {
  uri: process.env.MONGO_URI,
  databaseName: process.env.MONGO_DB,
  collection: process.env.MONGO_COLLECTION
};
const cookie = {
  maxAge: parseInt(process.env.COOKIE_MAXAGE) || 1000*60*60*24*7 // 1 wk
};
const session_secret = process.env.SESSION_SECRET || 'keyboard cat';

const app = express();

// session setup
const MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore(mongo_config);
store.on('error', function(error) {
  console.error(error);
  process.exit(1);
});
app.use(session({
  secret: session_secret,
  cookie,
  store,
  resave: false,
  saveUninitialized: false
}));

app.use('/a', proxy(host, {
  proxyReqOptDecorator(proxyReqOpts, srcReq) {
    proxyReqOpts.headers['Authorization'] = archon_auth;
    if (!proxyReqOpts.headers['User-Agent'])
      proxyReqOpts.headers['User-Agent'] = 'github-api-proxy';
    
    return proxyReqOpts;
  }
}));

app.use('/u', proxy(host, {
  proxyReqOptDecorator(proxyReqOpts, req) {
    const token = req.session.access_token;

    if (token)
      proxyReqOpts.headers['Authorization'] = `token ${token}`;

    if (!proxyReqOpts.headers['User-Agent'])
      proxyReqOpts.headers['User-Agent'] = 'github-api-proxy';
    
    // keep our cookies to ourselves!
    delete proxyReqOpts.headers.cookie;
    
    return proxyReqOpts;
  }
}));

app.get('/', (req, res) => {
  const base = `${req.protocol}://${req.get('Host')}`;
  res.json({
    as_archon_uri: base + '/a',
    as_user_uri: base + '/u',
  })
});

app.listen(port);