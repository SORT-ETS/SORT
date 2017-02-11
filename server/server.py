import os
import base64
import time
from flask import Flask, request, send_file
from flask_restful import Resource, Api

from subprocess import call

UPLOAD_FOLDER = '../server/images'
IMAGE_PROCESSING_CMD = []

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['IMAGE_PROCESSING_CMD'] = IMAGE_PROCESSING_CMD

@app.route('/image', methods=['POST'])
def analyse_image():
        imageData = request.get_json()['image']

        fileLocation = os.path.join(app.config['UPLOAD_FOLDER'], 'image.png')

        f = open(fileLocation, 'wb')
        f.write(base64.b64decode(imageData.split(',')[1]))
        f.close()

        output = call(['./darknet','classifier','predict','cfg/imagenet1k.data','cfg/extraction.cfg','extraction.weights', fileLocation], cwd=r'../darknet');

        i = open(fileLocation, 'rb')
        encoded_string = base64.b64encode(i.read())
        i.close()

        return encoded_string

@app.route('/version')
def get_version(self):
    return {'version': '0.0.1'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
