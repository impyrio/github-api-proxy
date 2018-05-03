#
# Dockerfile for GitHub API proxy server
#
FROM alpine:3.6
LABEL author="Patrick Kohler"

RUN apk add --no-cache nginx-mod-http-lua

# Delete default config
RUN rm -r /etc/nginx/conf.d && rm /etc/nginx/nginx.conf

# Create folder for PID file
RUN mkdir -p /run/nginx

# Add our nginx conf
RUN mkdir -p /data/nginx/cache
COPY ./nginx.conf /etc/nginx

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
