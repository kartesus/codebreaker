import * as Game from "./game";

let game: Game.Action[];

beforeEach(() => {
  game = Game.withCode([1, 2, 3, 4]);
});

test("reify game", () => {
  let g = Game.reify(game);
  expect(g).toMatchObject({ code: [1, 2, 3, 4], guesses: [], isBroken: false });
});

test("guess is computed", () => {
  game = Game.guess(game, [0, 0, 0, 0]);
  let g = Game.reify(game);
  expect(g.guesses[0]).toMatchObject({ guess: [0, 0, 0, 0] });
});

test("match numbers", () => {
  game = Game.guess(game, [4, 3, 2, 1]);
  let g = Game.reify(game);
  expect(g.guesses[0]).toMatchObject({ hint: ["x", "x", "x", "x"] });
});

test("match position", () => {
  game = Game.guess(game, [1, 2, 3, 4]);
  let g = Game.reify(game);
  expect(g.guesses[0]).toMatchObject({ hint: ["o", "o", "o", "o"] });
});

test("doesn't match", () => {
  game = Game.guess(game, [9, 8, 7, 6]);
  let g = Game.reify(game);
  expect(g.guesses[0]).toMatchObject({ hint: ["-", "-", "-", "-"] });
});

test("hint order is [position match, number match, no match]", () => {
  game = Game.guess(game, [1, 0, 2, 4]);
  let g = Game.reify(game);
  expect(g.guesses[0]).toMatchObject({ hint: ["o", "o", "x", "-"] });
});

test("game starts unbroken", () => {
  let g = Game.reify(game);
  expect(g).toMatchObject({ isBroken: false });
});

test("code is broken on correct sequence", () => {
  game = Game.guess(game, [1, 2, 3, 4]);
  let g = Game.reify(game);
  expect(g).toMatchObject({ isBroken: true });
});

test("guesses are ignored after code is broken", () => {
  game = Game.guess(game, [0, 0, 0, 0]);
  game = Game.guess(game, [0, 0, 0, 0]);
  game = Game.guess(game, [1, 2, 3, 4]);
  game = Game.guess(game, [0, 0, 0, 0]);
  game = Game.guess(game, [0, 0, 0, 0]);
  let g = Game.reify(game);
  expect(g.guesses).toHaveLength(3);
});
