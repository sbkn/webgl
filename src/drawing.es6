import Init from "./init.es6";

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
		Drawing.createShape(this.gl, this.fshader, this.vshader, triangleCoords);

		/** SQUARE **/
		const squareCoords = [-0.5, -0.1, -0.6, -0.6, 0.4, -0.2];
		Drawing.createShape(this.gl, this.fshader, this.vshader, squareCoords);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
		this.gl.flush();
	}

	static createShape(gl, fshader, vshader, coords) {

		const program = Drawing.linkShaderToProgram(gl, fshader, vshader);
		Drawing.validateAndUseProgram(gl, program);
		const vattrib = Drawing.findPposReference(gl, program);
		Drawing.createAndBindBuffer(gl);
		Drawing.putVerticesIntoBuffer(gl, vattrib, coords);
		Drawing.drawObject(gl);
	}

	static linkShaderToProgram(gl, fshader, vshader) {

		const program = gl.createProgram();
		gl.attachShader(program, fshader);
		gl.attachShader(program, vshader);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

			console.error("Error during program linking", gl.getProgramInfoLog(program));
			return null;
		}
		return program;
	}

	static validateAndUseProgram(gl, program) {

		gl.validateProgram(program);
		if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {

			console.error("Error during program validation", gl.getProgramInfoLog(program));
			return null;
		}
		gl.useProgram(program);
	}

	static findPposReference(gl, program) {

		const vattrib = gl.getAttribLocation(program, "ppos");
		if (vattrib === -1) {
			console.error("Error during attribute address retrieval");
			return null;
		}
		gl.enableVertexAttribArray(vattrib);
	}

	static createAndBindBuffer(gl) {

		const vbuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);

		return vbuffer;
	}

	static drawObject(gl) {

		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}

	static putVerticesIntoBuffer(gl, vattrib, coords) {

		const vertices = new Float32Array(coords);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
		gl.vertexAttribPointer(vattrib, 2, gl.FLOAT, false, 0, 0);
	}
}