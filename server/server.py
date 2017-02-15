import os
import base64
import time
from flask import Flask, request, send_file
from flask_restful import Resource, Api

from subprocess import call

UPLOAD_FOLDER = './images'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

    fileLocation = os.path.join(app.config['UPLOAD_FOLDER'], 'image.png')

    f = open(fileLocation, 'wb')
    f.write(base64.b64decode(imageData))
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
