class Ui {
  constructor() {
    this.spots = document.querySelectorAll(".box");
    this.replayBtn = document.querySelector("#replay");
    this.outputArea = document.querySelector(".result");
  }

  updateSquare(square, player) {
    document.getElementById(square).innerText = player;
  }

  declareWinner(who) {
    this.outputArea.style.display = "block";
    document.querySelector(".result .text").innerText = who;
    this.replayBtn.style.display = "block";
  }
}

module.exports = Ui;
