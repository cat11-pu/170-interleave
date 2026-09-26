// app.js：渲染结果
import { interleave } from "./mix.js";
import { readEvery } from "./step.js";

export function render(spec) {
  const left = spec.left || [];
  const right = spec.right || [];
  const every = readEvery(spec.every);
  const mixed = interleave(left, right, every);
  return { mixed: mixed, count: mixed.length,
           right_taken: mixed.filter((item) => item.side === "right").length,
           left_count: left.length, right_count: right.length, every: every };
}
