import Drawing from "./drawing.es6";

export default class Game {

	constructor() {

	}

	startGame() {

		new Drawing().start();
	}
}


document.addEventListener("DOMContentLoaded", function () {
	new Game().startGame();
}, false);