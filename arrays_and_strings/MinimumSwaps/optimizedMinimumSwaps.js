/**
 * Find the minimum number of swaps required 
 * to sort an array in ascending order. 
 *
 * N = |arr|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array}  - Unordered array
 * @return {number}   number of swaps
 */

function minimumSwaps(arr) {
  let map = [];
  let n = arr.length,
    temp,
    res,
    swaps = 0;
  for (let i = 0; i < n; i++) {
    map[arr[i]] = i;
  }
  console.log(map);
  for (let i = 0; i < n; i++) {
    if (arr[i] !== i + 1) {
      temp = arr[i];
      res = map[i + 1];
      arr[i] = i + 1;
      arr[res] = temp;
      map[arr[res]] = res;
      map[i + 1] = i;
      swaps++;
    }
  }
  console.log(map);
  return swaps;
}

console.log(minimumSwaps([7, 1, 3, 2, 4, 5, 6]), 5);
console.log(minimumSwaps([4, 3, 1, 2]), 3);
console.log(minimumSwaps([2, 3, 4, 1, 5]), 3);
