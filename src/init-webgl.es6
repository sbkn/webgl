let gl;

export default class InitWebGL {

	start() {
		let canvas = document.getElementById("glcanvas");

		gl = this.initWebGL(canvas);

		if (gl) {
			gl.viewport(0, 0, canvas.width, canvas.height);

			gl.clearColor(0.0, 0.0, 0.0, 1.0);

			gl.enable(gl.DEPTH_TEST);

			gl.depthFunc(gl.LEQUAL);

			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		}
	}

	initWebGL(canvas) {
		gl = null;

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