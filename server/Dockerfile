FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

ADD . /code
WORKDIR /code

RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "./server.py"]
