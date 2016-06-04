import InitWebGL from "./init-webgl.es6";

export default class Game {

	constructor() {

	}

	startGame() {

		new InitWebGL().start();
	}
}


document.addEventListener("DOMContentLoaded", function () {
	new Game().startGame();
}, false);