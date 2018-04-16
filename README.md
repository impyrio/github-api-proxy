# GitHub API Poxy Server

This project creates a proxy for the GitHub API that hides details regarding
authorization / authentication. This should be configured to only accept
requests from within the game's runtime VPC. In this way, the game allows the
Archon process to make fully authenticated calls to the GitHub API, without
having access to any authentication info that could be otherwise exposed.

## Troubleshooting
You can run your own copy of this image for local testing with the following procedure.

 1. Check out this project.
 2. Create a [personal access token][1].
 3. Build the Docker image, baking in the auth token into the image:

        docker build . \
            -t impyrio/github-api-proxy \
            --build-arg AUTH='token <PAT>'
 5. Create a container for the generated image:
        
        docker create -p 80:80 impyrio/github-api-proxy
 6. Start the container:

        docker start <name or id of container>
 7. Test it out by going to http://localhost/.

 [1]: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/