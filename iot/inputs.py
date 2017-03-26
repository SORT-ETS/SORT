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
upPin = 26
rightPin = 19
downPin = 13
leftPin = 6

GPIO.setup(buttonPin, GPIO.IN)
GPIO.setup(upPin, GPIO.IN)
GPIO.setup(rightPin, GPIO.IN)
GPIO.setup(downPin, GPIO.IN)
GPIO.setup(leftPin, GPIO.IN)

# bouncing setup
prev_input = 0
prev_up = 0
prev_right = 0
prev_down = 0
prev_left = 0

while True:
    inputButton = GPIO.input(buttonPin)
    inputUp = GPIO.input(upPin)
    inputRight = not GPIO.input(rightPin)  # needed to inverse
    inputDown = GPIO.input(downPin)
    inputLeft = not GPIO.input(leftPin)  # needed to inverse

    if ((not prev_input) and inputButton):
        keyboard.press_and_release('enter')

        bus.write_byte_data(address, 0, on_sig)  # Dels on
        time.sleep(0.5)  # to get a long enough flash
        bus.write_byte_data(address, 0, off_sig)  # Dels off

    if ((not prev_up) and inputUp):
        keyboard.press_and_release('up arrow')

    if ((not prev_right) and inputRight):
        keyboard.press_and_release('right arrow')

    if ((not prev_down) and inputDown):
        keyboard.press_and_release('down arrow')

    if ((not prev_left) and inputLeft):
        keyboard.press_and_release('left arrow')

    # for bouncing purposes
    prev_input = inputButton
    prev_up = inputUp
    prev_right = inputRight
    prev_down = inputDown
    prev_left = inputLeft

    time.sleep(0.05)
