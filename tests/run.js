import assert from "node:assert";
import { interleave } from "../mix.js";
import { readEvery } from "../step.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("interleave returns a list", () => {
  assert.ok(Array.isArray(interleave([1], [2], 1)));
});

check("interleave items have side", () => {
  assert.strictEqual(typeof interleave([1], [], 1)[0].side, "string");
});

check("readEvery returns a number", () => {
  assert.strictEqual(typeof readEvery(2), "number");
});

check("render counts mixed", () => {
  assert.strictEqual(typeof render({ left: [1], right: [2], every: 1 }).count, "number");
});

check("render exposes taken count", () => {
  assert.strictEqual(typeof render({ left: [1], right: [2], every: 1 }).right_taken, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
