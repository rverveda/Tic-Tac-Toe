let width = 600;
let height = 600;
let rowwidth = 600 / 3;
let colwidth = 600 / 3;
let playertext = ["X", "O"];
let playernumb = 1;
let gameboard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let won = false;
let full = false;
let canvasposition = 0;

function setup() {
  let mycanvas = createCanvas(width, height);
  mycanvas.parent("canvas");
  let stylecanvas = document.getElementById("canvas");
  canvasposition = floor(stylecanvas.clientWidth / 2 - width / 2) + "px";
  stylecanvas.style.marginLeft = canvasposition;
  stylecanvas.style.marginTop = "2%";

  [gameboard, won, full] = tttlogic(gameboard, 0, 0, playernumb, won);
}

function drawboard() {
  for (let row = 1; row < 3; row++) {
    for (let col = 1; col < 3; col++) {
      strokeWeight(5);
      stroke(255);
      line(200 * col, 0, 200 * col, height);
      line(0, 200 * row, width, 200 * row);
    }
  }
}

function mouseClicked() {
  if (
    mouseX < width &&
    mouseY < height &&
    won == false &&
    full == false &&
    playernumb == 0
  ) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        clicked(row, col);
      }
    }

    playernumb = 1;
    if (won == false && full == false) {
      [gameboard, won, full] = tttlogic(gameboard, 0, 0, playernumb, won);
      for (let j = 1; j <= 3; j++) {
        for (let i = 1; i <= 3; i++) {
          if (gameboard[j - 1][i - 1] != 0) {
            let char = gameboard[j - 1][i - 1];
            text(
              char,
              200 * (i - 1) + colwidth / 2 - 30,
              200 * (j - 1) + rowwidth / 2 + 30
            );
          }
        }
      }
    }
    displayWinner(won, full);
    playernumb = 0;
  }
}

function clicked(row, col) {
  if (
    mouseX < 200 * col + 200 &&
    mouseX > 200 * col &&
    mouseY > 200 * row &&
    mouseY < 200 * row + 200
  ) {
    textSize(90);
    fill(255);
    let char = playertext[playernumb];
    text(char, 200 * col + colwidth / 2 - 30, 200 * row + rowwidth / 2 + 30);
    [gameboard, won, full] = tttlogic(gameboard, row, col, playernumb, won);

    displayWinner(won, full);
  }
}

function displayWinner(won, full) {
  let winnertext = document.getElementById("winner");
  winnertext.align = "center";
  let playagain = document.getElementById("playagainbutton");
  buttonposition = parseInt(canvasposition.slice(0, 3)) + 150 + "px";
  console.log(buttonposition);
  playagain.style.paddingLeft = buttonposition;
  if (won) {
    if (playernumb == 0) {
      winnertext.innerText =
        'Congrats! You beat the "Unbeatable" Tic Tac Toe AI';
      playagain.srcset = "playagainbutton.png";
      playagain.alt = "Play Again?";
    } else {
      winnertext.innerText = "Computer player wins!";
      playagain.srcset = "playagainbutton.png";
      playagain.alt = "Play Again?";
    }
  } else if (full) {
    winnertext.innerText = "The game is a draw.";
    playagain.srcset = "playagainbutton.png";
    playagain.alt = "Play Again?";
  }
}

function draw() {
  background(51);
  drawboard();

  textSize(90);
  fill(255);
  for (let j = 1; j <= 3; j++) {
    for (let i = 1; i <= 3; i++) {
      if (gameboard[j - 1][i - 1] != 0) {
        let char = gameboard[j - 1][i - 1];
        text(
          char,
          200 * (i - 1) + colwidth / 2 - 30,
          200 * (j - 1) + rowwidth / 2 + 30
        );
      }
    }
  }
  playernumb = 0;

  noLoop();
}
