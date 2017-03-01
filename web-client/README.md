# Web-client

This is our marvelous Web-client to query the SORT server.

## Development

### Locally

This option is for people who wants to install everything.

​	1A\. Locally with stubs (random data)

Refer to `SORT/server/README.md` section `Development/Locally`

​	1B\. Using an external server

This option is for the ones who wants to develop only the web-client and don't
want to touch the server. This option is nice but you'll not see the server log.

Set the PROXY location.

```shell
  # Set an environment variable for the proxy.
  export PROXY=sort.ntfournier.com
```

Be careful if you develop naked! The images sent are automatically save on the
server.

​	2\. Start the web-client!

```sh
  cd SORT/web-client/

  npm install          # Install node dependancies.
  npm run build-client # Compile code for the first time!

  npm start      # Start the NodeJs server.

  # Optional watch for change to compile ES2015 code.
  npm run watch-client
```

​	3\. Enjoy


### With Docker (Hint: if problems try other options)

This is the solution for the fearless (a.k.a Taylor Swift)

1. Install Docker and Docker-compose.

```shell
  sensible-browser https://docs.docker.com/engine/installation/
  sensible-browser https://docs.docker.com/compose/install/
```

2. Build and start the images.

```shell
  docker-compose build  # Build all the images config for server and web-client.
  docker-compose up     # Start server and web-client.
```

3. Optional: Watch for changes!

```shell
  # In a new terminal!
  npm run watch-client  # Watch JavaScript files for changes and recompile.
```

