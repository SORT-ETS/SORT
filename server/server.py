import os
import base64
from flask import Flask, request
from flask_restful import Resource, Api

from subprocess import call

UPLOAD_FOLDER = '../images'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/image', methods=['POST'])
def analyse_image():
        imageData = request.get_json()['image']

        f = open(os.path.join(app.config['UPLOAD_FOLDER'], 'image.png'), 'wb')
        f.write(base64.b64decode(imageData.split(',')[1]))
        f.close()

        call(["../ipengine/app", "fromFlask"]);
        return "I call OpenCV"

@app.route('/version')
def get_version(self):
    return {'version': '0.0.0'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
