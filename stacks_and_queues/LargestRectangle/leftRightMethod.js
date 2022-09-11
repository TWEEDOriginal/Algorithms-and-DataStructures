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
    largestArea = 0;

  let stack = new Stack();

  const leftMostValues = [],
    rightMostValues = [];
 
    
  for (let i = 0; i < h.length; i++) {

    //this means no smaller element occurs to the left
    if (stack.isEmpty()) {
      leftMostValues.push(0);
      stack.push(i);
      continue;
    }

    // pop until you find the first smaller element
    while (stack.top && h[stack.top.data] >= h[i]) {
      stack.pop();
    }

    stack.isEmpty()
      ? leftMostValues.push(0)
      : leftMostValues.push(stack.top.data + 1);
    stack.push(i);
  }

  stack = new Stack();

  for (let i = h.length - 1; i >= 0; i--) {
    if (stack.isEmpty()) {
      rightMostValues.push(h.length - 1);
      stack.push(i);
      continue;
    }
    while (stack.top && h[stack.top.data] >= h[i]) {
      stack.pop();
    }

    stack.isEmpty()
      ? rightMostValues.push(h.length - 1)
      : rightMostValues.push(stack.top.data - 1);
    stack.push(i);
  }
 

  for (
    let i = 0, j = rightMostValues.length - 1;
    i < leftMostValues.length && j >= 0;
    i++, j--
  ) {
    area = h[i] * (rightMostValues[j] - leftMostValues[i]  + 1);

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
