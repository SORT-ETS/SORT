# Web-client

This is our marvelous Web-client to query the SORT server.

## Development

### Locally

This option is for people who want to install everything.

​	1A\. Locally with stubs (random data)

Refer to `SORT/server/README.md` section `Development/Locally`

​	1B\. Using an external server

This option is for the ones who want to develop only the web-client and don't
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

  npm install          # Install node dependencies.
  npm run build-client # Compiles code for the first time!

  npm start      # Start the NodeJs server.

  # Optional watch for change to compile ES2015 code.
  npm run watch-client
```

​	3\. Enjoy

### Using Docker

Refer to `SORT/README.md`.
