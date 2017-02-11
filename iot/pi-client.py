import base64
import picamera

camera = picamera.PiCamera()
camera.hflip = True

picture = camera.capture('picture.png', 'png')

with open('picture.png', 'r') as picture:
    picture_data = picture.read()

    base64_picture_data = base64.b64encode(picture_data)
    print base64_picture_data
    
