import Collision from "../tools/collision.es6";

export default class Unit {

	constructor(posX, posY, coords = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]) {

		this._pos = {x: posX, y: posY};
		this._facingDirection = {x: 0, y: 0};

		this._coords = Unit.initCoords(coords, posX, posY);
		this._movSpeed = 1 / 100;

		this._movX = 0;
		this._movY = 0;
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

	static initCoords(coords, posX, posY) {
		const newCoords = [];
		newCoords.push(coords[0] + posX);
		newCoords.push(coords[1] + posY);
		newCoords.push(coords[2] + posX);
		newCoords.push(coords[3] + posY);
		newCoords.push(coords[4] + posX);
		newCoords.push(coords[5] + posY);
		return newCoords;
	}

	setMovDir(dx, dy) {

		this._facingDirection.x = dx;
		this._facingDirection.y = dy;

		this._movX = dx;
		this._movY = dy;
	}

	move() {

		this._pos.x += this._movX;
		this._pos.y += this._movY;

		this._coords[0] += this._movX * this._movSpeed;
		this._coords[1] += this._movY * this._movSpeed;
		this._coords[2] += this._movX * this._movSpeed;
		this._coords[3] += this._movY * this._movSpeed;
		this._coords[4] += this._movX * this._movSpeed;
		this._coords[5] += this._movY * this._movSpeed;

		if (Collision.isObjOutOfBounds(this)) {

			this._movX *= -1;
			this._movY *= -1;
		}
		
	}
}