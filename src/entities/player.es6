export default class Player {

	constructor(posX, posY) {

		this._pos = {x: posX, y: posY};
		this._facingDirection = {x: 0, y: 0};
	}

	get posX() {
		return this._pos.x;
	}

	get posY() {
		return this._pos.y;
	}

	get facingDirection() {
		return this._facingDirection;
	}

	move(dx, dy) {

		this._facingDirection.x = dx;
		this._facingDirection.y = dy;
		this._pos.x += dx;
		this._pos.y += dy;
	}
}