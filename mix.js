// mix.js：交错合并，每放 every 个左路项插一个右路项，单次扫描不回扫
export function interleave(left, right, every) {
  const mixed = [];
  let rightIndex = 0;
  let sinceRight = 0;
  for (let leftIndex = 0; leftIndex < left.length; leftIndex += 1) {
    mixed.push({ side: "left", value: left[leftIndex] });
    sinceRight += 1;
    if (sinceRight >= every && rightIndex < right.length) {
      mixed.push({ side: "right", value: right[rightIndex] });
      rightIndex += 1;
      sinceRight = 0;
    }
  }
  for (; rightIndex < right.length; rightIndex += 1) {
    mixed.push({ side: "right", value: right[rightIndex] });
  }
  return mixed;
}
