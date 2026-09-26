// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let every = spec.every || 2;
  parts.log.textContent = "左路 " + (spec.left || []).length + " 个，右路 " + (spec.right || []).length + " 个。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { every: every }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.mixed.forEach(function (item, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spot + 1) + ".";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (item.side === "right" ? " ok" : "");
      mark.textContent = item.side === "right" ? "右 " + item.value : "左 " + item.value;
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "混排 " + view.count + " 项，右路插入 " + view.right_taken + " 项";
    parts.log.textContent = "每 " + every + " 个左路插一个右路";
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "交错合并";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "间隔加一";
  moreButton.addEventListener("click", function () {
    every = every + 1;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "间隔减一";
  lessButton.addEventListener("click", function () {
    every = Math.max(1, every - 1);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "间隔";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(every);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 1) { every = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看混排条数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { every: every }));
    parts.out.textContent = "混排 " + view.count + " 项，右路用掉 " + view.right_taken + " 项";
  });
  parts.controls.appendChild(readButton);

  draw();
}
