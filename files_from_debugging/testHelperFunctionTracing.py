def getGuessedWord(secretWord,lettersGuessed):
   def getChar(letter):
       if letter in lettersGuessed:
           return letter
       else:
           return '_'
   return(' ').join(map(getChar,secretWord))
getGuessedWord('tiger','ieaou')