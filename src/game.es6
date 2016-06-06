import Drawing from "./drawing.es6";

export default class Game {

	constructor() {

	}

	startGame() {

		new Drawing().runGfx();
	}
}


document.addEventListener("DOMContentLoaded", function () {
	new Game().startGame();
}, false);