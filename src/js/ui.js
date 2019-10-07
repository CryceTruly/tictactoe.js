import Util from "./util";
let util;

export default class Ui {
  initializeApp() {
    util = new Util();
    util.replayBtn.style.display = "none";
    util.outputArea.style.display = "none";

    for (let i = 0; i < util.spots.length; i++) {
      util.spots[i].innerText = "";
      util.spots[i].style.removeProperty("background-color");
      util.spots[i].addEventListener("click", turnClick, false);
    }
  }
}
