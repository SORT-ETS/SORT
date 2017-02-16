import random

class Stub():
    possibleItems = ['container_metro', 'can_pepsi', 'can_monster', 'compost', 'dishes']
    minItemsFound = 1
    maxItemsFound = 4

    def getRandomOutput(self, imageWidth, imageHeight):
        boxes = []
        probability = 1
        for _ in range(random.randrange(self.minItemsFound, self.maxItemsFound)):
            left = random.randint(0, imageWidth)
            right = random.randint(left, imageWidth)

            # top is lower than bottom because (0,0) is Top left corner.
            top = random.randint(0, imageHeight)
            bottom = random.randint(top, imageHeight)

            boxes.append((random.choice(self.possibleItems), left, right, top, bottom))

        return boxes
