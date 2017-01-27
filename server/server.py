from flask import Flask, request
from flask_restful import Resource, Api
from subprocess import call

app = Flask(__name__)
api = Api(app)

class SORT(Resource):
    def get(self):
        return {'version': '0.0.0'}

class Image(Resource):
    def get(self):
        call(["../ipengine/app", "fromFlask"]);
        return "I call OpenCV"

api.add_resource(SORT, '/version')
api.add_resource(Image, '/image')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
