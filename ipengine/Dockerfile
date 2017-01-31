FROM ubuntu:latest

# This Dockerfile will contain the installation for OpenCV
RUN apt-get -y update

RUN apt-get install -y build-essential
RUN apt-get install -y cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
RUN apt-get install -y wget

RUN mkdir /OpenCV
WORKDIR /OpenCV
RUN wget https://github.com/Itseez/opencv/archive/3.2.0.zip

RUN apt-get install -y unzip qt5-default

# Build OpenCV
RUN unzip 3.2.0.zip && \
    rm 3.2.0.zip
RUN cd opencv-3.2.0 && \
    mkdir build && \
    cd build && \
    cmake \
    -DWITH_QT=ON \ 
    -DWITH_OPENGL=ON \ 
    -DFORCE_VTK=ON \
    -DWITH_TBB=ON \
    -DWITH_GDAL=ON \
    -DWITH_XINE=ON \
    -DBUILD_EXAMPLES=ON .. && \
    make -j4 && \
    make install && \ 
    ldconfig

# Create application directory
RUN mkdir -p /usr/src/ipengine
WORKDIR /usr/src/ipengine

RUN apt-get install -y inotify-tools

COPY . /usr/src/ipengine

CMD ./watch.sh & ./compile.sh && rm -f /usr/src/ipengine/log.txt && touch /usr/src/ipengine/log.txt && tail -F /usr/src/ipengine/log.txt

