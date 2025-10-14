// Perlin Noise Demo
// 14 Oct 2025

let x;
let y;
let time = 0;
const TIME_BUFFER = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");

  // move ball
  x = noise(time) * width;
  y = noise(time + TIME_BUFFER) * width;

  // move on time axis;
  time += 0.01;

  // display ball
  fill("white");
  circle(x, y, 50);
}
