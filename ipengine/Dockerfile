FROM ubuntu:latest

# This Dockerfile will contain the installation for OpenCV
RUN apt-get -y update

RUN apt-get install -y build-essential

# Create application directory
RUN mkdir -p /usr/src/ipengine
WORKDIR /usr/src/ipengine

COPY . /usr/src/ipengine

CMD g++ src/app.cpp -o app && rm -f /usr/src/ipengine/log.txt && touch /usr/src/ipengine/log.txt && tail -F /usr/src/ipengine/log.txt
