// mix.js：交错（基线：不一交错，只返回左路）
export function interleave(left, right, every) {
  return left.map((value) => ({ side: "left", value: value }));
}
