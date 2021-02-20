function tttlogic(curr_gameboard, selec_row, selec_col, playernumb, won) {
  let updated_gameboard = curr_gameboard;
  let charstr = ["X", "O"];

  // Playernumb 0 is the human player. Playernumb 1 is the computer
  if (playernumb == 0) {
    // Turn order for the human player

    // Write players symbol to the current gameboard in their selected spot
    updated_gameboard[selec_row][selec_col] = charstr[playernumb];

    // Check if the next player should get a turn
    [won, winner] = checkstate(updated_gameboard);
    full = boardfull(updated_gameboard);
  } else {
    // Turn order for the computer player
    // Check for available moves
    let allowedMoves = isAllowed(updated_gameboard);
    // Setup minimax algorithm
    let bestScore = -Infinity;
    let bestMove;

    // Loop through all available moves
    for (let i = 0; i < allowedMoves.length; i++) {
      // Play first available move
      updated_gameboard[allowedMoves[i][0]][allowedMoves[i][1]] = "O";

      // Run minimax
      let score = minimax(updated_gameboard, false);

      // Undo move. Could create a temporary game board but I am lazy
      updated_gameboard[allowedMoves[i][0]][allowedMoves[i][1]] = 0;

      // Check if this move is the best move
      if (score > bestScore) {
        bestScore = score;
        bestMove = [allowedMoves[i][0], allowedMoves[i][1]];
      }
    }
    // Play the move selected by minimax
    updated_gameboard[bestMove[0]][bestMove[1]] = charstr[playernumb];

    // Check if the game has been won or the board is full
    [won, winner] = checkstate(updated_gameboard);
    full = boardfull(updated_gameboard);
  }

  // Return the new gameboard and if the game has been won
  return [updated_gameboard, won, full];
}

// Check if the game has been won
function checkstate(gameboard) {
  let winner = Math.PI;
  //Check the rows
  for (let row = 0; row < 3; row++) {
    let curr_row = [];
    for (let col = 0; col < 3; col++) {
      curr_row[col] = gameboard[row][col];
    }
    curr_row = curr_row.join("");
    if (curr_row == "XXX" || curr_row == "OOO") {
      won = true;
      winner = playernumb;
      break;
    } else {
      won = false;
    }
  }

  //Check the columns
  if (won == false) {
    for (let col = 0; col < 3; col++) {
      let curr_col = [];
      for (let row = 0; row < 3; row++) {
        curr_col[row] = gameboard[row][col];
      }
      curr_col = curr_col.join("");
      if (curr_col == "XXX" || curr_col == "OOO") {
        won = true;
        winner = playernumb;
        break;
      } else {
        won = false;
      }
    }
  }

  //Check the diagonals
  if (won == false) {
    let curr_diag = [];
    curr_diag = [gameboard[0][0], gameboard[1][1], gameboard[2][2]].join("");
    if (curr_diag == "XXX" || curr_diag == "OOO") {
      won = true;
      winner = playernumb;
    } else {
      won = false;
    }

    if (won == false) {
      curr_diag = [gameboard[0][2], gameboard[1][1], gameboard[2][0]].join("");
      if (curr_diag == "XXX" || curr_diag == "OOO") {
        won = true;
        winner = playernumb;
      } else {
        won = false;
      }
    }
  }

  return [won, winner];
}

// Check if the gameboard is full
function boardfull(gameboard) {
  let full;
  for (let row = 0; row < 3; row++) {
    let check_row = gameboard[row];
    for (let col = 0; col < 3; col++) {
      if (check_row[col] == 0) {
        full = false;
        break;
      }
    }
    if (full == false) {
      break;
    } else {
      full = true;
    }
  }

  return full;
}

// Check for empty squares that can be played in
function isAllowed(gameboard) {
  let allowed = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameboard[row][col] == 0) {
        allowed.push([row, col]);
      }
    }
  }
  return allowed;
}

// Run the minimax algorithm
function minimax(gameboard, maximizingPlayer) {
  // First check terminal state
  let [won, winner] = checkstate(gameboard);
  if (won) {
    // Use boolean maximizingPlayer to determine who won.
    // Since a move is played and then it is checked the winner is the opposite of the boolean
    winner = maximizingPlayer ? 0 : 1;
  }
  let tie = boardfull(gameboard);
  let boardValue;
  if (won || tie) {
    if (won) {
      if (winner == 0) {
        // If player wins give that gameboard state a score of -1
        boardValue = -1;
      } else if (winner == 1) {
        // If the computer wins give that gameboard state a score of 1
        boardValue = 1;
      }
    } else if (tie) {
      // If the game is tied give that gameboard state a score of 0
      boardValue = 0;
    }
    return boardValue;
  }

  if (maximizingPlayer) {
    let iterScore = -Infinity;
    // Check for available moves
    let tryMoves = isAllowed(gameboard);
    for (let j = 0; j < tryMoves.length; j++) {
      // Loop through the available moves
      gameboard[tryMoves[j][0]][tryMoves[j][1]] = "O";
      // Run minimax on all of the moves
      let tempscore = minimax(gameboard, false);
      gameboard[tryMoves[j][0]][tryMoves[j][1]] = 0;
      // Take the max value from possible moves
      iterScore = Math.max(tempscore, iterScore);
    }
    // Return this moves score up the tree
    return iterScore;
  } else {
    let iterScore = Infinity;
    let tryMoves = isAllowed(gameboard);
    for (let j = 0; j < tryMoves.length; j++) {
      gameboard[tryMoves[j][0]][tryMoves[j][1]] = "X";
      let tempscore = minimax(gameboard, true);
      gameboard[tryMoves[j][0]][tryMoves[j][1]] = 0;
      iterScore = Math.min(iterScore, tempscore);
    }
    return iterScore;
  }
}
