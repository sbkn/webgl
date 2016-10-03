export default class Logic {

	run() {


	}

	step(frame, input, objects) {

		const inputState = input.getKeyState();
		Logic._handleUserInput(inputState, objects[0]);

		for (const object of objects) {
			object.move();
		}
	}

	static _handleUserInput(inputState, object) {

		let movX = 0;
		let movY = 0;

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

		object.setMovDir(movX, movY);
	}
}