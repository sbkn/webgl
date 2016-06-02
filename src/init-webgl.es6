
export default class InitWebGL {

	constructor() {

		this.gl = null;
	}

	start() {
		const canvas = document.getElementById("canvas");

		this.gl = InitWebGL.initWebGL(canvas);

		if (this.gl) {
			this.gl.viewport(0, 0, canvas.width, canvas.height);

			this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

			this.gl.enable(this.gl.DEPTH_TEST);

			this.gl.depthFunc(this.gl.LEQUAL);

			this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		}
	}

	static initWebGL(canvas) {
		let gl = null;

		try {
			gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		}
		catch (e) {
			console.error(e);
		}

		if (!gl) {
			console.error("Unable to initialize WebGL. Your browser may not support it.");
			gl = null;
		}

		return gl;
	}
}

document.addEventListener("DOMContentLoaded", function () {
	new InitWebGL().start();
}, false);