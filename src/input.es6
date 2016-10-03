export default class Input {

	constructor(object) {

		this._objectToMove = object;

		document.addEventListener('keydown', (event) => {
			this.handleEvent(event);
		});

		document.addEventListener('keyup', (event) => {
			this.handleEvent(event);
		});
	}

	handleEvent(event) {
		console.log(event.key, event.type);
		switch (event.key) {
			case 'ArrowLeft':
				if (event.type === 'keydown')
					this._objectToMove.setMovDir(-1, this._objectToMove.movY);
				else if (event.type === 'keyup')
					this._objectToMove.setMovDir(0, this._objectToMove.movY);
				break;
			case 'ArrowUp':
				if (event.type === 'keydown')
					this._objectToMove.setMovDir(this._objectToMove.movY, 1);
				else if (event.type === 'keyup')
					this._objectToMove.setMovDir(this._objectToMove.movY, 0);
				break;
			case 'ArrowRight':
				if (event.type === 'keydown')
					this._objectToMove.setMovDir(1, this._objectToMove.movY);
				if (event.type === 'keyup')
					this._objectToMove.setMovDir(0, this._objectToMove.movY);
				break;
			case 'ArrowDown':
				if (event.type === 'keydown')
					this._objectToMove.setMovDir(this._objectToMove.movX, -1);
				if (event.type === 'keyup')
					this._objectToMove.setMovDir(this._objectToMove.movX, 0);
				break;
			default:
				break;
		}
	}
}