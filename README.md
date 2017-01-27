# SORT - Sustainability through Object Recognition and Training

This project aims to educate members of a community on how to sort residual waste items.

## How to develop

1. Follow the [instructions to install Docker](https://docs.docker.com/engine/installation/) to install Docker.
2. Follow the [instruction to install Docker-Compose](https://docs.docker.com/compose/install/).
3. From a terminal:

  ```sh
    docker-compose build
    docker-compose up
  ```
4. Open your favorite browser at [localhost:6088](localhost:6088) and you should see the _web-client_ showing the _server_ version via the reverse proxy.

### Web-client

To develop the web-client on your local machine:

  ```sh
    cd web-client
    npm install
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
  ```

You can also use the normal instructions just be sure to run step 3 when you're installing new NPM packages.
