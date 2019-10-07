import Util from "./util";
let util;
initializeApp();

function initializeApp() {
  util = new Util();
  util.replayBtn.style.display = "none";
  util.outputArea.style.display = "none";

  for (let i = 0; i < util.spots.length; i++) {
    util.spots[i].innerText = "";
    util.spots[i].style.removeProperty("background-color");
    util.spots[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(square) {
  if (typeof util.board[square.target.id] == "number") {
    turn(square.target.id, util.me);
    if (!util.checkWin(util.board, util.me) && !checkTie())
      turn(bestSpot(), util.computer);
  }
}

const turn = (squareId, player) => {
  util.board[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = util.checkWin(util.board, player);
  if (gameWon) gameOver(gameWon);
};

const gameOver = gameWon => {
  for (let index of util.boxes[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == util.me ? "blue" : "red";
  }
  for (let i = 0; i < util.spots.length; i++) {
    util.spots[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(gameWon.player == util.me ? "You win!" : "You lose.");
  util.replayBtn.style.display = "block";
  util.replayBtn.addEventListener("click", () => initializeApp());
};

const declareWinner = who => {
  util.outputArea.style.display = "block";
  document.querySelector(".result .text").innerText = who;
};

const bestSpot = () => {
  return util.minimax(util.board, util.computer).index;
};

const checkTie = () => {
  if (util.emptySquares().length == 0) {
    for (let i = 0; i < util.spots.length; i++) {
      util.spots[i].style.backgroundColor = "green";
      util.spots[i].removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie Game!");

    util.replayBtn.style.display = "block";

    util.replayBtn.addEventListener("click", () => initializeApp());
    return true;
  }
  return false;
};
