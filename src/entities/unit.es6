export default class Unit {

	constructor(posX, posY, coords = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]) {

		this._pos = {x: posX, y: posY};
		this._facingDirection = {x: 0, y: 0};

		this._coords = coords;
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

	get coords() {
		return this._coords;
	}

	move(dx, dy) {

		this._facingDirection.x = dx;
		this._facingDirection.y = dy;
		this._pos.x += dx;
		this._pos.y += dy;
	}
}