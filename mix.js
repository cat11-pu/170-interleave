// mix.js：交错（每放 every 个左路项插一个右路项，单次扫描两路）
export function interleave(left, right, every) {
  const mixed = [];
  let rightIndex = 0;
  for (let leftIndex = 0; leftIndex < left.length; leftIndex++) {
    mixed.push({ side: "left", value: left[leftIndex] });
    if ((leftIndex + 1) % every === 0 && rightIndex < right.length) {
      mixed.push({ side: "right", value: right[rightIndex] });
      rightIndex++;
    }
  }
  while (rightIndex < right.length) {
    mixed.push({ side: "right", value: right[rightIndex] });
    rightIndex++;
  }
  return mixed;
}
