/**
 * returns a valid path
 *
 * r = |row|
 * c = |column|
 * Time: O(rc)
 * Additional space: O(rc)
 *
 * @param  {array}  number[][] - grid
 * @param  {number} - row
 * @param  {number} - column
 * @param  {Map}    - attempted
 * @param  {array}  number[] - path
 * @return {array}
 */

function getPath(grid, r, c, attempted, path) {
  //if out of bounds or off limits or cell been visited
  if (
    r < 0 ||
    c < 0 ||
    grid[r][c] == 0 ||
    (attempted.has(r) && attempted.get(r).has(c))
  )
    return false;

  if (r == 0 && c == 0) return true;

  if (!attempted.has(r)) attempted.set(r, new Set());

  attempted.get(r).add(c);

  if (
    getPath(grid, r - 1, c, attempted, path) ||
    getPath(grid, r, c - 1, attempted, path)
  ) {
    path.push([r, c]);
    return true;
  }
  return false;
}

function solve(grid) {
  if (!grid || grid.length == 0) return;

  const path = [];
  if (getPath(grid, grid.length - 1, grid[0].length - 1, new Map(), path))
    return path;

  return;
}

const mazes = [
  [
    [1, 1, 1],
    [1, 0, 1],
  ],
  [
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [0, 1, 1, 1],
  ],
];

for (let maze of mazes) console.log(solve(maze));
