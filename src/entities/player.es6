import Unit from "./unit.es6";
import Projectile from "./projectile.es6";


export default class Player extends Unit {

	constructor(posX, posY, coords, projectilesRef) {

		super(posX, posY, coords);

		this._projectilesRef = projectilesRef;
	}

	fire() {
		console.log('FIRE!');

		this._projectilesRef.push(new Projectile(this.posX, this.posY, [-0.3, 0.3, -0.3, -0.3, -0.1, 0.3]));
	}
}