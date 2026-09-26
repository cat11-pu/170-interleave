import fs from "node:fs";
import { interleave } from "./mix.js";
import { readEvery } from "./step.js";
import { render } from "./app.js";

// 验收断言：上面每条值收进 emit，最后与期望值逐项比对，不符就非零退出。
const __lines = [];
function emit(label, value) { __lines.push([String(label).replace(/ =$/, ""), value]); }


const spec = JSON.parse(fs.readFileSync(process.argv[2] || "sample/lists.json", "utf8"));
const view = render(spec);

emit("交错后的顺序 =", JSON.stringify(view.mixed.map((item) => item.side + ":" + item.value)));
emit("混排条数 =", view.count);
emit("右路用掉 =", view.right_taken);
emit("左路条数 =", view.left_count);
emit("右路条数 =", view.right_count);
emit("间隔 =", view.every);
emit("间隔写错的错误码 =", spec.every_error_code);


// ---- 异常路径探针：真调用实现，看它报出什么码（不是从样例里抄）----
try {
  readEvery(0);
  emit("间隔写错的错误码", "没有报错");
} catch (error) {
  emit("间隔写错的错误码", error && error.code ? error.code : String(error.message));
}


// ---- 期望值（参考模型算出，与题面给的验收数值一致）----
const EXPECTED = {
  "交错后的顺序": [
    "left:1",
    "left:2",
    "right:a",
    "left:3",
    "left:4",
    "right:b",
    "left:5"
  ],
  "混排条数": 7,
  "右路用掉": 2,
  "左路条数": 5,
  "右路条数": 2,
  "间隔": 2,
  "间隔写错的错误码": "E_BAD_EVERY"
};
// 有的值在收进来之前已经 stringify 过，比较前先试着解析回来，避免类型错配把正确实现判成不过。
function __same(got, want) {
  if (typeof got === "string") {
    try { const parsed = JSON.parse(got); if (JSON.stringify(parsed) === JSON.stringify(want)) return true; } catch (error) { /* 不是 JSON 就按原文比 */ }
  }
  return JSON.stringify(got) === JSON.stringify(want);
}
let __bad = 0;
for (const [label, want] of Object.entries(EXPECTED)) {
  const found = __lines.find((pair) => pair[0] === label);
  if (!found) { __bad += 1; console.log("缺失验收项 " + label); continue; }
  const got = found[1];
  if (__same(got, want)) { console.log("一致 " + label + " = " + JSON.stringify(got)); }
  else { __bad += 1; console.log("不一致 " + label + " 期望 " + JSON.stringify(want) + " 实际 " + JSON.stringify(got)); }
}
console.log("验收项 " + (Object.keys(EXPECTED).length - __bad) + "/" + Object.keys(EXPECTED).length + " 通过");
process.exit(__bad === 0 ? 0 : 1);
