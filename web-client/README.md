# Web-client

This is our marvelous Web-client to query the SORT server.

## How to develop

### Locally with Stubs (random data)

This option is for people who wants to install everything.

1. Modify `SORT/server/server.py` to use STUB. On line 20:

```python
  app.config['USE_STUB'] = True
```

2. Start the Python server (refer to SORT/server/README.md if problems).

```sh
  cd SORT/server/

  # Optional but recommanded
  virtual venv
  source venv/bin/activate

  # Finally start the server...
  python server.py
```

3. Start the web-client!

```sh
  cd SORT/web-client/

  npm install          # Install node dependancies.
  npm run build-client # Compile code for the first time!

  npm start      # Start the NodeJs server.

  # Optional watch for change to compile ES2015 code.
  npm run watch-client
```

4. Enjoy

### Locally with external API

This option is for the ones who wants to develop only the web-client and don't
want to touch the server. This option is nice but you'll not see the server log.

1. Set the PROXY location.

```
  # Set an environment variable for the proxy.
  export PROXY=sort.ntfournier.com
```

2. Start the web-client!

```sh
  cd SORT/web-client/

  npm install          # Install node dependancies.
  npm run build-client # Compile code for the first time!

  npm start      # Start the NodeJs server.

  # Optional watch for change to compile ES2015 code.
  npm run watch-client
```

Be careful if you develop naked! The images sent are automatically save on the
server.

### With Docker (Hint: if problems try other options)

This is the solution for the fearless (a.k.a Taylor Swift)

1. Install Docker and Docker-compose.

```
  sensible-browser https://docs.docker.com/engine/installation/
  sensible-browser https://docs.docker.com/compose/install/
```

2. Build and start the images.

```
  docker-compose build  # Build all the images config for server and web-client.
  docker-compose up     # Start server and web-client.
```

3. Optional: Watch for changes!

```
  # In a new terminal!
  npm run watch-client  # Watch JavaScript files for changes and recompile.
```

