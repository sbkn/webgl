export default class Init {

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

	static createFragmentShader(gl) {

		const fshader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fshader, "void main(void) {gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);}");
		gl.compileShader(fshader);
		if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {

			console.error("Error during fragment shader compilation", gl.getShaderInfoLog(fshader));
			return null;
		}

		return fshader;
	}

	static createVertexShader(gl) {

		const vshader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vshader, "attribute vec2 ppos; void main(void){ gl_Position = vec4(ppos.x, ppos.y, 0.0, 1.0);}");
		gl.compileShader(vshader);
		if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {

			console.error("Error during vertex shader compilation", gl.getShaderInfoLog(vshader));
			return null;
		}

		return vshader;
	}
}