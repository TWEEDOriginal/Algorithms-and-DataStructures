/**
 * Transpose the matrix then
 * flip each row horizontally so it goes from last to first
 *
 *
 *
 * N = dimension of matrix
 * Time: O(N^2)
 * Additional space: O(1)
 *
 * @param  {array} matrix NxN matrix to rotate in place
 * @return {array}        Rotated matrix, same object as input
 */

const rotateMatrix = (matrix) => {
  const n = matrix.length;
  if (!matrix || n === 0 || n !== matrix[0].length) {
    throw new Error("invalid matrix");
  }
  if (n < 2) {
    return matrix; // no need to do anything to rotate a 1,1 matrix
  }
  let temp;

  // first transpose the matrix
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  // flip the matrix horizontally
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      temp = matrix[i][j];
      matrix[i][j] = matrix[i][n - 1 - j];
      matrix[i][n - 1 - j] = temp;
    }
  }
  return matrix;
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
