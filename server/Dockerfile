FROM ubuntu:latest

# Update operating system and install packages
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

# Create application directory
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

# Install Python packages
ADD requirements.txt /usr/src/server/
RUN pip install -r requirements.txt

# Copy the rest of the code
ADD . /usr/src/server

EXPOSE 5000
CMD ["python", "./server.py"]
