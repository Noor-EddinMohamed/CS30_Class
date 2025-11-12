// Stacker Game
// Noor-Eddin Mohamed
// November 12
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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

function setup() {
  cols = 7;
  rows = 15;
  if (windowWidth / cols < windowHeight / rows) {
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
  if (!spacePressed && frameCounter >= renderOnFrame) {
    moveBlocks();
    frameCounter = 0; 
  }
  displayGrid();
}

function moveBlocks() {
  let leftEdge;
  let rightEdge;

  for (let i = 0; i < theGameBlocks.length; i++) {
    if (theGameBlocks[i] === 1) {
      leftEdge = i;
      break;
    }
  }
  for (let i = theGameBlocks.length - 1; i >= 0; i--) {
    if (theGameBlocks[i] === 1) {
      rightEdge = i;
      break;
    }
  }

  if (direction === "right" && rightEdge >= cols - 1) {
    direction = "left";
  }
  if (direction === "left" && leftEdge <= 0) {
    direction = "right";
  }

  // move blocks in current direction
  if (direction === "right") {
    theGameBlocks.pop();
    theGameBlocks.unshift(0);
  } else {
    theGameBlocks.shift();
    theGameBlocks.push(0);
  }
}

function displayGrid() {
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

  fill("red");
  for (let x = 0; x < cols; x++) {
    if (theGameBlocks[x] === 1) {
      square(x * cellSize, gameBlocksRow * cellSize, cellSize);
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    spacePressed = true;

    if (gameBlocksRow < rows - 1) {
      for (let x = 0; x < cols; x++) {
        if (grid[gameBlocksRow + 1][x] === 0) {
          theGameBlocks[x] = 0;
        }
      }
    }

    let count = 0;
    for (let x = 0; x < theGameBlocks.length; x++) {
      if (theGameBlocks[x] === 1) {
        count++;
      }
    }
    gameBlocksLength = count;


    if (!theGameBlocks.includes(1)) {
      noLoop();
      return;
    }

    for (let x = 0; x < cols; x++) {
      if (theGameBlocks[x] === 1) {
        grid[gameBlocksRow][x] = 1;
      }
    }

    gameBlocksRow--;
    theGameBlocks = createGameBlocks();
    renderOnFrame -= 0.5;
    spacePressed = false;
  }
}
