import * as SinglePlayerMode from "./single_player_mode";
import * as SecretMaster from "./secret_master";
import * as Prompt from "./prompt";

main();

async function main() {
  let CODE_ELEMENTS = [1, 2, 3, 4, 5, 6];
  let CODE_SIZE = 4;
  let MAX_ATTEMPTS = 6;

  let master = SecretMaster.build({ size: CODE_SIZE, elements: CODE_ELEMENTS });
  let code = master.nextCode();
  let [game, attempt] = SinglePlayerMode.newGame({
    code,
    maxAttempts: MAX_ATTEMPTS
  });

  let gameOver = false;
  let hint = "";

  game.onMaxAttempts(() => {
    gameOver = true;
    Prompt.youLose(code);
    process.exit(0);
  });

  game.onCodeBroken(() => {
    gameOver = true;
    Prompt.youWin();
    process.exit(0);
  });

  Prompt.greet(
    MAX_ATTEMPTS,
    CODE_SIZE,
    CODE_ELEMENTS[0],
    CODE_ELEMENTS[CODE_ELEMENTS.length - 1]
  );

  while (!gameOver) {
    if (hint !== "") Prompt.showHint(hint);
    let guess = await Prompt.askForGuess();
    if (master.validate(guess)) {
      attempt(guess);
      hint = game.attempts[game.attempts.length - 1].hint.join("");
    } else {
      Prompt.invalidGuess(
        CODE_SIZE,
        CODE_ELEMENTS[0],
        CODE_ELEMENTS[CODE_ELEMENTS.length - 1]
      );
      hint = "";
    }
  }
}
