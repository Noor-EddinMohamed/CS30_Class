// Line Circle Illusion
// Noor-Eddin Mohamed
// October 26 2025
// https://www.youtube.com/shorts/iKsOTNWyum8
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theLineArray = [];
// let color = "red";
// let x1;
// let y1;
// let x2;
// let y2;
let x;
let y;
const DIAMETER = 50;
let amplitude;
const ANG_FREQ = 1;
let time;
const PHASE = Math.PI;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }

  // x1 = 0;
  // y1 = height / 2;
  // x2 = width;
  // y2 = height / 2;
  // x = x1 + DIAMETER;
  // y = y1;
  amplitude = (width - 2 * DIAMETER) / 2;
  
  createLine("red", 0, height / 2, width, height / 2);
  x = DIAMETER;
  y = height / 2;
}

function createLine(_color, _x1, _y1, _x2, _y2) {
  let theLine = {
    color: _color,
    x1: _x1,
    y1: _y1,
    x2: _x2,
    y2: _y2,
  };
  theLineArray.push(theLine);
}

function draw() {
  background("black");
  drawLine();
  moveCircle();
  drawCircle();
  time = millis() / 1000;
}

function drawLine() {
  for (let aLine of theLineArray) {
    strokeWeight(10);
    stroke(aLine.color);
    fill(aLine.color);
    line(aLine.x1 + DIAMETER, aLine.y1, aLine.x2 - DIAMETER, aLine.y2);
    circle(aLine.x1 + DIAMETER, aLine.y1, DIAMETER);
    circle(aLine.x2 - DIAMETER, aLine.y2, DIAMETER);
  }
}

function drawCircle() {
  for (let aCircle of theLineArray) {
    fill(aCircle.color);
    circle(x, y, DIAMETER);
  }
}

function moveCircle() {
  x = -amplitude * Math.cos(ANG_FREQ * time) + amplitude + DIAMETER;
}
