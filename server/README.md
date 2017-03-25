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
Windows will fail.

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

​	3\. Start the Python server

```sh
  cd SORT/server/

  # Optional but recommended
  virtual venv
  source venv/bin/activate

  # Finally, start the server...
  python server.py
```

​	4\. Start _web-client_

Refer to `SORT/web-client/README.md` section `How to develop/Locally`

### Using Docker

Refer to `SORT/README.md`.

## Code format

Before committing just be sure to run `make lint` to pass Flake

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

# Training on your images

1. Start the docker-compose stack with Nvidia enabled (training without Nvidia is possible but it will takes weeks).

```shell
    nvidia-docker-compose -f docker-compose-nvidia.yml build
    nvidia-docker-compose up
```

2. Clone training images folder and follow the `README` to get images.

```shell
  cd sort/server/
  git clone git@github.com:SORT-ETS/training-data.git
```

4. Follow the instruction in `training-data/README` to get `.png` and `.jpg` files.

5. Enter the container with the `Darknet` software, navigate to the `training-data` and generate configuration.

```shell
  make attach
  cd training-data
  ./genConfig.sh    # This script will generate labels, parameters, configs location and move file for Darknet.
```

5. Start training and wait for the first 100 iterations.

```shell
  cd ../../darknet
  ./darknet detector train /usr/src/server/training-data/cfg/obj.data \
                            /usr/src/server/training-data/cfg/yolo-sort.cfg \
                            /usr/src/server/training-data
```

6. if results are better than the last version you have upload them on a remote location and change in the server Dockerfile.

```dockerfile
  RUN wget -o yolo-sort.weights http://www.ntfournier.com/static/yolo-sort-latest.weights
  RUN wget -o yolo-sort.cfg http://www.ntfournier.com/static/yolo-sort-latest.cfg
  RUN wget -o voc-sort.data http://www.ntfournier.com/static/voc-sort-latest.data
```
