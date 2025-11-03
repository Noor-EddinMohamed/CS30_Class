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
let gameBlocksArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width / CELL_SIZE);
  rows = Math.floor(height / CELL_SIZE);
  grid = generateEmptyGrid(cols, rows);

  createGameBlocks(3, cols, rows);
}

function draw() {
  displayGrid();
}

function createGameBlocks(_length, _firstX, _y) {
  let gameBlocks = {
    length: _length,
    firstX: _firstX,
    y: _y,
  };
  gameBlocksArray.push(gameBlocks);
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
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