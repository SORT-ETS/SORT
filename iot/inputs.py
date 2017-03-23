import RPi.GPIO as GPIO
import smbus
import time

# Open IO bus
bus = smbus.SMBus(1)
# BrightPI adress
address = 0x70

on_sig = 0xff
off_sig = 0x00

GPIO.setmode(GPIO.BCM)

# IO inputs setup
buttonPullUpPin = 21
GPIO.setup(buttonPullUpPin, GPIO.IN)

#bouncing setup
prev_input = 0

while True:
    input = GPIO.input(buttonPullUpPin)
    print input, prev_input
    if ((not prev_input) and input):
        print 'Pressed'
        bus.write_byte_data(address, 0, on_sig) # Dels on
        time.sleep(0.5) # to get a long enough flash
        bus.write_byte_data(address, 0, off_sig) # Dels off
        
    prev_input = input

    time.sleep(0.1) # for bouncing purposes
    
