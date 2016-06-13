import Player from "../src/entities/player.es6";

jest.unmock("../src/entities/player.es6");
jest.unmock("../src/entities/unit.es6");

describe("Player", () => {

	describe("#constructor", () => {

		it("should construct correctly", () => {

			const posX = 5;
			const posY = 3;

			const player = new Player(posX, posY);

			expect(player.posX).toBe(5);
			expect(player.posY).toBe(3);

			expect(player.facingDirection.x).toBe(0);
			expect(player.facingDirection.y).toBe(0);
		});
	});

	describe("#move", () => {

		it("should move correctly (positive delta)", () => {

			const posX = 0;
			const posY = 0;

			const player = new Player(posX, posY);

			player.move(1, 2);

			expect(player.posX).toBe(1);
			expect(player.posY).toBe(2);
		});

		it("should move correctly (negative delta)", () => {

			const posX = 0;
			const posY = 0;

			const player = new Player(posX, posY);

			player.move(-1, -2);

			expect(player.posX).toBe(-1);
			expect(player.posY).toBe(-2);
		});
	});
});
