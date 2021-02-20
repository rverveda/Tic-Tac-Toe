let gameboard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let playernumb = 0;
let won = false;
let full = false;

while (won == false && full == false) {
  if (playernumb == 0) {
    // Get row input. Must be in range 0 - 2
    row = prompt("Enter the row you want to play in");
    // Get column input. Must be in range 0 - 2
    col = prompt("Enter the column you want to play in");
    // Run game logic. Updates board and checks if the game has been won/drawn
    [gameboard, won, full] = tttlogic(gameboard, row, col, playernumb, won);
    console.log(JSON.parse(JSON.stringify(gameboard)));
  } else {
    // Run game logic. Updates board and checks if the game has been won/drawn
    [gameboard, won, full] = tttlogic(gameboard, row, col, playernumb, won);
    console.log(JSON.parse(JSON.stringify(gameboard)));
  }

  if (won == false && full == false) {
    if (playernumb == 0) {
      playernumb = 1;
    } else {
      playernumb = 0;
    }
  }
}

// Displaying outputs depending on game end condition
if (won == true) {
  // Output if the game is won by a player
  console.log(`The winner is Player ${playernumb + 1}.`);
} else {
  // Output if the game is drawn
  console.log("The game is a draw.");
}
