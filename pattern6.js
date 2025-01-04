"use strict";

let velocityA = 0;
let velocityB = 0;
let time = 0;
let animationStart = false;
let t_result = "";
let v_result = "";
let d_unit = "";
let posA = 0; // Aさんの現在位置
let posB = 0.01; // Bさんの現在位置
let ratioA = 0; // Aさんの移動比率
let ratioB = 0; // Bさんの移動比率

document.getElementById("calculation").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearFields);

function calculate() {
  time = parseFloat(document.getElementById("time").value);
  velocityA = parseFloat(document.getElementById("velocityA").value);
  velocityB = parseFloat(document.getElementById("velocityB").value);
  d_unit = document.getElementById("d_unit").value;
  const t_unit = document.getElementById("t_unit").value;
  const vA_unit = document.getElementById("vA_unit").value;
  const vB_unit = document.getElementById("vB_unit").value;
  const t_output = document.getElementById("t_output");
  const vA_output = document.getElementById("vA_output");
  const vB_output = document.getElementById("vB_output");
  const t_unit_output = document.getElementById("t_unit_output");
  const vA_unit_output = document.getElementById("vA_unit_output");
  const vB_unit_output = document.getElementById("vB_unit_output");

  //アウトプットに値の読み取り
  if (time) {
    t_output.value = time;
  }
  if (velocityA) {
    vA_output.value = velocityA;
  }
  if (velocityB) {
    vB_output.value = velocityB;
  }

  //アウトプットに単位の読み取り
  t_unit_output.textContent = t_unit;
  vA_unit_output.textContent = vA_unit;
  vB_unit_output.textContent = vB_unit;

  // 単位を揃える

  if (d_unit === "km") {
    if (t_unit === "分") {
      time /= 60;
    } else if (t_unit === "秒") {
      time /= 3600;
    }
    if (vA_unit === "m/min") {
      velocityA *= 0.06;
    } else if (vA_unit === "m/s") {
      velocityA *= 3.6;
    }
    if (vB_unit === "m/min") {
      velocityB *= 0.06;
    } else if (vB_unit === "m/s") {
      velocityB *= 3.6;
    }
  } else if (d_unit === "m") {
    if (t_unit === "時間") {
      time *= 60;
    } else if (t_unit === "秒") {
      time /= 60;
    }
    if (vA_unit === "km/h") {
      velocityA = (velocityA * 1000) / 60;
    } else if (vA_unit === "m/s") {
      velocityA *= 60;
    }
    if (vB_unit === "km/h") {
      velocityB = (velocityB * 1000) / 60;
    } else if (vB_unit === "m/s") {
      velocityB *= 60;
    }
  } else if (d_unit === "mm") {
    if (t_unit === "時間") {
      time *= 3600;
    } else if (t_unit === "分") {
      time *= 60;
    }
    if (vA_unit === "km/h") {
      velocityA = (velocityA * 1000) / 3600;
    } else if (vA_unit === "m/min") {
      velocityA /= 60;
    }
    if (vB_unit === "km/h") {
      velocityB = (velocityB * 1000) / 3600;
    } else if (vB_unit === "m/min") {
      velocityB /= 60;
    }
  }

  if (isNaN(time) || isNaN(velocityA) || isNaN(velocityB)) {
    document.getElementById("result").textContent =
      "時間、速さA、速さBを入力してください。";
    animationStart = false;
    noLoop(); // アニメーションを停止
    return;
  }
  if (velocityA <= velocityB) {
    document.getElementById("result").textContent =
      "速さAは速さBよりも大きい値を入力してください。";
    animationStart = false;
    noLoop(); // アニメーションを停止
    return;
  }

  //resultの単位合わせ

  if (d_unit === "km") {
    t_result = "時間";
    v_result = "km/h";
  } else if (d_unit === "m") {
    t_result = "分";
    v_result = "m/min";
  } else if (d_unit === "mm") {
    t_result = "秒";
    v_result = "m/s";
  }
  //結果表示
  document.getElementById(
    "result"
  ).textContent = `(${velocityA}${v_result}-${velocityB}${v_result})×${time}${t_result} = ${(
    (velocityA - velocityB) *
    time
  ).toFixed(2)} ${d_unit}`;

  const totalVelocity = velocityA + velocityB;
  ratioA = velocityA / totalVelocity;
  ratioB = velocityB / totalVelocity;
  // アニメーションの開始
  animationStart = true;
  posA = 0; // 円の一番上
  posB = 0.01; // 円の一番上（逆方向から開始）
  loop(); // p5.jsのアニメーションを再スタート
}

function clearFields() {
  // 入力をクリア
  document.getElementById("time").value = "";
  document.getElementById("velocityA").value = "";
  document.getElementById("velocityB").value = "";
  document.getElementById("result").textContent = "";
  // アウトプットをクリア
  document.getElementById("t_output").value = "";
  document.getElementById("vA_output").value = "";
  document.getElementById("vB_output").value = "";
  document.getElementById("t_unit_output").textContent = "";
  document.getElementById("vA_unit_output").textContent = "";
  document.getElementById("vB_unit_output").textContent = "";

  // アニメーションリセット
  animationStart = false;
  posA = 0;
  posB = 0;
  noLoop();
  redraw();
}

//ここからp5.jsの設定
function setup() {
  createCanvas(800, 600);
  background(250);
  posA = 0; // 初期位置リセット
  posB = 0.01; // 初期位置リセット（反対側）
}

function draw() {
  background(250);

  noFill();
  strokeWeight(8);
  stroke(150, 150, 150);
  ellipse(400, 300, 350, 350);
  noStroke();
  translate(400, 300);

  if (animationStart) {
    push();
    rotate(posA);
    fill(150, 185, 200);
    ellipse(0, -255, 40, 40); //人A
    rect(0 - 20, -230, 40, 50); //人A
    pop();
    push();
    rotate(posB);
    fill(155, 190, 145);
    ellipse(0, -255, 40, 40); //人B
    rect(0 - 20, -230, 40, 50); //人B
    pop();
    posA += (ratioA * TWO_PI) / 60; // Aさん
    posB += (ratioB * TWO_PI) / 60; // Bさん

    // 位置が交差したらアニメーションを止める
    const angleDifference = abs((posA - posB + TWO_PI) % TWO_PI); // 角度差を計算
    if (angleDifference < 0.05) {
      animationStart = false; // アニメーション終了
      noLoop(); // アニメーションを停止
      document.getElementById("result").textContent += " でした！";
    }
  }
}
