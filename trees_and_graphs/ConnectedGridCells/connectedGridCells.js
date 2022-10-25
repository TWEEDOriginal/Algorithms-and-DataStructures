/**
 * returns the number of cells in 
 * the largest region in a matrix. 
 *
 * region is when one or more cells 
 * with a value of 1 are connected.
 * 
 * N = |rows|
 * H = |columns|
 * Time: O(NM)
 * Additional space: O(NM)
 *
 * @param  {Matrix} int[][] - M*N matrix
 * @return {Number}
 *
 */

function dfs(row, column, grid, visited) {
  const rows = grid.length;
  const columns = grid[0].length;
  const currentString = String(`${row}${column}`);
  if (
    visited.has(currentString) ||
    row < 0 ||
    column < 0 ||
    row >= rows ||
    column >= columns
  )
    return 0;

  visited.add(currentString);
  let currentCount = 1;
  let newCurrentCount;

  for (let i = row - 1; i <= row + 1; i++) {
    if (i < 0 || i >= rows) continue;
    for (let j = column - 1; j <= column + 1; j++) {
      if (
        j < 0 ||
        j >= columns ||
        (i == row && j == column) ||
        visited.has(String(`${i}${j}`)) ||
        grid[i][j] === 0
      ) {
        continue;
      }
      newCurrentCount = dfs(i, j, grid, visited);
      currentCount += newCurrentCount;
    }
  }

  return currentCount;
}

function maxRegion(grid) {
  let maxCount = 0,
    currentCount = 0;
  let visited = new Set();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 1 && !visited.has(String(`${i}${j}`))) {
        currentCount = dfs(i, j, grid, visited);
        maxCount = Math.max(maxCount, currentCount);
      }
    }
  }

  return maxCount;
}
let grid = [
  [1, 0, 1, 1, 0],

  [1, 1, 0, 0, 1],

  [0, 1, 1, 1, 0],

  [0, 0, 0, 0, 1],

  [1, 1, 1, 0, 0],
];

console.log(maxRegion(grid));
grid = [
  [0, 0, 1, 1],

  [0, 0, 1, 0],

  [0, 1, 1, 0],

  [0, 1, 0, 0],

  [1, 1, 0, 0],
];
console.log(maxRegion(grid));
grid = [
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [1, 0, 0, 0],
];
console.log(maxRegion(grid));
