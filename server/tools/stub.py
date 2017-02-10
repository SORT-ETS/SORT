from random import random, shuffle

class Stub():
    possibleItems = ['container_metro', 'can_pepsi', 'can_monster', 'compost', 'dishes']

    # TODO Add randomization
    def getRandomOutput(self):
        shuffle(self.possibleItems)

        output = ""
        probability = 1
        for i in self.possibleItems:
            probability *= random() # Generate decreasing probability
            output += "{}: {}\n".format(i, probability)

        return output
