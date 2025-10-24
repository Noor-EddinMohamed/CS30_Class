// Line Circle Illusion
// Noor-Eddin Mohamed
// October 26 2025
// https://www.youtube.com/shorts/iKsOTNWyum8
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theLineArray = [];
const DIAMETER = 50;
const ANG_FREQ = Math.PI;
let amplitudeX;
let time;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }

  amplitudeX = (width - 2 * DIAMETER) / 2;
  
  createLine("red", 0, height / 2, width, height / 2 + 100);
}

function createLine(_color, _x1, _y1, _x2, _y2) {
  let theLine = {
    color: _color,
    x1: _x1,
    y1: _y1,
    x2: _x2,
    y2: _y2,
    x: _x1 + DIAMETER,
    y: _y1,
    amplitudeY: (_y2 - _y1) / 2,
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
    circle(aCircle.x, aCircle.y, DIAMETER);
  }
}

function moveCircle() {
  for (let aCircle of theLineArray) {
    aCircle.x = -amplitudeX * Math.cos(ANG_FREQ * time) + amplitudeX + DIAMETER;
    aCircle.y = -aCircle.amplitudeY * Math.cos(ANG_FREQ * time) + height / 2 + DIAMETER;
  }

}