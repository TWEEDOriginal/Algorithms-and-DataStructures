/**
 * Find the minimum number of swaps required
 * to sort an array in ascending order.
 *
 * N = |arr|
 * Time: O(N^2)
 * Additional space: O(1)
 *
 * @param  {array}  - Unordered array
 * @return {number}   number of swaps
 */

function minimumSwaps(arr) {
  let n = arr.length,
    temp,
    res,
    swaps = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] !== i + 1) {
      temp = arr[i];
      for (let j = i + 1; j < n; j++) {
        if (arr[j] === i + 1) {
          res = j;
          break;
        }
      }
      arr[i] = arr[res];
      arr[res] = temp;
      swaps++;
    }
  }
  return swaps;
}

console.log(minimumSwaps([7, 1, 3, 2, 4, 5, 6]), 5);
console.log(minimumSwaps([4, 3, 1, 2]), 3);
console.log(minimumSwaps([2, 3, 4, 1, 5]), 3);
