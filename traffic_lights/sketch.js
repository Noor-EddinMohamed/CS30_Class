// Traffic Light
// Noor-Eddin Mohamed
// October 1 2025

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let color = "red";
let waitTimeGreen = 4000;
let waitTimeRed = 4000;
let waitTimeYellow = 1000;
let lastSwitched = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  changeColor();
  colorTimer();
}

function colorTimer() {
  if (color === "green" && millis() > lastSwitched + waitTimeGreen) {
    color === "yellow";
    lastSwitched = millis();
  }
  else if (color === "yellow" && millis() > lastSwitched + waitTimeRed) {
    color === "red";
    lastSwitched = millis();
  }
  else if (millis() > lastSwitched + waitTimeYellow) {
    color === "green";
    lastSwitched = millis();
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function changeColor() {
  if (color === "green") {
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  else if (color === "yellow") {
    fill("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
  }
  else {
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}