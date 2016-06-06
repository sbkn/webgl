import Init from "../src/init.es6";

jest.unmock("../src/init.es6");

describe("Init", () => {

	describe("#initWebGL", () => {

		it("should fetch canvas gl context properly", () => {

			const canvas = {
				getContext: jest.fn(() => {
					return "gl";
				})
			};

			const expected = "gl";
			const result = Init.initWebGL(canvas);

			expect(result).toBe(expected);
		});

		it("should fetch canvas experimental gl context properly", () => {

			const canvas = {
				getContext: jest.fn(param => {
					if (param === "webgl")
						return null;
					return "gl";
				})
			};

			const expected = "gl";
			const result = Init.initWebGL(canvas);

			expect(result).toBe(expected);
		});

		it("should return null if no gl could be retrieved from canvas", () => {

			const canvas = {
				getContext: jest.fn(() => {
					return null;
				})
			};

			const expected = null;
			const result = Init.initWebGL(canvas);

			expect(result).toBe(expected);
		});
	});
});
