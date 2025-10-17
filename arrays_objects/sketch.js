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
let x;
let y;
const DIAMETER = 50;
let amplitude = 0.5;
let ang_freq = 1;
let time;
let phase = Math.PI;

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
  x = x1 + DIAMETER;
  y = y1;
}

function draw() {
  background("black");
  drawLine();
  moveCircle();
  drawCircle();
  time = millis() / 1000;
}

function drawLine() {
  strokeWeight(10);
  stroke(color);
  fill(color);
  line(x1 + DIAMETER, y1, x2 - DIAMETER, y2);
  circle(x1 + DIAMETER, y1, DIAMETER);
  circle(x2 - DIAMETER, y2, DIAMETER);
}

function drawCircle() {
  fill(color);
  circle(x, y, DIAMETER);
}

function moveCircle() {
  x = (amplitude * Math.cos(ang_freq * time + phase) + 0.5) * (x2 - DIAMETER / 2 - (x1 + DIAMETER / 2));
  console.log(x);
}
