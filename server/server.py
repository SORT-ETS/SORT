from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class SORT(Resource):
    def get(self):
        return {'version': '0.0.0'}

api.add_resource(SORT, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
