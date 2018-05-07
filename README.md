# GitHub API Poxy Server

This project creates a proxy for the GitHub API that hides details regarding
authorization / authentication. This should be configured to only accept
requests from within the game's runtime VPC. In this way, the game allows the
Archon process to make fully authenticated calls to the GitHub API, without
having access to any authentication info that could be otherwise exposed.

## Troubleshooting

This proxy provides two authorization modes: *as Archon* or *as user*. 

### Run *as Archon* Setup

In *as Archon* mode, the proxy uses a single global access tokens to authorize
all requests.

 1. Create a [personal access token for your GitHub account][1].
 2. Create and start a new container running this image with the 
    [`docker run`][2] command.
        
        docker run \
            --name github-api-proxy \
            --env AUTH='token <your PAT>' \
            --detach \
            --publish-all \
            impyrio/github-api-proxy:latest

 3. Take note of the (randomly assigned) port number mapped to the
    container port `8000/tcp`:

        docker port github-api-proxy 
 
 4. Open a web browser and point it to `http://localhost:&lt;port&gt;/a`

    > **NOTE:** if running [Kitematic][3], you can simply click the link in the
    > upper-right corner of the image's preview pane.

### Run *as Uase* Setup

In *as user* mode, the proxy uses a different access token per session, so you
must first configure session support.

 1. **TBD**

 [1]: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
 [2]: https://docs.docker.com/engine/reference/commandline/run/
 [3]: https://kitematic.com/