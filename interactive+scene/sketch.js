let x;
let y;
let startX;
let startY;
let endX;
let endY;
let drawLine = false;
let dx = 0;
let dy = 10;
let radius = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawingLayer = createGraphics(windowWidth, windowHeight);
  drawingLayer.background("black");
  x = width / 2;
  y = radius;
}

function draw() {
  image(drawingLayer, 0, 0);
  keyDetect();
  moveCircle();
  bounceCircle();
  collideCircle();
  drawCircle();
}

function drawCircle() {
  noStroke();
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
    dy -= -0.5;
  }
}

function moveCircle() {
  x += dx;
  y += dy;

  if (dx > 0) {
    dx -= 0.1;
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
    y = height - radius;
    dy *= -0.9;
  }
  else {
    y = radius; 
    dy *= -0.9;
  }
  if (x < radius || x > width - radius) {
    dx *= -1;
  }
}
  
function mousePressed() {
  startX = mouseX;
  startY = mouseY;
  drawLine = true;
}

function mouseReleased() {
  if (drawLine) {
    drawingLayer.background(0);    
    drawingLayer.strokeWeight(5);
    drawingLayer.stroke("white");
    endX = mouseX;
    endY = mouseY;
    drawingLayer.line(startX, startY, endX, endY);
    drawLine = false;
  }
}

function collideCircle() {
  collision = collideLineCircle(startX, startY, endX, endY, x, y, radius * 2); 
}
