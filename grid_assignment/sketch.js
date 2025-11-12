// Stacker Game
// Noor-Eddin Mohamed
// November 12
//
// Extra for Experts:
// learned p5js sound from this video https://www.youtube.com/watch?v=Pn1g1wjxl_0
// sound effect from asmarttv2022 on Pixabay

let cellSize;
let grid;
let rows;
let cols;
let theGameBlocks;
let gameBlocksRow;
let gameBlocksLength = 3;
let direction = "left"; 
let frameCounter = 0;
let renderOnFrame = 10;
let spacePressed = false;
let placeBlockSound;


function preload() {
  placeBlockSound = loadSound("block_place_sound_effect.mp3");
}

function setup() {
  cols = 7;
  rows = 15;
  if (windowWidth / cols < windowHeight / rows) { // cellSize dependent on window size
    cellSize = Math.floor(windowWidth / cols);
  } 
  else {
    cellSize = Math.floor(windowHeight / rows);
  }  
  createCanvas(cols * cellSize, rows * cellSize);
  grid = generateEmptyGrid(cols, rows);
  gameBlocksRow = rows - 1;
  theGameBlocks = createGameBlocks();
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function createGameBlocks() {
  // gameBlocks are an array of 0s (blank) and 1s (block)
  let gameBlocks = [];
  for (let i = 0; i < cols - gameBlocksLength; i++) {
    gameBlocks.push(0);
  }
  for (let i = 0; i < gameBlocksLength; i++) {
    gameBlocks.push(1);
  }
  return gameBlocks;
}

function draw() {
  frameCounter++;
  if (!spacePressed && frameCounter >= renderOnFrame) { // so it doesn't move every single frame
    moveBlocks();
    frameCounter = 0; 
  }
  displayGrid();
}

function moveBlocks() {
  let leftEdge;
  let rightEdge;

  // edge detection
  for (let i = 0; i < theGameBlocks.length; i++) {
    if (theGameBlocks[i] === 1) {
      leftEdge = i;
      break; // ends loop when we find leftEdge
    }
  }
  for (let i = theGameBlocks.length - 1; i >= 0; i--) {
    if (theGameBlocks[i] === 1) {
      rightEdge = i;
      break;
    }
  }

  // bounces off edges 
  if (direction === "right" && rightEdge >= cols - 1) {
    direction = "left";
  }
  if (direction === "left" && leftEdge <= 0) {
    direction = "right";
  }
 
  // how my gameBlocks move is basically it pops the value at the front of the array (0 or 1) and reinserts it at the back and vice versa to make it look like its moving
  if (direction === "right") {
    theGameBlocks.pop();
    theGameBlocks.unshift(0);
  } 
  else {
    theGameBlocks.shift();
    theGameBlocks.push(0);
  }
}

function displayGrid() {
  // draws grid like we learnt in class
  for (let y = 0; y < rows; y++) { 
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) { 
        fill("black");
      }
      else {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }

  fill("red"); // player
  for (let x = 0; x < cols; x++) {
    if (theGameBlocks[x] === 1) {
      square(x * cellSize, gameBlocksRow * cellSize, cellSize);
    }
  }
}

function keyPressed() {
  if (key === " ") {
    spacePressed = true;

    // if overhanging than it dissapears
    if (gameBlocksRow < rows - 1) {
      for (let x = 0; x < cols; x++) {
        if (grid[gameBlocksRow + 1][x] === 0) {
          theGameBlocks[x] = 0;
        }
      }
    }

    // sets length of gameBlocks (number of 1s)
    let count = 0;
    for (let x = 0; x < theGameBlocks.length; x++) {
      if (theGameBlocks[x] === 1) {
        count++;
      }
    }
    gameBlocksLength = count;
    
    // checks if the gameBlocks still exist (1s in array), if not then end game
    let sound = true;
    let num1s = 0;
    for (let block of theGameBlocks) {
      if (block === 1) {
        num1s += 1;
      }
    }
    if (num1s === 0) {
      noLoop();
      sound = false;
    }

    // drawing gameBlocks to grid
    for (let x = 0; x < cols; x++) {
      if (theGameBlocks[x] === 1) {
        grid[gameBlocksRow][x] = 1;
        if (sound) {
          placeBlockSound.play();
        }
      }
    }

    gameBlocksRow--;
    theGameBlocks = createGameBlocks(); // new blocks
    renderOnFrame -= 0.5; // gets faster
    spacePressed = false;
  }
}
