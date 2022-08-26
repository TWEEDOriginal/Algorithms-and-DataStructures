/**
 * if an element in a MxN matrix is zero
 * it sets the entire row and column of the element to zero
 *
 *
 * N = matrix Y dimension
 * M = matrix X dimension
 * Time: O(N * M)
 * Additional space: O(N + M)
 *
 * @param  {array} matrix Matrix to be zeroed in-place
 * @return {array}        Matrix that has been zeroed, same object as input
 */

const zeroMatrix = (matrix) => {
  const m = matrix.length;
  const n = matrix[0].length;
  const rows = [];
  const columns = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        rows[i] = true;
        columns[j] = true;
      }
    }
  }

  // convert row to zeros if it has a zero
  for (let i = 0; i < m; i++) {
    if (rows[i]) {
      for (let j = 0; j < n; j++) {
        matrix[i][j] = 0;
      }
    }
  }

  // convert column to zeros if it has a zero
  for (let j = 0; j < n; j++) {
    if (columns[j]) {
      for (let i = 0; i < n; i++) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
};

console.log(
  zeroMatrix([
    [1, 0, 3],
    [4, 0, 6],
    [7, 8, 9],
  ]),
  [0, 0, 0],
  [0, 0, 0],
  [7, 0, 9]
);

console.log(
  zeroMatrix(
    [
      [0, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 0, 12],
      [13, 14, 15, 16],
    ],
    [0, 0, 0, 0],
    [0, 6, 0, 8],
    [0, 0, 0, 0],
    [0, 14, 0, 16]
  )
);
