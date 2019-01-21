export type Action =
  | { type: "SetCode"; code: number[] }
  | { type: "AddGuess"; guess: number[] };

type HintElement = "x" | "o" | "-";
type Move = { guess: Number[]; hint: HintElement[] };
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
          let hint = compare(game.code, action.guess);
          game.guesses.push({ guess: action.guess, hint });
          if (/[^\-\x]/.test(hint.join(""))) game.isDone = true;
          return game;
      }
    },
    { code: [], guesses: [], isDone: false }
  );
}

export function guess(game: Action[], guess: number[]): Action[] {
  let g = reify(game);
  if (g.isDone) return game;
  game.push({ type: "AddGuess", guess });
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
