import base64
import json
import httplib
import picamera
import re

camera = picamera.PiCamera()
camera.hflip = True

picture = camera.capture('picture.png', 'png')

with open('picture.png', 'r') as picture:
    picture_data = picture.read()

    base64_picture_data = base64.b64encode(picture_data)

    conn = httplib.HTTPConnection("159.203.12.120", 5000, timeout=1000)

    headers = {"Content-type": "application/json"}

    body = {"image": "data:image/jpeg;base64," + base64_picture_data}
    body_str = json.dumps(body)

    conn.request("POST", "/image", body_str, headers)

    response = conn.getresponse()
    print response.status, response.reason

    response_body = response.read()
    base64_analysed_data = re.sub("\data:image/jpeg;base64,", "",
                                  response_body)

    with open("analysed.png", "wb") as analysed_picture:
        analysed_picture.write(base64.b64decode(base64_analysed_data))

        analysed_picture.close()

    picture.close()
