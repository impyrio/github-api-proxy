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

        docker build -t github-api-proxy .

 4. Create and start the docker contianer using one of the following methods:

    **Using [Kitematic][2]**

     1. Open Kitematic
     2. In the container list to the left, select '+ NEW'
     3. From the menu on the upper right, select 'My Images'
     4. Find `github-api-proxy` in the list of images, and click the 'Create'
        button.
     5. Now with the newly created container selected, select 'Settings'
     6. Under *Environment Variables*, add a new row with:

        | Key  | Value |
        |------|-------|
        | AUTH | token &lt;your PAT> |
     7. Select 'Home', then click the link to open a web browser to verify the
        Docker instance is correctly running.
    
    **Using the CLI**

     1. Create a container for the generated image:
        
            docker create \
                --env AUTH='token <your PAT>' \
                --name github-api-proxy \
                --publish-all \
                github-api-proxy

     2. Start the container:

            docker start github-api-proxy
    
     3. Take note of the (randomly assigned) port number mapped to the 
        container port `80/tcp`:

            docker port github-api-proxy 
     4. Open a web browser and point it to http://localhost:&lt;port>/

 [1]: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
 [2]: https://kitematic.com/