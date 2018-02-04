
let gridSize = 3;
let range = gridSize * gridSize;
let width = range;
let height = range;


// ----------------------------------------------------------------------------
// Init the grid
// ----------------------------------------------------------------------------

const shuffle = (array) => {
  array.sort(() => { return Math.random() - 0.5; })
  return array;
};

function print(grid){
  for (let row = 0; row < height; row++){
    console.log(grid[row].join(' | '));
  }
  console.log('--')
}

function createGrid(){
  let grid = [];
  for (let row=0; row < height; row++){
    grid.push(new Array(width).fill(0,0, width));
  }
  // -------------------------------------------------
  // Create random seed (prefil first row/column)
  // -------------------------------------------------
  for(let i = 0; i < height; i++){
    grid[0][i] = i + 1;
  }
  for(let j = 0; j < height; j++){
    let v = grid[0][j];
    let k = Math.floor(Math.random() * (height - j)) + j;
    grid[0][j] = grid[0][k];
    grid[0][k] = v;
  }

  // -------------------------------------------------
  // Fill a grid solution
  // -------------------------------------------------
  let start = performance.now();
  solve(grid, 1, 0);
  let end = performance.now();
  console.log('grid generated in ', `${end - start}ms`)
  return grid;
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

function solve(grid, row, column){
  if (column >= width){
    row = row + 1;
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

function columnIsValid(grid, column){
  let values = {};
  for(let i=0; i < height; i++){
    let v = grid[i][column];
    if (v > 0 && values[v]) { return false; }
    values[v] = true;
  }
  return true;
}

function rowIsValid(grid, row){
  let values = {};
  for(let i=0; i < height; i++){
    let v = grid[row][i];
    if (v > 0 && values[v]) { return false; }
    values[v] = true;
  }
  return true;
}























function isComplete(grid){
  for(let row = 0; row < height; row++) {
    for(let column = 0; column < width; column++) {
      if (!grid[row][column]) {
        return false;
      }
    }
  }
  return true;
}

// function rowIsValid(row, grid){
//   let values = {};
//   for(let column = 0; column < width; column++) {
//     let value = grid[row][column];
//     if (value > 0){
//       if (values[value]){
//         return false;
//       }
//       values[value] = true;
//     }
//   }
//   return true;
// }

function columnIsValidXXX(column, grid){
  let values = {};
  for(let row = 0; row < height; row++) {
    let value = grid[row][column];
    if (value > 0){
      if (values[value]){
        return false;
      }
      values[value] = true;
    }
  }
  return true;
}

function blockIsValid(rowIndex, columnIndex, grid){
  let values = {};
  for(let row = rowIndex; row < rowIndex + gridSize; row++) {
    for(let column = columnIndex; column < columnIndex + gridSize; column++){
      let value = grid[row][column];
      if (value > 0){
        if (values[value]){
          return false;
        }
        values[value] = true;
      }
    }
  }
  return true;
}


function solvexxx(grid, column, row){
  if (column >= width){
    row++;
    column = 0
  }
  if (row >= height){
    return true;
  }
  for(let i=1; i <= range; i++){
    grid[row][column] = i;
    if (rowIsValid(row, grid)
      && columnIsValid(column-1, grid)
      && blockIsValid(Math.floor(row / gridSize), Math.floor(column / gridSize), grid)
      ){
      if (solve(grid, column+1, row)){
        return true;
      }
    }
  }
  grid[row][column] = null;
  return false;
}



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
