/**
 * Checks if either of two conditions is met:
 * All of the characters are the same, e.g. aaa.
 * All characters except the middle one are the same, e.g. aadaa.
 *
 * N = |string|
 * Time: O(N^2)
 * Additional space: O(1)
 *
 * @param  {number} int - length of string
 * @param  {string}
 * @return {number} - number of special strings
 */

function substrCount(n, s) {
  // initialize count to include all letters
  let count = n,
    j,
    substrLength = 0;
  for (let i = 0; i < n - 1; i++) {
    // check for special string until a
    // different letter is reached
    j = i + 1;
    substrLength = 1;
    while (s[j] === s[i] && j < n) {
      substrLength++;
      count++;
      j++;
    }

    if (j >= n) continue;

    // check if different letter is
    // middle of a special string
    j++;
    while (s[j] === s[i] && j < n && substrLength > 0) {
      substrLength--;
      j++;
    }
    if (substrLength === 0) count++;
  }
  return count;
}

console.log(substrCount(5, "asasd"), 7);
console.log(substrCount(7, "abcbaba"), 10);
console.log(substrCount(4, "aaaa"), 10);
