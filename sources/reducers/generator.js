
/** Fin the legal values for a given grid cell*/
export function legalValues(width, height, gridSize, range, grid, row, column){
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
  