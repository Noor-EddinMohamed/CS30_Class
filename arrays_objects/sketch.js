// Line Circle Illusion
// Noor-Eddin Mohamed
// October 26 2025
// https://www.youtube.com/shorts/iKsOTNWyum8
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let color = "red";
let x1;
let y1;
let x2;
let y2;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  x1 = 0;
  y1 = height / 2;
  x2 = width;
  y2 = height / 2;
}

function draw() {
  background("black");
  drawLine();
}

function drawLine() {
  strokeWeight(10);
  stroke(color);
  line(x1, y1, x2, y2);
}
