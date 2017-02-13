import os
import base64
import time
from flask import Flask, request, send_file
from flask_restful import Resource, Api

from subprocess import call

UPLOAD_FOLDER = './images'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

"""
@api {post} /api/image  Request Image Analysis
@apiName  AnalyseImage
@apiGroup Communication

@apiParam {Object} image Data associated with the image to analyze (DOM reference to the image tag).

@apiSuccess {Object}   image                Encoded analyzed image modified with colorised area.
@apiSuccess {Object[]} residues             List of the residues that were found in the image.
@apiSuccess {String}   name                 The name of the item.
@apiSuccess {String}   categories           Represent the different classification the trash can be.
@apiSuccess {String}   notes                Notes concerning the item.

@apiParamExample {json} Answer-Exemple
{
    image : object,
    residues : [
        {
            name: "container_metro",
            categories : "recyclable",
            notes: "May contain something inside, handle carefully"
        }
    ]
}

"""
@app.route('/image', methods=['POST'])
def analyse_image():
    imageData = request.get_json()['image']

    fileLocation = os.path.join(app.config['UPLOAD_FOLDER'], 'image.png')

    f = open(fileLocation, 'wb')
    f.write(base64.b64decode(imageData.split(',')[1]))
    f.close()

    call(["./ipengine/app", fileLocation]);

    i = open(fileLocation, 'rb')
    encoded_string = base64.b64encode(i.read())
    i.close()

    return encoded_string

@app.route('/version')
def get_version(self):
    return {'version': '0.0.1'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
