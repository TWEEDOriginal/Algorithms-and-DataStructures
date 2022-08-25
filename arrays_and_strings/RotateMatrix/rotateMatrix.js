/**
 * returns a NxN matrix rotated 90 degrees
 *
 * @example
 * // returns
 *
 *
 * @param  {array } int[][]  - NxN matrix
 * @return {array}  int[][]  - 90 degrees rotation of original array
 *
 *
 * Time: O(n^2) where n equals length matrix
 * Additional space: O(n^2) where n equals length of matrix
 */

const rotateMatrix = (matrix) => {
  let n = matrix.length;
  let newMatrix = [];

  for (let j = 0; j < n; j++) {
    newMatrix.push([]);
    newMatrix[j].push(matrix[n - 1][j]);
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < n; j++) {
      newMatrix[j].push(matrix[i][j]);
    }
  }
  return newMatrix;
};

console.log(
  rotateMatrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
  [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ]
);

console.log(
  rotateMatrix([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]),
  [
    [13, 9, 5, 1],
    [14, 10, 6, 2],
    [15, 11, 7, 3],
    [16, 12, 8, 4],
  ]
);
