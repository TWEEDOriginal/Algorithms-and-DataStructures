/**
 * Find the largest rectangular area possible
 * to construct a shopping mall where the
 * largest rectangle can be made of a number
 * of contiguous unoccupied buildings.
 *
 * N = |h|
 * Time: add O(N^2);
 * Additional space: O(1)
 *
 */

function largestRectangle(h) {
  let area = 0,
    largestArea = 0,
    building;
  for (let i = 0; i < h.length; i++) {
    building = i + 1;
    area = 0;
    area += h[i];
    while (building < h.length) {
      if (h[building] < h[i]) break;
      area += h[i];
      building++;
    }
    building = i - 1;
    while (building >= 0) {
      if (h[building] < h[i]) break;
      area += h[i];
      building--;
    }
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
