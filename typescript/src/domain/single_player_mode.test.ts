import * as SinglePlayerMode from "./single_player_mode";

let game: SinglePlayerMode.Game;
let attempt: SinglePlayerMode.Attempt;

beforeEach(() => {
  let x = SinglePlayerMode.newGame({ code: [1, 2, 3, 4], maxAttempts: 3 });
  game = x[0];
  attempt = x[1];
});

test("player attempts are recorded", () => {
  attempt([4, 3, 2, 1]);
  attempt([1, 2, 3, 4]);
  let guesses = game.attempts.map(a => a.guess);
  expect(guesses).toMatchObject([[4, 3, 2, 1], [1, 2, 3, 4]]);
});

test("hints are recorded", () => {
  attempt([4, 3, 2, 1]);
  attempt([1, 2, 3, 4]);
  let hints = game.attempts.map(a => a.hint);
  expect(hints).toMatchObject([["x", "x", "x", "x"], ["o", "o", "o", "o"]]);
});

test("game ends when hitting max attempts", () => {
  let fn: any = jest.fn();
  game.onMaxAttempts(fn);
  attempt([4, 3, 2, 1]);
  attempt([5, 4, 3, 2]);
  attempt([6, 5, 4, 3]);
  expect(fn).toHaveBeenCalled();
});

test("game ends when player hits the correct sequence", () => {
  let fn: any = jest.fn();
  game.onCodeBroken(fn);
  attempt([4, 3, 2, 1]);
  attempt([1, 2, 3, 4]);
  expect(fn).toHaveBeenCalled();
});

test("if code is broken at the last attempt, only one event is fired", () => {
  let fn1: any = jest.fn();
  let fn2: any = jest.fn();
  game.onCodeBroken(fn1);
  game.onMaxAttempts(fn2);
  attempt([4, 3, 2, 1]);
  attempt([5, 4, 3, 2]);
  attempt([1, 2, 3, 4]);
  expect(fn1).toHaveBeenCalled();
  expect(fn2).not.toHaveBeenCalled();
});
