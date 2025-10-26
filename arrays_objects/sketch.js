// Mathy Animation
// Noor-Eddin Mohamed
// Arrays and Objects
// October 26 2025
// Extra for Experts: learned how to model harmonic motion by applying transformations to a sinusoidal wave

let theLineArray = [];
const DIAMETER = 50;
const ANG_FREQ = Math.PI;
let time;
const TOTAL_LINES = 36; 

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  } else {
    createCanvas(windowWidth, windowWidth);
  }

  colorMode(HSB, 360, 100, 100); // use HSB for rainbow colors

  // initial horizontal line across center
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = (width - 2 * DIAMETER) / 2;

  createLine(
    color(0, 100, 100), // start hue at 0
    centerX + radius, centerY,
    centerX - radius, centerY
  );
}

function createLine(_color, _x1, _y1, _x2, _y2) {
  let theLine = {
    color: _color,
    x1: _x1,
    y1: _y1,
    x2: _x2,
    y2: _y2,
    x: _x1,
    y: _y1,
    localTime: 0, // independent timer for each lineCircle combo
  };
  theLineArray.push(theLine);
}

function draw() {
  background("black");
  drawLine();
  moveCircle();
  drawCircle();
  spawnNewLineCircle();
  time = millis() / 1000;
}

function drawLine() {
  // draws each line
  for (let aLine of theLineArray) {
    strokeWeight(10);
    stroke(aLine.color);
    line(aLine.x1, aLine.y1, aLine.x2, aLine.y2);
    noStroke();
    fill(aLine.color);
    circle(aLine.x1, aLine.y1, DIAMETER);
    circle(aLine.x2, aLine.y2, DIAMETER);
  }
}

function drawCircle() {
  // draws the corresponding circle for each line
  for (let aCircle of theLineArray) {
    noStroke();
    fill(aCircle.color);
    circle(aCircle.x, aCircle.y, DIAMETER);
  }
}

function moveCircle() {
  // moves the circle following harmonic motion
  for (let aCircle of theLineArray) {
    aCircle.localTime += deltaTime / 1000;
    let phase = aCircle.localTime * ANG_FREQ;

    // midpoint of line
    let midX = (aCircle.x1 + aCircle.x2) / 2;
    let dx = (aCircle.x2 - aCircle.x1) / 2;
    aCircle.x = midX + dx * Math.cos(phase); // extra for experts: harmonic motion math

    let midY = (aCircle.y1 + aCircle.y2) / 2;
    let dy = (aCircle.y2 - aCircle.y1) / 2;
    aCircle.y = midY + dy * Math.cos(phase); 
  }
}

function spawnNewLineCircle() {
  if (theLineArray.length >= TOTAL_LINES / 2) { // only draws 18 lines or else returns nothing
    return;
  }

  let lastLine = theLineArray[theLineArray.length - 1];
  const period = 2 * Math.PI / ANG_FREQ;

  if (lastLine.localTime > period) {
    lastLine.localTime -= period; // reset timer

    // changes angle of line to make a circlish shape
    let i = theLineArray.length;
    let centerX = width / 2;
    let centerY = height / 2;
    let radius = (width - 2 * DIAMETER) / 2;
    let angleStep = TWO_PI / TOTAL_LINES;
    let angle = i * angleStep;

    let x1 = centerX + radius * cos(angle);
    let y1 = centerY + radius * sin(angle);
    let x2 = centerX - radius * cos(angle); // opposite side
    let y2 = centerY - radius * sin(angle);

    // dif color of the rainbow for each line
    let hue = map(i, 0, TOTAL_LINES, 0, 720);
    createLine(color(hue, 100, 100), x1, y1, x2, y2);
  }
}
