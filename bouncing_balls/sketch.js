let theBallArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  // randomizeColor();
  spawnBall(width / 2, height / 2);
}

function draw() {
  background("white"); 
  moveCircle();
  bounceIfNeeded();
  showCircle();
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}

function spawnBall(_x, _y) {
  let newBall = {
    x: _x,
    y: _y,
    dx: random(-10, 10),
    dy: random(-10, 10),
    radius: random(25, 75),
    r: random(255),
    g: random(255),
    b: random(255),
  };
  theBallArray.push(newBall);
}

function moveCircle() {
  for (let ball of theBallArray) {
    ball.x += ball.dx;
    ball.y += ball.dy;
  }
}

function bounceIfNeeded() {
  for (let ball of theBallArray) {
    if (ball.x < ball.radius || ball.x > width - ball.radius) {
      ball.dx *= -1;
      randomizeColor(ball);
  
    }
    if (ball.y < ball.radius || ball.y > height - ball.radius) {
      ball.dy *= -1;
      randomizeColor(ball);
    }

  }
}

function randomizeColor(theBall) {
  theBall.r = random(255);
  theBall.g = random(255);
  theBall.b = random(255);
}
  
function showCircle() {
  for (let ball of theBallArray) {
    fill(ball.r, ball.g, ball.b);
    circle(ball.x, ball.y, ball.radius * 2);
  }
}