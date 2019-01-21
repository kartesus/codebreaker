import * as Board from "./board";

let board: Board.Action[];

beforeEach(() => {
  board = Board.setup([1, 2, 3, 4]);
});

test("reify game", () => {
  let b = Board.reify(board);
  expect(b).toMatchObject({ code: [1, 2, 3, 4], guesses: [], isDone: false });
});

test("guess is computed", () => {
  board = Board.guess(board, [0, 0, 0, 0]);
  let b = Board.reify(board);
  expect(b.guesses[0]).toMatchObject({ guess: [0, 0, 0, 0] });
});

test("match numbers", () => {
  board = Board.guess(board, [4, 3, 2, 1]);
  let b = Board.reify(board);
  expect(b.guesses[0]).toMatchObject({ hint: ["x", "x", "x", "x"] });
});

test("match position", () => {
  board = Board.guess(board, [1, 2, 3, 4]);
  let b = Board.reify(board);
  expect(b.guesses[0]).toMatchObject({ hint: ["o", "o", "o", "o"] });
});

test("doesn't match", () => {
  board = Board.guess(board, [9, 8, 7, 6]);
  let b = Board.reify(board);
  expect(b.guesses[0]).toMatchObject({ hint: ["-", "-", "-", "-"] });
});

test("hint order is [position match, number match, no match]", () => {
  board = Board.guess(board, [1, 0, 2, 4]);
  let b = Board.reify(board);
  expect(b.guesses[0]).toMatchObject({ hint: ["o", "o", "x", "-"] });
});

test("board starts not done", () => {
  let b = Board.reify(board);
  expect(b).toMatchObject({ isDone: false });
});

test("board is done on correct code", () => {
  board = Board.guess(board, [1, 2, 3, 4]);
  let b = Board.reify(board);
  expect(b).toMatchObject({ isDone: true });
});

test("guesses are ignored after board is done", () => {
  board = Board.guess(board, [0, 0, 0, 0]);
  board = Board.guess(board, [0, 0, 0, 0]);
  board = Board.guess(board, [1, 2, 3, 4]);
  board = Board.guess(board, [0, 0, 0, 0]);
  board = Board.guess(board, [0, 0, 0, 0]);
  let b = Board.reify(board);
  expect(b.guesses).toHaveLength(3);
});
