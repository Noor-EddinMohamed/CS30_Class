// Stacker Game
// Noor-Eddin Mohamed
// November 12
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 50;
let grid;
let rows;
let cols;
let theGameBlocks;
let gameBlocksRow;
let gameBlocksLength = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width / CELL_SIZE);
  rows = Math.floor(height / CELL_SIZE);
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
  displayGrid();
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }

  for (let x = 0; x < cols; x++) {
    if (theGameBlocks[x] === 1) {
      fill("black");
      square(x * CELL_SIZE, gameBlocksRow * CELL_SIZE, CELL_SIZE);
    }
  }
}