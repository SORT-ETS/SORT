from __future__ import print_function
import os
import base64
import copy
import random
import string
import sys
from tools.stub import Stub
from flask import Flask, request, jsonify, json
from PIL import Image

import subprocess

SERVER_FOLDER = '/usr/src/server'
DARKNET_DIR = '/usr/src/darknet'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = SERVER_FOLDER + '/images'
app.config['RESULT_FOLDER'] = SERVER_FOLDER + '/results'
app.config['RESIDUES_FILE'] = SERVER_FOLDER + '/residues.json'
app.config['DARKNET_DIR'] = DARKNET_DIR

preId = 0


def id_generator():
    global preId
    number = "%03d" % preId
    preId = preId + 1
    return number + '_' + \
        ''.join(random.choice(string.ascii_uppercase + string.digits)
                for _ in range(8))


def callIPEngine(fileLocation, resultLocation, imageWidth, imageHeight,
                 useStub=False):
    if useStub:
        stub = Stub()
        boxes = stub.getRandomOutput(imageWidth, imageHeight)

    else:
        stdout = subprocess.check_output(['./tools/yolo.sh',
                                          app.config['DARKNET_DIR'],
                                          fileLocation, resultLocation])
        boxes = []
        for l in stdout.splitlines():
            boxes.append(tuple(l.split(',')))

    return boxes


class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.route('/image', methods=['POST'])
def analyse_image():
    """
    @api {post} /image  Request Image Analysis
    @apiName  AnalyseImage
    @apiGroup Communication

    @apiParam {String} Image Image data encoded in base64.

    @apiSuccess (Main Fields)           {Object[]} residues
            List of the residues that were found in the image.

    @apiSuccess (Residue Object Fields) {String}   name
            The name of the item.

    @apiSuccess (Residue Object Fields) {String}   displayName
            The display name of the item.

    @apiSuccess (Residue Object Fields) {Number}   probability
            The probability the residues is there.

    @apiSuccess (Residue Object Fields) {String}   category
            Represent the different classification the trash can be.

    @apiSuccess (Residue Object Fields) {Number[]} boundaries
            The boundaries of the residue.

    @apiSuccess (Residue Object Fields) {String[]} notes
            Notes or facts concerning the item.

    @apiSuccess (Residue Object Fields) {String[]} warnings
            Warning concerning the item.

    @apiParamExample {json} Answer-Exemple
    {
        residues : [
            {
                name: "container_metro",
                displayName: "Contenant Metro",
                categories : "recyclable",
                probability: 34,
                boundaries : [ 20, 40, 13, 60 ],
                warning: [
                  "Veuillez verifier de vider le contenu de celui-ci dans les
                   poubelles appropriees."
                ]
            }
        ]
    }
    """
    if request.get_json() is None or 'image' not in request.get_json():
        raise InvalidUsage('Please specify the image parameter', 400)

    imageData = request.get_json()['image']
    if imageData.startswith('data:image/png;base64,'):
        imageData = imageData.split(',')[1]

    use_stub = False
    if 'useStub' in request.get_json():
        use_stub = request.get_json()['useStub']

    return_result = False
    if 'returnResult' in request.get_json():
        return_result = request.get_json()['returnResult']

    # Generate an id
    imageId = id_generator() + '.png'
    fileLocation = os.path.join(app.config['UPLOAD_FOLDER'], imageId)
    resultLocation = os.path.join(app.config['RESULT_FOLDER'], imageId)

    # Save the image
    f = open(fileLocation, 'wb')
    f.write(base64.b64decode(imageData))
    f.close()

    with Image.open(fileLocation) as im:
        width, height = im.size
    # Call Image processing engine
    boxes = callIPEngine(fileLocation, resultLocation, width, height, use_stub)

    response = {
        'residues': []
    }

    if return_result:
        with open(resultLocation, 'r') as result:
            response['result'] = base64.b64encode(result.read())

    possibleResidues = json.load(open(app.config['RESIDUES_FILE']))

    for b in boxes:
        key = b[0]
        if key in possibleResidues:
            residue = copy.copy(possibleResidues[key])
            residue['name'] = b[0]
            residue['boundaries'] = b[1:5]
            residue['probability'] = int(b[5])
            response['residues'].append(residue)
            print('item found : ' + b[0] + "  " + str(b[1:5]), file=sys.stderr)

    return jsonify(response)


@app.route('/version')
def get_version():
    return jsonify({'version': '0.0.2'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, threaded=True)
