export default class Collision {

	static isObjOutOfBounds(object) {

		let result = false;
		for (const coord of object.coords) {
			if (coord >= 1 || coord <= -1) {
				result = true;
				break;
			}
		}

		return result;
	}
}