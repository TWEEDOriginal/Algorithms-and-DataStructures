/**
 * Given a grid, a start and a goal,
 * it determines the minmum number
 * of moves to get to the goal.
 *
 * N = |grid|
 * Time: O(N^2)
 * Additional space: O(N)
 *
 */

import { Queue } from "../helpers/queue.js";

function minimumMoves(grid, startX, startY, goalX, goalY) {
  if (startX === goalX && startY === goalY) {
    return 0;
  }
  let num_moves = 0;

  const queue = new Queue();
  queue.add([startX, startY, num_moves]);

  const visited = {};
  visited[`${startX},${startY}`] = [startX, startY];
  // top, bottom, right, left
  const moves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (!queue.isEmpty()) {
    [startX, startY, num_moves] = queue.remove();
    num_moves += 1;

    for (let [xi, yi] of moves) {
      let x = startX,
        y = startY;

      while (true) {
        (x = x + xi), (y = y + yi);
        if (
          x >= 0 &&
          y >= 0 &&
          x < grid.length &&
          y < grid[0].length &&
          grid[x][y] === "."
        ) {
          if (x === goalX && y === goalY) {
            return num_moves;
          } else if (!visited[`${x},${y}`]) {
            visited[`${x},${y}`] = [x, y];
            queue.add([x, y, num_moves]);
          }
          continue;
        }
        break;
      }
    }
  }

  return -1;
}

console.log(
  minimumMoves(
    [
      [".", "X", "."],
      [".", "X", "."],
      [".", ".", "."],
    ],
    0,
    0,
    0,
    2
  ),
  3
);

console.log(
  minimumMoves(
    [
      [".", ".", "."],
      [".", "X", "."],
      [".", ".", "."],
    ],
    0,
    0,
    1,
    2
  ),
  2
);

console.log(
  minimumMoves(
    [
      [".", ".", "."],
      [".", "X", "."],
      [".", "X", "."],
    ],
    2,
    0,
    2,
    2
  ),
  3
);
