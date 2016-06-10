import Drawing from "./drawing.es6";
import Logic from "./logic.es6";

export default class Game {

	startGame() {
		this.objects = [
			[0.0, 0.5, -0.5, -0.5, 0.5, -0.5],
			[-0.5, 0.5, -0.5, -0.5, -0.1, 0.5]
		];

		const logic = new Logic();
		const gfx = new Drawing();

		gfx.run();
		logic.run();

		this.gameLoop(logic, gfx);
	}

	gameLoop(logic, gfx) {

		let frame = 0;
		setInterval(() => {
			logic.step(frame);
			gfx.draw(frame, this.objects);
			frame++;
		}, 400);
	}
}


document.addEventListener("DOMContentLoaded", function () {
	new Game().startGame();
}, false);