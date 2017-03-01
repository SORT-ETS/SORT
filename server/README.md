# Server

The server is the module responsible to call Yolo for you.

## Development

### Locally

​	1A\. Use random data

Modify `SORT/server/server.py` to use STUB. On line 20:

```python
  app.config['USE_STUB'] = True
```

​	1B\. With YOLO (Linux or MacOs only)

Due to Darknet working only on Linux and MacOs running the server on
Windows will failed.

Clone our _fork_ of Darknet

```
git clone git@github.com:SORT-ETS/darknet.git
git checkout origin/custom-output
```

​	2\. Modify `SORT/server/server.py` to use the correct folders.

Hopefully we will have config files soon.

```python
SERVER_FOLDER = '/usr/src/server'
UPLOAD_FOLDER = SERVER_FOLDER + '/images'
RESULT_FOLDER = SERVER_FOLDER + '/results'
DARKNET_DIR = '/usr/src/darknet'
```

​	3\. Start server

```sh
  cd SORT/server/

  # Optional but recommended
  virtual venv
  source venv/bin/activate

  # Finally start the server...
  python server.py
```

​	4\. Start _web-client_

Refer to `SORT/web-client/README.md` section `How to develop/Locally`

### Using Docker and Docker-compose

1. Follow the [instructions to install Docker](https://docs.docker.com/engine/installation/) to install Docker.

2. Follow the [instruction to install Docker-Compose](https://docs.docker.com/compose/install/).

3. From a terminal:

  ```sh
    docker-compose build
    docker-compose up
  ```

4. Open your favorite browser at [localhost:6088](localhost:6088) and you should see the _web-client_ showing the _server_ version via the reverse proxy.


### Code format

Before commiting just be sure to run `make lint` to pass Flake

## Development of Darknet and Yolo

### Locally

```shell
  cd $DARKNET_LOCATION_USE_BY_PYTHON_SERVER
  edit <some_files>     # vi works best to edit files...
  make
```

### Using Docker

To attach to the server container do `make attach`.

```shell
  make attach

  # We are inside the Docker server!
  cp -r ../darknet ./ # We move Darknet!
  exit
```

Modify Python code to point to the local version.

```python
DARKNET_DIR = '/usr/src/server/darknet'
```

#### Calling Yolo from a Windows host

```shell
  make attach

  # Again, we are inside Docker
  cd darknet

  # Let's call Yolo
  ./darknet

  # Exit the Docker container.
  exit
```
