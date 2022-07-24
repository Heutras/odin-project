const buttons = document.querySelectorAll("button");
const sketch = document.querySelector("#sketch");
let pixelSize = 30;

function drawGrid(size) {
  let sketchWidth = sketch.clientWidth;
  let sketchHeight = sketch.clientHeight;
  let gridArea = size * size;
  let pixelWidth = sketchWidth / size;
  let pixelHeight = sketchHeight / size;
  for (let i = 0; i < gridArea; i++) {
    let pixel = document.createElement("div");
    pixel.clientWidth = pixelWidth;
    pixel.clientHeight = pixelHeight;
    pixel.style.backgroundColor = "#fff";
    pixel.classList.add("pixel");
    sketch.append(pixel);
  }
  sketch.style.gridTemplateColumns = `repeat(${size}, auto)`;
  sketch.style.gridTemplateRows = `repeat(${size}, auto)`;
  randomColor();
}

for (let btn of buttons) {
  btn.addEventListener("click", function (e) {
    let target = e.target.textContent;

    if (target === "Resize") {
      return resize(target);
    } else if (target === "Clear") {
      return clear();
    } else if (target === "Black") {
      return blackColor();
    } else if (target === "Colors") {
      return randomColor();
    }
  });
}
function resize(ps) {
  ps = +prompt("from 1 to 65", 30);
  if (!ps || ps > 65 || ps < 1 || typeof ps != "number") {
    ps = pixelSize;
  }
  pixelSize = ps;
  sketch.innerHTML = "";
  drawGrid(pixelSize);
}
function clear() {
  sketch.innerHTML = "";
  drawGrid(pixelSize);
}
function blackColor() {
  let pixels = sketch.querySelectorAll(".pixel");
  for (let px of pixels) {
    px.addEventListener("mouseover", function () {
      this.style.backgroundColor = "#000";
    });
  }
}
function randomColor() {
  let pixels = sketch.querySelectorAll(".pixel");
  for (let px of pixels) {
    px.addEventListener("mouseover", function () {
      this.style.backgroundColor =
        "rgb(" +
        randomInteger(0, 255) +
        "," +
        randomInteger(0, 255) +
        "," +
        randomInteger(0, 255) +
        ")";
    });
  }
}
function randomInteger(min, max) {
  //rand is from  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
drawGrid(pixelSize);