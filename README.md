# Tic-Tac-Toe
Using the minimax algorithm to create an unbeatable Tic Tac Toe AI. 

This repo consists of 3 main components:
  1. tttlogic.js
  2. sketch.js
  3. consolettt.js

The tttlogic.js is the file that contains all the logic needed to run the minimax algorithm. Makes all changed to the gameboard. In this file is a main function, tttlogic. tttlogic takes the following arguements:
  1. Current Gameboard. The gameboard should be a 3x3 2d array with 0 being used as blanks. X is the players and O is the computer.
  2. Selected Row. Ranges from 0 - 2 and is used to play the players move. When tttlogic is called on the computers turn this can be any integer.
  3. Selected Column. Ranges from 0 - 2 and is used to play the players move. When tttlogic is called on the computers turn this can be any integer.
  4. Player Number. 0 for the player and 1 for the computer.
  5. Won. Boolean. Not needed as far as I know but I am too lazy to see if I can remove it.

sketch.js is the file that contains the GUI aspects needed to play Tic Tac Toe in a browser. The HTML and CSS for this file are index.html and style.css respectively.

consolettt.js allows you to play Tic Tac Toe in the console. Works with the Mozilla Firefox console. Uncomment out this script from the index.html. But honestly why use this when you can just use the version with a GUI. 
