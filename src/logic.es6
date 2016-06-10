import Player from "./entities/player.es6";

export default class Logic {

	run() {

		this._player = new Player(0, 0);
	}

	step(frame) {

		this._player.move(1, 1);
	}
}