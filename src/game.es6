import Drawing from "./drawing.es6";
import Logic from "./logic.es6";
import Player from "./entities/player.es6";
import Unit from "./entities/unit.es6";
import Input from "./input.es6";


export default class Game {

	startGame() {

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

		logic.run();
		gfx.run();

		this.gameLoop(logic, gfx, input);
	}

	gameLoop(logic, gfx, input) {

		let frame = 0;
		// TODO: use window.requestAnimationFrame() instead:
		setInterval(() => {
			logic.step(frame, input, this.player, this.objects);
			gfx.draw(frame, [...this.objects, this.player]);
			frame++;
		}, 10);
	}
}


document.addEventListener("DOMContentLoaded", function () {
	new Game().startGame();
}, false);
