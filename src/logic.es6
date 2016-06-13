
export default class Logic {

	run() {


	}

	step(frame, objects) {

		for (const object of objects) {
			
			object.move();
		}
	}
}