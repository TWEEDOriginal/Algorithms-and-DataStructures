/**
 * Starting with a 1-indexed array of zeros and a list of operations,
 *  for each operation add a value to each array element between two given indices, inclusive.
 * Once all operations have been performed, return the maximum value in the array.
 *
 * N = number of zeroes
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {n}  - number of zeroes
 * @param  {array}  int[][] - each element is an array with start, end and value to add
 * @return {number}  - maximum value in the array
 */

function arrayManipulation(n, queries) {
  const arr = [];
  let max = 0,
    temp = 0,
    start,
    end,
    value;

  // increment start and end values
  for (let i = 0; i < queries.length; i++) {
    start = queries[i][0];
    end = queries[i][1];
    value = queries[i][2];
    arr[start] = arr[start] || {
      start: 0,
      end: 0,
    };
    arr[end] = arr[end] || {
      start: 0,
      end: 0,
    };
    arr[start].start += value;
    arr[end].end += value;
  }

  // check for max value
  for (let j = 0; j < arr.length; j++) {
    if (!arr[j]) continue;
    temp += arr[j].start;

    max = max < temp ? temp : max;
    temp -= arr[j].end;
  }

  return max;
}

console.log(
  arrayManipulation(10, [
    [1, 5, 3],
    [4, 8, 7],
    [6, 9, 1],
  ]),
  10
);
console.log(
  arrayManipulation(10, [
    [2, 6, 8],
    [3, 5, 7],
    [1, 8, 1],
    [5, 9, 15],
  ]),
  31
);
