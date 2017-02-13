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

@apiParam {Object} image Data associated with the image to analyze (DOM reference to the image tag').

@apiSuccess {Object}   image                Encoded analyzed image modified with colorised area.
@apiSuccess {Object[]} residues             List of sectors where trash were found with information on them. return a list of objects that were found in the image.
@apiSuccess {Object}   bondaries            Represent the rectangle were the trash is in the image
@apiSuccess {Integer}  bondaries.x1         This value is the horizontal distance from the upper left of the image to the upper left corner of the bondary
@apiSuccess {Integer}  bondaries.y1         This value is the vertical distance from the upper left of the image to the upper left corner of the bondary
@apiSuccess {Integer}  bondaries.x2         This value is the horizontal distance from the upper left of the image to the bottom right corner of the bondary
@apiSuccess {Integer}  bondaries.y2         This value is the vertical distance from the upper left of the image to the bottom right corner of the bondary
@apiSuccess {Object[]} categories           Represent the different classification the trash can be.
@apiSuccess {String}   categories.category  This value is the category of the found trash. (List of categories TBD [WIP])
@apiSuccess {Number}   categories.certitude This value is the percentage of certitude that the category fits the object.

@apiParamExample {json} Answer-Exemple
{
    image : object,
    residues : [
        {
            bondaries  : {x1 : 100, y1 : 105, x2 : 400, y2 : 308},
            categories : [
                {category : "trashable", certitude : 0.14},
                {category : "recyclable", certitude : 0.60}, 
                {category : "compostable", certitude : 0.26}
            ]
        },
        {
            bondaries  : {x1 : 108, y1 : 475, x2 : 23, y2 : 502},
            categories : [
                {category : "recyclable", certitude : 0.83}, 
                {category : "compostable", certitude : 0.17}
            ]
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
