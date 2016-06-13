import Init from "./init.es6";
import DrawingObjects from "./tools/drawing-objects.es6";

export default class Drawing {

	constructor() {

		this.gl = null;
		this.running = false;
	}

	/**
	 * Init and create gfx stuff
	 * @returns {void}
	 */
	run() {
		const canvas = document.getElementById("canvas");

		this.gl = Init.initWebGL(canvas);
		if (!this.gl) {
			return;
		}

		this.gl.viewport(0, 0, canvas.width, canvas.height);
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.fshader = Init.createFragmentShader(this.gl);
		this.vshader = Init.createVertexShader(this.gl);

		// TODO: use window.requestAnimationFrame() instead:
		this.running = true;
	}

	/**
	 * Main drawing method
	 * @param {number} frame
	 * @param {Array} objects
	 * @returns {null}
	 */
	draw(frame, objects) {
		if (!this.running || !this.gl)
			return null;

		frame % 2 ? this.gl.clearColor(0.3, 0.3, 0.6, 1.0) : this.gl.clearColor(0.6, 0.1, 0.1, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		for (const object of objects) {

			DrawingObjects.createShape(this.gl, this.fshader, this.vshader, object.coords);
		}

		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
		this.gl.flush();
	}
}