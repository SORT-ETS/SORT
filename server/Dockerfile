FROM ubuntu:latest

# Install OpenCV
RUN apt-get -y update

RUN apt-get install -y build-essential cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev wget

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

# Update operating system and install packages
RUN apt-get install -y python-pip python-dev build-essential

# Create application directory
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

COPY . /usr/src/server

# Install Python packages
ADD requirements.txt /usr/src/server/
RUN pip install -r requirements.txt

# Copy the rest of the code
ADD . /usr/src/server

EXPOSE 5000
CMD ./ipengine/compile.sh && python ./server.py
