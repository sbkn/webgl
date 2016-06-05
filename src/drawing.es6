export default class Drawing {

	constructor() {

		this.gl = null;
		this.running = false;
	}

	start() {
		const canvas = document.getElementById("canvas");

		this.gl = Drawing.initWebGL(canvas);

		if (!this.gl) {
			return null;
		}

		this.gl.viewport(0, 0, canvas.width, canvas.height);
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		const fshader = Drawing.createFragmentShader(this.gl);

		const vshader = Drawing.createVertexShader(this.gl);

		const program = Drawing.linkShaderToProgram(this.gl, fshader, vshader);

		Drawing.validateAndUseProgram(this.gl, program);

		const vattrib = Drawing.findPposReference(this.gl, program);

		Drawing.createAndBindBuffer(this.gl);

		Drawing.putVerticesIntoBuffer(this.gl, vattrib);

		Drawing.drawObject(this.gl);

		// TODO: use window.requestAnimationFrame() instead:
		this.running = true;
		setTimeout(() => {
			this.draw();
		}, 40);
	}

	draw() {
		if (!this.running || !this.gl)
			return null;

		this.gl.clearColor(0.0, 0.0, 0.5, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
		this.gl.flush();
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

	static putVerticesIntoBuffer(gl, vattrib) {

		const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
		gl.vertexAttribPointer(vattrib, 2, gl.FLOAT, false, 0, 0);
	}

	static drawObject(gl) {

		gl.drawArrays(gl.TRIANGLES, 0, 3);
		gl.flush();
	}
}