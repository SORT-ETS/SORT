import random


class Stub():
    possibleItems = ['container_metro', 'can_aluminium',
                     'container_juice', 'container_paper_milk', 'cup_paper',
                     'container_bag', 'compost', 'plastic_bottle']
    minItemsFound = 3
    maxItemsFound = 7
    minWidth = 80
    minHeight = 90
    minTop = 50
    maxOffsetBottom = 135

    def getRandomOutput(self, imageWidth, imageHeight):
        boxes = []
        nbOutputs = random.randrange(self.minItemsFound, self.maxItemsFound)
        for _ in range(nbOutputs):
            left = random.randint(0, imageWidth - self.minWidth)
            right = random.randint(left + self.minWidth, imageWidth)

            # top is lower than bottom because (0,0) is Top left corner.
            top = random.randint(self.minTop, imageHeight - self.maxOffsetBottom - self.minHeight)
            bottom = random.randint(top + self.minHeight, imageHeight - self.maxOffsetBottom)

            boxes.append((random.choice(self.possibleItems),
                          left, right,
                          top, bottom))

        return boxes
