import Drawing from "./drawing.es6";
import Logic from "./logic.es6";
import Player from "./entities/player.es6";
import Unit from "./entities/unit.es6";
import Input from "./input.es6";


export default class Game {

	startGame() {

		this._lastUpdate = 0;
		this.player = new Player(0, 0, [0.0, 0.2, -0.2, -0.2, 0.2, -0.2]);
		this.objects = [
			new Unit(-0.6, 0.6, [-0.3, 0.3, -0.3, -0.3, -0.1, 0.3])
		];
		this.objects.forEach(e => {
			e.setMovDir(1, -1);
		});

		const logic = new Logic();
		const gfx = new Drawing();
		const input = new Input(this.player);
		this.logic = logic;
		this.gfx = gfx;
		this.input = input;

		logic.run();
		gfx.run();

		window.requestAnimationFrame(this.gameLoop.bind(this));
	}

	gameLoop(timestamp) {

		const timeSinceLastUpdate = timestamp - this._lastUpdate;
		this.logic.step(timeSinceLastUpdate, this.input, this.player, this.objects);
		this.gfx.draw(timeSinceLastUpdate, [...this.objects, this.player]);
		this._lastUpdate = timestamp;
		window.requestAnimationFrame(this.gameLoop.bind(this));
	}
}


document.addEventListener("DOMContentLoaded", function () {
	new Game().startGame();
}, false);
