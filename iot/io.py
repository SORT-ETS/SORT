import smbus
import time
bus = smbus.SMBus(1)
address = 0x70

on_sig = 0xff
off_sig = 0x00

while True:
        bus.write_byte_data(address, 0, on_sig)
        time.sleep(1)
        bus.write_byte_data(address, 0, off_sig)
        time.sleep(1)

