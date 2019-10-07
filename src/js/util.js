export default class Util {
  constructor() {
    this.board = Array.from(Array(9).keys());
    this.me = "o";
    this.computer = "x";
    this.boxes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];

    this.spots = document.querySelectorAll(".box");
    this.replayBtn = document.querySelector("#replay");
    this.outputArea = document.querySelector(".result");
  }

  emptySquares() {
    return this.board.filter(s => typeof s == "number");
  }

  checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
    let gameWon = null;
    for (let [index, win] of this.boxes.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index: index, player: player };
        break;
      }
    }
    return gameWon;
  }
  minimax(newBoard, player) {
    let availSpots = this.emptySquares();

    if (this.checkWin(newBoard, this.me)) {
      return { score: -10 };
    } else if (this.checkWin(newBoard, this.computer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }
    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      if (player == this.computer) {
        let result = this.minimax(newBoard, this.me);
        move.score = result.score;
      } else {
        let result = this.minimax(newBoard, this.computer);
        move.score = result.score;
      }

      newBoard[availSpots[i]] = move.index;
      moves.push(move);
    }

    let bestMove;
    if (player === this.computer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  turnClick(square) {
    if (typeof this.board[square.target.id] == "number") {
      turn(square.target.id, this.me);
      if (!this.checkWin(util.board, this.me) && !checkTie())
        this.turn(this.bestSpot(), this.computer);
    }
  }
  bestSpot() {
    return this.minimax(util.board, util.computer).index;
  }
}
