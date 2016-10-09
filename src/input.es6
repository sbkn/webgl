export default class Input {

	constructor() {

		this._inputState = {};

		document.addEventListener('keydown', (event) => {
			this.handleKeyboardEvent(event);
		});

		document.addEventListener('keyup', (event) => {
			this.handleKeyboardEvent(event);
		});
	}

	getKeyState() {
		return this._inputState;
	}

	handleKeyboardEvent(event) {
		this._inputState[event.key] = event.type;
	}
}