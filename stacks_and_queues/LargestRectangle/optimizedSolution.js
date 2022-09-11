/**
 * Find the largest rectangular area possible
 * to construct a shopping mall where the
 * largest rectangle can be made of a number
 * of contiguous unoccupied buildings.
 *
 * N = |h|
 * Time: add O(N);
 * Additional space: O(N)
 *
 */

import { Stack } from "../helpers/stack.js";

function largestRectangle(h) {
  let area = 0,
    largestArea = 0,
    building_index;

  const stack = new Stack();
  let i = 0;
  while (i < h.length) {
    if (stack.isEmpty() || h[stack.top.data] <= h[i]) {
      stack.push(i);
      i++;
      continue;
    }

    building_index = stack.pop();
    area = h[building_index] * (stack.isEmpty() ? i : i - stack.top.data - 1);
    area > largestArea ? (largestArea = area) : null;
  }

  while (!stack.isEmpty()) {
    building_index = stack.pop();
    area = h[building_index] * (stack.isEmpty() ? i : i - stack.top.data - 1);
    area > largestArea ? (largestArea = area) : null;
  }

  return largestArea;
}

console.log(
  largestRectangle([
    8979, 4570, 6436, 5083, 7780, 3269, 5400, 7579, 2324, 2116,
  ]),
  [26152]
);
