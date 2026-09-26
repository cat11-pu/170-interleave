// step.js：校验间隔（小于一报 E_BAD_EVERY）
export function readEvery(every) {
  if (!(Number(every) >= 1)) {
    const error = new Error("间隔必须不小于 1");
    error.code = "E_BAD_EVERY";
    throw error;
  }
  return Number(every);
}
