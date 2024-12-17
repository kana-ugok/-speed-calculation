animationStart = true;

document.getElementById("result").textContent =
  "計算完了: 人Aの速さ = " +
  velocityA +
  " km/h, 人Bの速さ = " +
  velocityB +
  " km/h, 距離 = " +
  distance +
  " km";

function setup() {
  createCanvas(800, 400);
  posA = 50; // 人Aの初期位置
  posB = 750; // 人Bの初期位置
}

function draw() {
  background(220);

  if (animationStart) {
    // 人Aと人Bの動きを描画
    fill(255, 0, 0);
    ellipse(posA, 200, 50, 50); // 人A
    fill(0, 0, 255);
    ellipse(posB, 200, 50, 50); // 人B

    // 速さに応じて位置を更新
    posA += velocityA / 60;
    posB -= velocityB / 60;

    // 位置が交差したらアニメーションを止める
    if (posA >= posB) {
      noLoop();
      document.getElementById("result").textContent += " 出会いました！";
    }
  }
}
