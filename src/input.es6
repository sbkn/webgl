export default class Input {

	constructor(object) {

		this._objectToMove = object;
		this._inputState = {};

		document.addEventListener('keydown', (event) => {
			this.handleEvent(event);
		});

		document.addEventListener('keyup', (event) => {
			this.handleEvent(event);
		});
	}

	getKeyState() {
		return this._inputState;
	}

	handleEvent(event) {
		console.log(event.key, event.type);
		this._inputState[event.key] = event.type;
	}
}