export default class DrawingObjects {

	static createShape(gl, fshader, vshader, coords) {

		const program = DrawingObjects.linkShaderToProgram(gl, fshader, vshader);
		DrawingObjects.validateAndUseProgram(gl, program);
		const vattrib = DrawingObjects.findPposReference(gl, program);
		DrawingObjects.createAndBindBuffer(gl);
		DrawingObjects.putVerticesIntoBuffer(gl, vattrib, coords);
		DrawingObjects.drawObject(gl);
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