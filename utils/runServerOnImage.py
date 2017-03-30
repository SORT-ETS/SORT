#!/usr/bin/env python
import argparse
import base64
import json
import httplib
import pprint

parser = argparse.ArgumentParser(description='Send an image to SORT and save the result')
parser.add_argument('imageLocation', type=str, help='The image to analyse')
parser.add_argument('--server', default='localhost', type=str, help='The server location')
parser.add_argument('--port', default=5000, type=int, help='The port for the server')
args = parser.parse_args()

with open(args.imageLocation, 'r') as picture:
    picture_data = picture.read()

    base64_picture_data = base64.b64encode(picture_data)

    conn = httplib.HTTPConnection(args.server, args.port, timeout=1000)
    headers = {"Content-type": "application/json"}
    body = {"image": base64_picture_data, "returnResult": True}
    body_str = json.dumps(body)

    conn.request("POST", "/image", body_str, headers)
    response = conn.getresponse()
    response_body = json.loads(response.read())

    if not response_body['residues']:
        print('No residues were founds by SORT')
        print('no image was save')

    else:
        print('Residues founds:')
        for r in response_body['residues']:
            pprint.pprint(r)

        base64_analysed_data = response_body['result']
        with open("analysed.png", "wb") as analysed_picture:
            analysed_picture.write(base64.b64decode(base64_analysed_data))
            print('Image save as analysed.png')
