import * as SecretMaster from "./secret_master";

let master: SecretMaster.Master;
let CODE_SIZE = 4;
let CODE_ELEMENTS = [1, 2, 3, 4, 5, 6];

beforeEach(() => {
  master = SecretMaster.build({
    size: CODE_SIZE,
    elements: CODE_ELEMENTS
  });
});

test("give a secret with correct size", () => {
  let code = master.nextCode();
  expect(code).toHaveLength(CODE_SIZE);
});

test("the original code is a mix of the elements", () => {
  let code = master.nextCode();
  expect(contains(CODE_ELEMENTS, code)).toBe(true);
});

test("validates elements based on content", () => {
  let valid = master.validate([1, 2, 3, 4]);
  expect(valid).toBe(true);

  let invalid = master.validate([0, 1, 2, 3]);
  expect(invalid).toBe(false);
});

test("validates elements based on size", () => {
  let valid = master.validate([1, 2, 3, 4]);
  expect(valid).toBe(true);

  let invalid = master.validate([1]);
  expect(invalid).toBe(false);

  invalid = master.validate([1, 2, 3, 4, 5, 6]);
  expect(invalid).toBe(false);
});

function contains(set: number[], sub: number[]) {
  for (let element of sub) if (set.indexOf(element) === -1) return false;
  return true;
}
