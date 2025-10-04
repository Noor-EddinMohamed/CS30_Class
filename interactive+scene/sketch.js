// Noor-Eddin Mohamed
// Interactive Scene
// October 3 2025
// Extra for Experts: I used createGraphics to draw my lines on an offscreen canvas, which is then drawn to the actual canvas as an image. I used this so that my ball would redraw evey frame, but my lines wouldn't.
// State variable: I used drawLine to toggle between the states of "is the mouse down => drawing mode"

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
    dy -= 10;
  }
  if (keyIsDown(83) && y < height - radius && !collision) { // s key
    dy -= -0.5;
  }
}

function moveCircle() {
  x += dx;
  y += dy;

  // friction
  if (dx > 0) { 
    dx -= 0.1;
  }
  if (dx < 0) {
    dx += 0.1;
  }
}

function bounceCircle() {
  if (y < height - radius && y > radius) { // gravity
    dy += 1;
  } 
  else if (collision) {
    dy *= -0.9
  }
  else if (y >= height - radius) { // bouncing off floor
    y = height - radius;
    dy *= -0.9;
  }
  else { // bouncing off ceiling
    y = radius; 
    dy *= -0.9;
  }

  if (x < radius || x > width - radius) { // bouncing off sides
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
  if (drawLine) { // creates a temporary drawing of your line as a preview
    strokeWeight(5);
    stroke("white");
    line(startX, startY, mouseX, mouseY); // line is straight
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

function closestPointOnSegment(px, py, x1, y1, x2, y2) {
  let segX = x2 - x1;
  let segY = y2 - y1;

  if (segX === 0 && segY === 0) { // case where segment is point
    return createVector(x1, y1); 
  } 

  let t = ((px - x1) * segX + (py - y1) * segY) / (segX*segX + segY*segY); // This is basically a vector dot-product, which I'm not too familiar with so lots of this physics bit came from stack overflow's like this: https://stackoverflow.com/questions/64330618/finding-the-projection-of-a-point-onto-a-line?
  t = constrain(t, 0, 1); // clamp to segment (prevents projection from existing outside of line segment)
  return createVector(x1 + t * segX, y1 + t * segY);
}

function collideCircle() {
  collision = collideLineCircle(startX, startY, endX, endY, x, y, radius * 2); 
  if (collision) {
    let vectorVelocity = createVector(dx, dy);

    // closest point on the line segment
    let closest = closestPointOnSegment(x, y, startX, startY, endX, endY);

    // normal vector from closest point to circle center
    let normal = createVector(x - closest.x, y - closest.y).normalize();

    // reflect velocity along the normal
    vectorVelocity.reflect(normal);
    dx = vectorVelocity.x * 0.9; 
    dy = vectorVelocity.y * 0.9;

    x += normal.x;
    y += normal.y;
  }
}
