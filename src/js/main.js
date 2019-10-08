import Ui from "./ui";
import Game from "./game";

let ui;
let game;
window.addEventListener("DOMContentLoaded", event => {
  ui = new Ui();
  initializeApp();
});

const initializeApp = () => {
  game = new Game();
  ui.replayBtn.style.display = "none";
  ui.outputArea.style.display = "none";

  for (let i = 0; i < ui.spots.length; i++) {
    ui.spots[i].innerText = "";
    ui.spots[i].style.removeProperty("background-color");
    ui.spots[i].addEventListener("click", turnClick, false);
  }
};

function turnClick(square) {
  if (typeof game.board[square.target.id] == "number") {
    turn(square.target.id, game.me);
    if (!game.checkWin(game.board, game.me) && !checkTie())
      turn(game.bestSpot(), game.computer);
  }
}

const turn = (squareId, player) => {
  game.board[squareId] = player;
  ui.updateSquare(squareId, player);
  let gameWon = game.checkWin(game.board, player);
  if (gameWon) gameOver(gameWon);
};

const gameOver = gameWon => {
  for (let index of game.boxes[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == game.me ? "blue" : "red";
  }
  for (let i = 0; i < game.spots.length; i++) {
    ui.spots[i].removeEventListener("click", turnClick, false);
  }
  ui.declareWinner(gameWon.player == game.me ? "You win!" : "You lose.");
  ui.replayBtn.addEventListener("click", () => initializeApp());
};

const checkTie = () => {
  if (game.emptySquares().length == 0) {
    for (let i = 0; i < ui.spots.length; i++) {
      ui.spots[i].style.backgroundColor = "black";
      ui.spots[i].removeEventListener("click", turnClick, false);
    }
    ui.declareWinner("Tie Game!");
    ui.replayBtn.addEventListener("click", () => initializeApp());
    return true;
  }
  return false;
};
