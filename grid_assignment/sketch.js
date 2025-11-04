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
  gameBlocks = createGameBlocks(1, 1, 1, cols, rows);
}

function draw() {
  displayGrid();
  displayGameBlocks();
}

function createGameBlocks(_rightBlock, _middleBlock, _leftBlock, _rightXPos, _yPos) {
  let gameBlocks = {
    rightBlock: _rightBlock,
    middleBlock: _middleBlock,
    leftBlock: _leftBlock,
    rightXPos: _rightXPos,
    yPos: _yPos,
  };
  gameBlocksArray.push(gameBlocks);
}

function displayGameBlocks() {
  for (let gameBlocks of gameBlocksArray) {
    grid[gameBlocks.yPos][gameBlocks.rightXPos] = gameBlocks.rightBlock;
    grid[gameBlocks.yPos][gameBlocks.rightXPos - 1] = gameBlocks.middleBlock;
    grid[gameBlocks.yPos][gameBlocks.rightXPos - 2] = gameBlocks.rightBlock;
    
  }
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