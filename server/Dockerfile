FROM ubuntu:latest

# Update operating system and install packages
RUN apt-get update && apt-get install -y \
    git \
    wget \
    python-pip \
    python-dev \
    build-essential \
 && rm -rf /var/lib/apt/lists/*


## Install Darknet ##
WORKDIR /usr/src/
RUN git clone https://github.com/SORT-ETS/darknet.git
WORKDIR /usr/src/darknet
RUN git checkout origin/custom-output
RUN make
RUN wget http://pjreddie.com/media/files/yolo.weights


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
