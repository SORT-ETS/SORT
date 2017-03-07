import os
import base64
import random
import string
from tools.stub import Stub
from flask import Flask, request, jsonify
from PIL import Image

import subprocess

SERVER_FOLDER = '/usr/src/server'
UPLOAD_FOLDER = SERVER_FOLDER + '/images'
RESULT_FOLDER = SERVER_FOLDER + '/results'
DARKNET_DIR = '/usr/src/darknet'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER
app.config['DARKNET_DIR'] = DARKNET_DIR
app.config['USE_STUB'] = True

preId = 0
possibleResidues = {
    'container_metro': {
        'displayName': 'Contenant Metro',
        'category': 'recyclable',
        'warning': [
            "Veuillez verifier de vider le contenu de celui-ci dans les \
            poubelles appropriees."]
    },
    'can_monster': {
        'displayName': 'Canette',
        'category': 'metal',
		'notes': ["Saviez vous que l'aluminium est recyclable a 99"]
    },
    'can_pepsi': {
        'displayName': 'Canette',
        'category': 'metal',
    },
    'compost': {
        'displayName': 'Restants de table',
        'category': 'composte'
    },
    'dishes': {
        'displayName': 'Assiettes',
        'category': 'aucune',
		'warning': "Seulement les fruits et les legumes sont compostables!",
		'notes': ["Je jette du composte par les yeux", "Second note"]
    }
}


def id_generator():
    global preId
    number = "%03d" % preId
    preId = preId + 1
    return number + '_' + \
        ''.join(random.choice(string.ascii_uppercase + string.digits)
                for _ in range(8))


def callIPEngine(fileLocation, resultLocation, imageWidth, imageHeight):
    if app.config['USE_STUB']:
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

    @apiSuccess (Residue Object Fields) {String}   category
            Represent the different classification the trash can be.

    @apiSuccess (Residue Object Fields) {Number[]} boundaries
            The boundaries of the residue.

    @apiSuccess (Residue Object Fields) {String[]} notes
            Notes or facts concerning the item.
			
    @apiSuccess (Residue Object Fields) {String[]} warning
            Warning concerning the item.

    @apiParamExample {json} Answer-Exemple
    {
        residues : [
            {
                name: "container_metro",
                displayName: "Contenant Metro",
                categories : "recyclable",
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
    boxes = callIPEngine(fileLocation, resultLocation, width, height)

    response = {
        'residues': []
    }

    for b in boxes:
        key = b[0]
        # If the key is not present we pick a random item...
        if key not in possibleResidues:
            key = random.sample(possibleResidues, 1)[0]

        residue = possibleResidues[key]
        residue['name'] = b[0]
        residue['boundaries'] = b[1:5]
        response['residues'].append(residue)

    return jsonify(response)


@app.route('/version')
def get_version(self):
    return {'version': '0.0.2'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, threaded=True)
