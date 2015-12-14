from datetime import datetime

def getGuessedWord(secretWord, lettersGuessed):
    """
    secretWord: string, the word the user is guessing
    lettersGuessed: list, what letters have been guessed so far
    returns: string, comprised of letters and underscores that represents
      what letters in secretWord have been guessed so far.
    """
    setGuess = set(lettersGuessed)
    output = " "
    for i in range(len(secretWord)):
        testChar = secretWord[i]
        if testChar in setGuess:
            output += testChar
        else:
            output += " _ "
    print output
    return output

N = 4000
functionsDict = {}
resultsDict = {}

for i in xrange(N):
	#print str(i)+'th iteration'
	functionsDict[i] = getGuessedWord

print datetime.now().time()
for i in xrange(N):
	resultsDict[i] = functionsDict[i]('tiger', 'aeiou')
print datetime.now().time()



#getGuessedWord('tiger', 'aeiou')
#print i, functionsDict[i]