
/** Shuffle the input array values then return the array reference. */
export function shuffle(array) {
  array.sort(() => { return Math.random() - 0.5; })
  return array;
}

export function clone(grid){
  return grid.map((row) => { return [...row];});
}