// step.js：校验间隔，小于一报 E_BAD_EVERY
export function readEvery(every) {
  if (every < 1) {
    const error = new Error("E_BAD_EVERY: every must be >= 1");
    error.code = "E_BAD_EVERY";
    throw error;
  }
  return every;
}
