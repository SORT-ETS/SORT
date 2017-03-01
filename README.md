# SORT
Sustainability through Object Recognition and Training

This project aims to educate members of a community on how to sort residual waste items.

## Important links
[Scrum board](https://waffle.io/SORT-ETS/SORT) - Task list created from GitHub issues.

## Development workflow
This project uses the [recommended workflow](https://github.com/waffleio/waffle.io/wiki/Recommended-Workflow-Using-Pull-Requests-&-Automatic-Work-Tracking) with [Waffle.io](https://waffle.io/SORT-ETS/SORT).

1. Choose an Issue from the Ready columns.
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

### Using Docker and Docker-compose

1. Follow the [instructions to install Docker](https://docs.docker.com/engine/installation/) to install Docker.

2. Follow the [instruction to install Docker-Compose](https://docs.docker.com/compose/install/).

3. From a terminal:

```shell
  docker-compose build  # Build all the images config for the server and web-client.
  docker-compose up     # Start server and web-client.
```

4. Open your favorite browser at [localhost:6088](localhost:6088) and you should see the _web-client_ showing the _server_ version via the reverse proxy.

5. For the _web-client_ you can also start a NPM task that compile on file changes.

```shell
  # In a new terminal!
  cd web-client/

  npm run watch-client  # Watch JavaScript files for changes and recompile.
```

### Locally

Refer to `SORT/server/README.md` and `SORT/web-client/README.md`.

## Version
0.0.2

## License
AGPL-3.0
