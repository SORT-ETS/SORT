# SORT
Sustainability through Object Recognition and Training

This project aims to educate members of a community on how to sort residual waste items.

## Important links
[Scrum board](https://waffle.io/SORT-ETS/SORT) - Tasks list created from GitHub issues.

## Development workflow
This project use the [recommended workflow](https://github.com/waffleio/waffle.io/wiki/Recommended-Workflow-Using-Pull-Requests-&-Automatic-Work-Tracking) with [Waffle.io](https://waffle.io/SORT-ETS/SORT).

1. Choose an Issues from the Ready columns.
2. Create a new local branch with the issue number and push it.

  ```
  	git checkout -b pr-myBranch-#2
  	git push --set-upstream origin pr-myBranch-#2
  ```
3. Work on your branch creating new commits.
4. Push your final code.
5. Create a pull request with the word closes like "closes #2".
6. Add reviewers.

## How to develop

1\. Follow the [instructions to install Docker](https://docs.docker.com/engine/installation/) to install Docker.

2\. Follow the [instruction to install Docker-Compose](https://docs.docker.com/compose/install/).

2a\. Optional: To use Nvidia CUDA install [nvidia-docker](https://github.com/NVIDIA/nvidia-docker#quick-start) and [nvidia-docker-compose](https://github.com/eywalker/nvidia-docker-compose)

3.1\. CPU only, from a terminal:

  ```sh
    docker-compose build
    docker-compose up
  ```

3.2\. With Nvidia CUDA, from a terminal:

  ```sh
    nvidia-docker-compose -f docker-compose-nvidia.yml build # Build using the default file and docker-compose-nvidia.yml
    nvidia-docker-compose up # Start containers with GPU devices
  ```

4\. Open your favorite browser at [localhost:6088](localhost:6088) and you should see the _web-client_ showing the _server_ version via the reverse proxy.

### Web-client

To develop the web-client on your local machine:

  ```sh
    cd web-client
    npm install
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
  ```

You can also use the normal instructions just be sure to run step 3 when you're installing new NPM packages.

## Version
0.0.2

## Licence
AGPL-3.0
