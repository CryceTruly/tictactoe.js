let board;
const me = 'o';
const computer = 'x';
const boxes = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const spots = document.querySelectorAll('.box');
const replayBtn=document.querySelector('#replay');
const outputArea=document.querySelector(".result");
initializeApp();


function initializeApp() {
	replayBtn.style.display = "none";
	outputArea.style.display = "none";
	board = Array.from(Array(9).keys());
	spots.for
	for (let i = 0; i < spots.length; i++) {
		spots[i].innerText = '';
		spots[i].style.removeProperty('background-color');
		spots[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof board[square.target.id] == 'number') {
		turn(square.target.id, me)
		if (!checkWin(board, me) && !checkTie()) turn(bestSpot(), computer);
	}
}

const turn=(squareId, player)=> {
	board[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(board, player)
	if (gameWon) gameOver(gameWon)
}

const checkWin=(board, player)=> {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of boxes.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

const gameOver=gameWon=> {
	for (let index of boxes[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == me ? "blue" : "red";
	}
	for (let i = 0; i < spots.length; i++) {
		spots[i].removeEventListener('click', turnClick, false);
	}

	
	declareWinner(gameWon.player == me ? "You win!" : "You lose.");
	replayBtn.style.display = "block";
	
    replayBtn.addEventListener('click',initializeApp);
}

const declareWinner=who=> {
	outputArea.style.display = "block";
	document.querySelector(".result .text").innerText = who;
}

const emptySquares=()=> {
	return board.filter(s => typeof s == 'number');
}

const bestSpot=()=> {
	return minimax(board, computer).index;
}

const checkTie=()=> {
	if (emptySquares().length == 0) {
		for (let i = 0; i < spots.length; i++) {
			spots[i].style.backgroundColor = "green";
			spots[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		
	replayBtn.style.display = "block";
	
replayBtn.addEventListener('click',initializeApp);
		return true;
	}
	return false;
}

const minimax=(newBoard, player)=> {
	let availSpots = emptySquares();

	if (checkWin(newBoard, me)) {
		return {score: -10};
	} else if (checkWin(newBoard, computer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	let moves = [];
	for (let i = 0; i < availSpots.length; i++) {
		let move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == computer) {
			let result = minimax(newBoard, me);
			move.score = result.score;
		} else {
			let result = minimax(newBoard, computer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	let bestMove;
	if(player === computer) {
		let bestScore = -10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}