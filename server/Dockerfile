FROM nvidia/cuda

ARG CUDA

# Update operating system and install packages
RUN apt-get update && apt-get install -y \
    git \
    wget \
    python-pip \
    python-dev \
    build-essential \
    vim \
 && rm -rf /var/lib/apt/lists/*


## Install Darknet ##
WORKDIR /usr/src/
RUN git clone https://github.com/SORT-ETS/darknet.git
WORKDIR /usr/src/darknet
RUN git checkout origin/custom-output

# Enable GPU
RUN if [ ${CUDA} = "true" ]; then sed -i.old 's/GPU=0/GPU=1/' Makefile; fi;
RUN make
RUN wget -o yolo-sort.weights http://www.ntfournier.com/static/yolo/yolo-sort-latest.weights
RUN wget -o yolo-sort.cfg http://www.ntfournier.com/static/yolo/yolo-sort-latest.cfg
RUN wget -o voc-sort.data http://www.ntfournier.com/static/yolo/voc-sort-latest.data

## Install Python server

# Create application directory
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

COPY . /usr/src/server

# Install Python packages
ADD requirements.txt /usr/src/server/
RUN pip install -r requirements.txt

# Copy the rest of the code
ADD . /usr/src/server


WORKDIR /usr/src/server
EXPOSE 5000
CMD python ./server.py
