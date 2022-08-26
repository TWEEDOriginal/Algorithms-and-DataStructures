/**
 * Calculates the minimum number of bribes to get the queue into it's current state
 * A person cannot bribe more than twice
 * Each Person has their original position number on them
 *
 * N = |q|
 * Time: O(N^2)
 * Additional space: O(1)
 *
 * @param  {array}  - q  First string
 * @return {number}   number of bribes
 */

function minimumBribes(q) {
  let res = 0,
    pos = 0,
    expected = 0,
    bribe = 0;
  for (let i = 0; i < q.length; i++) {
    (pos = q[i]), (expected = i + 1);

    bribe = pos - expected;
    if (bribe >= 3) {
      res = "Too chaotic";
      break;
    }
    for (let j = Math.max(0, pos - 2); j < i; j++) {
      if (q[j] > pos) {
        res++;
      }
    }
  }
  return res;
}

// 1, 2, 3, 4, 5, 6, 7, 8
// 1, 2, 5, 3, 7, 8, 6, 4

console.log(minimumBribes([1, 2, 5, 3, 7, 8, 6, 4]), 7);
