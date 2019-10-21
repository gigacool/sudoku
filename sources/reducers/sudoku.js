import { shuffle, clone } from '../utils/utils';

// ----------------------------------------------------------------------------
// Default grid parameters
// ----------------------------------------------------------------------------

let gridSize = 3;
let range = gridSize * gridSize;
let width = range;
let height = range;

// ----------------------------------------------------------------------------
// Grid creation
// ----------------------------------------------------------------------------

function createGrid(){
  let grid = [];
  for (let row=0; row < height; row++){
    grid.push(new Array(width).fill(0,0, width));
  }
  // Create random seed (prefil first row)
  for(let i = 0; i < height; i++){
    grid[0][i] = i + 1;
  }
  shuffle(grid[0]);
  // Fill remaining grid to generate a unique solution
  let start = performance.now();
  solve(grid, 1, 0);
  let mid = performance.now();
  console.log('grid generated in ', `${mid - start}ms`)
  emptyGridCells(grid);
  let end = performance.now();
  console.log('grid generated in ', `${end - mid}ms`)
  return grid;
}

function solve(grid, row, column){
  if (column >= width){
    row++;
    column=0;
  }
  if (row >= height){
    return true;
  }
  let candidateValues = shuffle(legalValues(grid, row, column));
  for(let i=0; i< candidateValues.length; i++){
    grid[row][column] = candidateValues[i];
    if (solve(grid, row, column+1)){
        return true;
    }
  }
  grid[row][column] = 0;
  return false;
}

/** Fin the legal values for a given grid cell*/
function legalValues(grid, row, column){
  let valuesTaken = {};
  // from line
  for(let ri = 0; ri < height; ri++){
    if (grid[ri][column] > 0) { valuesTaken[grid[ri][column]] = true; }
  }
  // from column
  for(let ci = 0; ci < width; ci++){
    if (grid[row][ci] > 0) { valuesTaken[grid[row][ci]] = true; }
  }
  // from block
  let rStart = Math.trunc(row / gridSize) * gridSize;
  let cStart = Math.trunc(column / gridSize) * gridSize;
  for(let r = rStart; r < rStart + gridSize; r++){
    for(let c = cStart; c < cStart + gridSize; c++){
      if (grid[r][c] > 0) { valuesTaken[grid[r][c]] = true; }
    }
  }
  let values = []
  for(let i = 1; i <= range; i++){
    if (!valuesTaken[i]){ values.push(i); }
  }
  return values; // data are sorted, shuffling them will help with possible bias
}

function countSolutions(grid, row = 0, column = 0) {
  if (column >= width) {
    row++;
    column=0;
  }
  if (row >= height) {
    return 1;
  }
  if (!grid[row][column]){
    let candidateValues = legalValues(grid, row, column);
    let solutions = 0;
    for(let i=0; i< candidateValues.length; i++){
      grid[row][column] = candidateValues[i];
      solutions+= countSolutions(grid, row, column+1);
    }
    grid[row][column] = 0;
    return solutions
  } 
  return countSolutions(grid, row, column+1);
}

function emptyGridCells(grid){
  let start = performance.now();
  // TODO - use random on cells that are filed instead of potentially empty ones
  // work on symetry 
  for(let i=0; i<1000; i++){
    let row = Math.floor(Math.random()*width);
    let column = Math.floor(Math.random()*height);
    let a = grid[row][column];
    let b = grid[column][row];
    grid[row][column] = 0;
    grid[column][row] = 0;
    let solutions = countSolutions(grid);
    if (solutions > 1) {
      grid[row][column] = a;
      grid[column][row] = b;
    } else {
      grid[row][column] = 0;
      grid[column][row] = 0;
    }
    if (performance.now() - start > 100) {
      i = 10000000;
    }
  }
  // clear a bit more
  for(let i=0; i<20; i++){
    let row = Math.floor(Math.random()*width);
    let column = Math.floor(Math.random()*height);
    let a = grid[row][column];
    grid[row][column] = 0;
    let solutions = countSolutions(grid);
    if (solutions > 1) {
      grid[row][column] = a;
    } else {
      grid[row][column] = 0;
    }
  }
  return grid;
}

function hasSingleSolution(grid){
  if (column >= width){
    row++;
    column=0;
  }
  if (row >= height){
    return true;
  }
  let candidateValues = shuffle(legalValues(grid, row, column));
  for(let i=0; i< candidateValues.length; i++){
    grid[row][column] = candidateValues[i];
    if (solve(grid, row, column+1)){
        return true;
    }
  }
  grid[row][column] = 0;
  return false;
}

// ----------------------------------------------------------------------------
// Reducers
// ----------------------------------------------------------------------------

let defaultState = {
  grid: [],
}
for (let i = 0 ; i < width; i++) {
  defaultState.grid.push([]);
}

export function sudoku(state = defaultState, action){

  switch (action.type) {
    case 'SUDOKU_INIT':
      // let grid = solve(state.grid, 0, 0);
      let grid = createGrid();
      return {
        grid: grid
      };
      return state;
    return state;
    default:
    return state;

  }

  return state;
}

export default sudoku;
