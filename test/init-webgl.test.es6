import InitWebGL from "../src/init-webgl.es6";

jest.unmock("../src/init-webgl.es6");

describe("InitWebGL", () => {

	describe("#initWebGL", () => {

		const canvas = {
			getContext: jest.fn(() => {
				return "gl";
			})
		};
		it("should do something awesome", () => {

			const expected = "gl";
			const result = InitWebGL.initWebGL(canvas);

			expect(result).toBe(expected);
		});
	});
});
