export default class Logic {

	run() {


	}

	step(timestamp, input, player, objects) {

		const inputState = input.getKeyState();
		Logic._handleUserInput(inputState, player);

		for (const object of [...objects, player]) {
			object.move();
		}
	}

	/**
	 * Transform input state into movement of player object
	 * @param {Object} inputState Holds state of keys
	 * @param {Object} object Object getting moved
	 * @returns {void}
	 * @private
	 */
	static _handleUserInput(inputState, object) {

		let movX = 0;
		let movY = 0;

		// HANDLE MOVEMENT:
		if (inputState['ArrowLeft'] === 'keydown') {
			movX = -1;
			if (inputState['ArrowRight'] === 'keydown') {
				movX = 0;
			}
		}
		if (inputState['ArrowRight'] === 'keydown') {
			movX = 1;
			if (inputState['ArrowLeft'] === 'keydown') {
				movX = 0;
			}
		}
		if (inputState['ArrowRight'] === 'keydown') {
			movX = 1;
			if (inputState['ArrowLeft'] === 'keydown') {
				movX = 0;
			}
		}
		if (inputState['ArrowUp'] === 'keydown') {
			movY = 1;
			if (inputState['ArrowDown'] === 'keydown') {
				movY = 0;
			}
		}
		if (inputState['ArrowDown'] === 'keydown') {
			movY = -1;
			if (inputState['ArrowUp'] === 'keydown') {
				movY = 0;
			}
		}
		// HANDLE FIRING:
		if (inputState[' '] === 'keydown') {
			object.fire();
		}

		object.setMovDir(movX, movY);
	}
}