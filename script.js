document.getElementById("calculation").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearFields);

function calculate() {
  const distance = parseFloat(document.getElementById("distance").value);
  const d_unit = document.getElementById("d_unit").value;
  const velocity = parseFloat(document.getElementById("velocity").value);
  const v_unit = document.getElementById("v_unit").value;
  const time = parseFloat(document.getElementById("time").value);
  const t_unit = document.getElementById("t_unit").value;
  let result = "";

  let d_arrange = distance;
  if (d_unit === "メートル") {
    d_arrange = distance / 1000;
  } else if (d_unit === "ミリメートル") {
    d_arrange = distance / 1000000;
  }

  let v_arrange = velocity;
  if (v_unit === "m/min") {
    v_arrange = velocity * 0.06;
  } else if (v_unit === "m/s") {
    v_arrange = velocity * 3.6;
  }

  let t_arrange = time;
  if (t_unit === "分") {
    t_arrange = time / 60;
  } else if (t_unit === "秒") {
    t_arrange = time / 3600;
  }

  if (distance && velocity && !time) {
    result = `${d_arrange}km÷${v_arrange}km/hなので、時間は ${(
      d_arrange / v_arrange
    ).toFixed(1)} 時間です。`;
  } else if (distance && !velocity && time) {
    result = `${d_arrange}km÷${t_arrange}時間なので、速さは ${(
      d_arrange / t_arrange
    ).toFixed(1)} km/hです。`;
  } else if (!distance && velocity && time) {
    result = `${v_arrange}km/h×${t_arrange}時間なので、道のりは ${(
      v_arrange * t_arrange
    ).toFixed(1)} kmです。`;
  } else {
    result = "道のり、速さ、時間のいずれか2つを入力してください。";
  }

  document.getElementById("result").textContent = result;
}

function clearFields() {
  // 入力フィールドをクリア
  document.getElementById("distance").value = "";
  document.getElementById("velocity").value = "";
  document.getElementById("time").value = "";
  document.getElementById("result").textContent = "";
}
