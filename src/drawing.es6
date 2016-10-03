import Init from "./init.es6";
import DrawingObjects from "./tools/drawing-objects.es6";

const BG_COLOR_SWITCH_DELAY = 500;

export default class Drawing {

	constructor() {

		this.gl = null;
		this._running = false;
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

		this._timeSinceLastUpdate = 0;
		this._currentBgColor = 0;
		this._bgColors = [[0.3, 0.3, 0.6, 1.0], [0.6, 0.1, 0.1, 1.0]];
		this._running = true;
	}

	/**
	 * Main drawing method
	 * @param {number} timePassed How many ms since last draw?
	 * @param {Array} objects Objects to draw
	 * @returns {null}
	 */
	draw(timePassed, objects) {
		if (!this._running || !this.gl)
			return null;

		if (this._timeSinceLastUpdate > BG_COLOR_SWITCH_DELAY) {
			this._timeSinceLastUpdate = 0;
			this._currentBgColor = Drawing._toggleBgColor(this._currentBgColor);
		} else {
			this._timeSinceLastUpdate += timePassed;
		}

		this.gl.clearColor(...this._bgColors[this._currentBgColor]);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		for (const object of objects) {

			DrawingObjects.createShape(this.gl, this.fshader, this.vshader, object.coords);
		}

		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
		this.gl.flush();
	}

	static _toggleBgColor(curColor) {
		return curColor === 0 ? 1 : 0;
	}
}