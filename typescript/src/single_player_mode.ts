import { setup as newBoard, guess, reify, Move } from "./board";

export type Game = {
  attempts: Move[];
  onMaxAttempts(fn: (g: Game) => void): void;
  onCodeBroken(fn: (g: Game) => void): void;
};
export type Attempt = (guess: number[]) => void;

type GameAttempt = [Game, Attempt];

export function newGame({ code, maxAttempts }): GameAttempt {
  let board = newBoard(code);
  let nAttempts = 0;
  let maxAttemptsCallback = (game: Game) => {};
  let codeBrokenCallback = (game: Game) => {};

  let game: Game = {
    onMaxAttempts(fn: (game: Game) => void) {
      maxAttemptsCallback = fn;
    },

    onCodeBroken(fn: (game: Game) => void) {
      codeBrokenCallback = fn;
    },

    get attempts() {
      return board
        .filter(a => a.type === "AddGuess")
        .map((a: any) => ({ guess: a.guess, hint: a.hint }));
    }
  };

  function attempt(aCode: number[]) {
    board = guess(board, aCode);

    let aGuess: any = board[board.length - 1];
    if (aGuess.isDone) return codeBrokenCallback(game);

    nAttempts = nAttempts + 1;
    if (nAttempts === maxAttempts) return maxAttemptsCallback(game);
  }

  return [game, attempt];
}
