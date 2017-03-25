import RPi.GPIO as GPIO
import smbus
import keyboard
import time

# Open IO bus
bus = smbus.SMBus(1)
# BrightPI adress
address = 0x70

on_sig = 0xff
off_sig = 0x00

GPIO.setmode(GPIO.BCM)

# IO inputs setup
buttonPin = 21
GPIO.setup(buttonPin, GPIO.IN)

# bouncing setup
prev_input = 0

while True:
    input = GPIO.input(buttonPin)

    if ((not prev_input) and input):
        print('Pressed')
        keyboard.press_and_release('enter')
        bus.write_byte_data(address, 0, on_sig)  # Dels on
        time.sleep(0.5)  # to get a long enough flash
        bus.write_byte_data(address, 0, off_sig)  # Dels off

    prev_input = input

    time.sleep(0.05)  # for bouncing purposes
