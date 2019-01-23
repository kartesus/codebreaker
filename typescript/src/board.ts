export type Action =
  | { type: "SetCode"; code: number[] }
  | {
      type: "AddGuess";
      guess: number[];
      hint: HintElement[];
      isDone: boolean;
    };

type HintElement = "x" | "o" | "-";
export type Move = { guess: Number[]; hint: HintElement[] };
type Board = { code: number[]; guesses: Move[]; isDone: boolean };

export function setup(code: number[]): Action[] {
  return [{ type: "SetCode", code }];
}

export function reify(actions: Action[]): Board {
  return actions.reduce(
    (game: Board, action: Action) => {
      switch (action.type) {
        case "SetCode":
          return Object.assign(game, { code: action.code });
        case "AddGuess":
          game.isDone = action.isDone;
          game.guesses.push({ guess: action.guess, hint: action.hint });
          return game;
      }
    },
    { code: [], guesses: [], isDone: false }
  );
}

export function guess(game: Action[], guess: number[]): Action[] {
  let g = reify(game);

  if (g.isDone) return game;

  let hint = compare(g.code, guess);
  let isDone = isCodeBroken(g.code, guess);
  game.push({ type: "AddGuess", guess, hint, isDone });
  return game;
}

function compare(code: Number[], guess: Number[]): HintElement[] {
  let precedence = ["o", "x", "-"];
  return code
    .map((element, i) => {
      if (element === guess[i]) return "o";
      else if (guess.indexOf(element) > -1) return "x";
      else return "-";
    })
    .sort((a, b) => precedence.indexOf(a) - precedence.indexOf(b));
}

function isCodeBroken(code: number[], guess: number[]) {
  for (let i in code) if (code[i] !== guess[i]) return false;
  return true;
}
