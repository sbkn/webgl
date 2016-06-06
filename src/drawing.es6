import Init from "./init.es6";
import DrawingObjects from "./tools/drawing-objects.es6";

export default class Drawing {

	constructor() {

		this.gl = null;
		this.running = false;
	}

	runGfx() {
		const canvas = document.getElementById("canvas");

		this.gl = Init.initWebGL(canvas);
		if (!this.gl) {
			return null;
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
		let frame = 0;
		setInterval(() => {
			this.draw(frame);
			frame++;
		}, 400);
	}

	/**
	 * Main drawing loop
	 * @param frame
	 * @returns {null}
	 */
	draw(frame) {
		if (!this.running || !this.gl)
			return null;

		frame % 2 ? this.gl.clearColor(0.3, 0.3, 0.6, 1.0) : this.gl.clearColor(0.6, 0.1, 0.1, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		/** TRIANGLE **/
		const triangleCoords = [0.0, 0.5, -0.5, -0.5, 0.5, -0.5];
		DrawingObjects.createShape(this.gl, this.fshader, this.vshader, triangleCoords);

		/** SQUARE **/
		const squareCoords = [-0.5, 0.5, -0.5, -0.5, -0.1, 0.5];
		DrawingObjects.createShape(this.gl, this.fshader, this.vshader, squareCoords);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
		this.gl.flush();
	}
}