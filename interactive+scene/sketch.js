// Interactive Scene
// Noor-Eddin Mohamed
// October 3 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x;
let y;
let dx = 0;
let dy = 10;
let radius = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  x = width / 2;
  y = radius;
}

function draw() {
  background("black");
  drawCircle();
  keyDetect();
  moveCircle();
  bounceCircle();
}

function drawCircle() {
  fill("white");
  circle(x, y, radius * 2);
}

function keyDetect() {
  if (keyIsDown(68) && dx < 25) { // d key
    dx += 0.5;
  }
  if (keyIsDown(65) && dx > -25) { // a key
    dx -= 0.5;
  }
  if (keyIsDown(87) && y >= height - radius) { // w key
    dy = dy - 10;
  }
  if (keyIsDown(83) && y < height - radius) { // s key
    dy -= -0.5
  }
}

function moveCircle() {
  x += dx;
  y += dy;

  if (dx > 0) {
    dx -= 0.1;
      if (dx < 0.01) {
        dx = 0;
      }
  }
  if (dx < 0) {
    dx += 0.1;
  }
}

function bounceCircle() {
  if (y < height - radius && y > radius) {
    dy += 1;
  } 
  else if (y >= height - radius) {
    y = height - radius
    dy *= -0.9;
  } 
  if (x < radius || x > width - radius) {
    dx *= -1
  }
}




