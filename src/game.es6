import Drawing from "./drawing.es6";
import Logic from "./logic.es6";
import Player from "./entities/player.es6";
import Unit from "./entities/unit.es6";
import Input from "./input.es6";


export default class Game {

	startGame() {

		this._lastUpdate = 0;
		this.projectiles = [];
		this.objects = [
			new Unit(-0.6, 0.6, [-0.3, 0.3, -0.3, -0.3, -0.1, 0.3]),
			new Unit(-0.6, 0.6, [-0.3, 0.3, -0.3, -0.3, -0.1, 0.3]),
			new Unit(-0.6, 0.6, [-0.3, 0.3, -0.3, -0.3, -0.1, 0.3]),
			new Unit(-0.6, 0.6, [-0.3, 0.3, -0.3, -0.3, -0.1, 0.3]),
			new Unit(-0.6, 0.6, [-0.3, 0.3, -0.3, -0.3, -0.1, 0.3])
		];
		this.player = new Player(0, 0, [0.0, 0.2, -0.2, -0.2, 0.2, -0.2], this.projectiles);

		this.objects.forEach(e => {
			e.setMovDir(Math.random(), -1 * Math.random());
		});

		const logic = new Logic();
		const gfx = new Drawing();
		const input = new Input();
		this.logic = logic;
		this.gfx = gfx;
		this.input = input;

		logic.run();
		gfx.run();

		window.requestAnimationFrame(this.gameLoop.bind(this));
	}

	gameLoop(timestamp) {

		const timeSinceLastUpdate = timestamp - this._lastUpdate;
		this.logic.step(timeSinceLastUpdate, this.input, this.player, this.objects, this.projectiles);
		this.gfx.draw(timeSinceLastUpdate, [...this.objects, ...this.projectiles, this.player]);
		this._lastUpdate = timestamp;
		window.requestAnimationFrame(this.gameLoop.bind(this));
	}
}


document.addEventListener("DOMContentLoaded", function () {
	new Game().startGame();
}, false);
