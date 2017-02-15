import os
import base64
import time
import random
import string
from flask import Flask, request, send_file
from flask_restful import Resource, Api

from subprocess import call

UPLOAD_FOLDER = '/usr/src/server/images'
RESULT_FOLDER = '/usr/src/server/results'
DARKNET_DIR = '/usr/src/darknet'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER
app.config['DARKNET_DIR'] = DARKNET_DIR

preId = 0;
def id_generator():
    global preId
    number = "%03d" % preId
    preId = preId + 1
    return number + '_' + ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8))


@app.route('/image', methods=['POST'])
def analyse_image():
    """
    @api {post} /image  Request Image Analysis
    @apiName  AnalyseImage
    @apiGroup Communication

    @apiParam {Object} Image Image data encoded in base64.

    @apiSuccess (Main Fields)           {Object}   image     Analyzed image data encoded in base64 modified with colorised area.
    @apiSuccess (Main Fields)           {Object[]} residues  List of the residues that were found in the image.
    @apiSuccess (Residue Object Fields) {String}   name      The name of the item.
    @apiSuccess (Residue Object Fields) {String}   category  Represent the different classification the trash can be.
    @apiSuccess (Residue Object Fields) {String}   notes     Notes concerning the item.

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
    imageData = request.get_json()['image']

    # Generate an id
    imageId = id_generator() + '.png'
    fileLocation = os.path.join(app.config['UPLOAD_FOLDER'], imageId)
    resultLocation = os.path.join(app.config['RESULT_FOLDER'], imageId)

    # Save the image
    f = open(fileLocation, 'wb')
    f.write(base64.b64decode(imageData))
    f.close()

    # Call Yolo
    output = call(['./yolo.sh', app.config['DARKNET_DIR'], fileLocation, resultLocation]);

    # Encode result
    i = open(resultLocation, 'rb')
    encoded_string = base64.b64encode(i.read())
    i.close()

    return encoded_string


@app.route('/version')
def get_version(self):
    return {'version': '0.0.1'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
