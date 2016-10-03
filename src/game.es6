import Drawing from "./drawing.es6";
import Logic from "./logic.es6";
import Player from "./entities/player.es6";
import Unit from "./entities/unit.es6";


export default class Game {

	startGame() {

		this.objects = [
			new Player(0, 0, [0.0, 0.2, -0.2, -0.2, 0.2, -0.2]),
			new Unit(-0.6, 0.6, [-0.3, 0.3, -0.3, -0.3, -0.1, 0.3])
		];
		this.objects[0].setMovDir(1, 1);

		const logic = new Logic();
		const gfx = new Drawing();

		logic.run();
		gfx.run();

		this.gameLoop(logic, gfx);
	}

	gameLoop(logic, gfx) {

		let frame = 0;
		setInterval(() => {
			logic.step(frame, this.objects);
			gfx.draw(frame, this.objects);
			frame++;
		}, 10);
	}
}


document.addEventListener("DOMContentLoaded", function () {
	new Game().startGame();
}, false);