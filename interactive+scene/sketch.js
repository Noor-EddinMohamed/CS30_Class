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
let collision;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawingLayer = createGraphics(windowWidth, windowHeight);
  drawingLayer.background("black");
  x = width / 2;
  y = radius;
}

function draw() {
  background("black")
  image(drawingLayer, 0, 0);
  keyDetect();
  moveCircle();
  bounceCircle();
  collideCircle();
  drawCircle();
  linePreview();
}

function drawCircle() {
  noStroke();
  fill("white");
  circle(x, y, radius * 2);
}

function keyDetect() {
  if (keyIsDown(68) && dx < 25 && !collision) { // d key
    dx += 0.5;
  }
  if (keyIsDown(65) && dx > -25 && !collision) { // a key
    dx -= 0.5;
  }
  if (keyIsDown(87) && y >= height - radius && !collision) { // w key
    dy = dy - 10;
  }
  if (keyIsDown(83) && y < height - radius && !collision) { // s key
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
    if (!collision) {
      dy += 1
    }
    else {
      dy = 0
    }
x  } 
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
  drawingLayer.background("black")
  startX = mouseX;
  startY = mouseY;
  drawLine = true;
}

function linePreview() {
  if (drawLine) {
    strokeWeight(5);
    stroke("white");
    line(startX, startY, mouseX, mouseY);
  }
}

function mouseReleased() {
  if (drawLine) {
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
  if (collision) {
    let vectorVelocity = createVector(dx, dy);

    // line direction
    let wallVector = createVector(endX - startX, endY - startY);

    // get normal (perpendicular to the line)
    let normal = createVector(-wallVector.y, wallVector.x);
    normal.normalize();

    // reflect velocity across the line
    vectorVelocity.reflect(normal);

    // update dx, dy
    dx = vectorVelocity.x * 0.9; // dampen a bit
    dy = vectorVelocity.y * 0.9;

    // 🔧 push the ball slightly out of the wall
    // move the circle along the normal by 1 pixel
    x += normal.x;
    y += normal.y;
  } 
}