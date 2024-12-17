"use strict";

let velocityA = 0;
let velocityB = 0;
let time = 0;
let animationStart = false;
let posA = 0;
let posB = 0;
let t_result = "";
let v_result = "";
let d_unit = "";

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

  // アニメーションの開始
  animationStart = true;

  posA = 100; // Aの初期位置
  posB = 700; // Bの初期位置
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
  posA = 50;
  posB = 750;
  noLoop();
  redraw();
}

//ここからp5.jsの設定
function setup() {
  createCanvas(800, 400);
  background;
  posA = 100; // Aの初期位置
  posB = 700; // Bの初期位置
}

function draw() {
  background(250);

  strokeWeight(8);
  stroke(150, 150, 150);
  line(50, 300, 750, 300);

  if (animationStart) {
    let Aspeed = velocityA;
    let Bspeed = velocityB;
    if (Aspeed < 2) {
      Aspeed = velocityA * 20;
    }
    if (Bspeed < 2) {
      Bspeed = velocityB * 20;
    }

    noStroke();
    fill(150, 185, 200); // 人B
    ellipse(posA, 200, 50, 50);
    rect(posA - 25, 230, 50, 65);

    fill(155, 190, 145); // 人A
    ellipse(posB, 200, 50, 50);
    rect(posB - 25, 230, 50, 65);

    fill(0);
    textSize(20);
    text(velocityA + "" + v_result, posA - 30, 160);
    text(velocityB + "" + v_result, posB - 30, 160);

    textSize(48);
    text("A", posA - 16.5, 217.5);
    text("B", posB - 16.5, 217.5);
    // 速さに応じて位置を更新
    posA += Aspeed / 10;
    posB -= Bspeed / 10;

    // 位置が交差したらアニメーションを止める
    if (posA - 1 >= posB) {
      fill(250);
      rect(0, 0, 800, 295);
      noStroke();
      fill(250, 130, 115);
      ellipse(posA - 1, 200, 52, 52);
      rect(posA - 27, 230, 52, 67);
      noFill();
      stroke(0);
      strokeWeight(2);
      ellipse(posA - 40, 150, 30, 30);
      line(posA - 40, 140, posA - 40, 150);
      line(posA - 40, 150, posA - 32, 150);
      fill(0);
      noStroke();
      textSize(20);
      text(
        (velocityA + velocityB) * time.toFixed(2) + "" + d_unit,
        posA - 20,
        160
      );
      noLoop();
      document.getElementById("result").textContent += " でした！";
    }
  }
}
