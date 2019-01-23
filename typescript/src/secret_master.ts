export type Master = {
  nextCode(): number[];
  validate(code: number[]): boolean;
};

type config = { size: number; elements: number[] };

export function build({ size, elements }: config): Master {
  return {
    nextCode: () => shuffle(elements).slice(0, size),
    validate: (code: number[]) =>
      code.length === size && contains(elements, code)
  };
}

function shuffle(arr: number[]) {
  arr = arr.map(x => x);
  let currentIndex = arr.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex = currentIndex - 1;

    let tmp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = tmp;
  }
  return arr;
}

function contains(set: number[], sub: number[]) {
  for (let element of sub) if (set.indexOf(element) === -1) return false;
  return true;
}
