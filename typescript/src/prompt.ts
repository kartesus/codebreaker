import { createInterface as readline, ReadLine } from "readline";

type n = number;

let rl = readline({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});

export function validDigits(codeSize: n, lowerBound: n, upperBound: n) {
  rl.write(`The code has ${codeSize} unique digits, from `);
  rl.write(`${lowerBound} to ${upperBound}.\n`);
}

export function greet(max: n, codeSize: n, lowerBound: n, upperBound: n) {
  rl.write("Welcome to CodeBreaker!\n");
  rl.write(`You have ${max} attempts to break the secret code.\n`);
  validDigits(codeSize, lowerBound, upperBound);
  rl.write("\n");
  rl.write("I'll respond with a hint where\n");
  rl.write("- every 'o' means a digit you guessed correctly\n");
  rl.write("- every 'x' means a digit you guessed in the wrong position\n");
  rl.write("- every '-' means a digit you got wrong\n\n");
}

export async function askForGuess() {
  rl.prompt();
  let input = await new Promise<string>(resolve => rl.once("line", resolve));
  return input
    .trim()
    .split("")
    .map(x => parseInt(x, 10));
}

export function showHint(hint: string) {
  rl.write(hint + "\n");
}

export function invalidGuess(codeSize: n, lowerBound: n, upperBound: n) {
  rl.write("This code is invalid. Try again.\n");
  validDigits(codeSize, lowerBound, upperBound);
}

export function youLose(code: number[]) {
  rl.write(`\n YOU LOSE: The code was ${code.join("")}\n`);
}

export function youWin() {
  rl.write("\n YOU WIN!!\n");
}
