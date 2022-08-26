/**
 * Calculates the minimum number of bribes to get the queue into it's current state
 * A person cannot bribe more than twice
 * Each Person has their original position number on them
 *
 * N = |q|
 * Time: O(N^2)
 * Additional space: O(N)
 *
 * @param  {array}  - q  First string
 * @return {number}   number of bribes
 */

function minimumBribes(q) {
  const realQueue = [];
  const n = q.length;
  let bribe = 0,
    realPos,
    temp;
  let t;

  for (let i = 0; i < n; i++) {
    realQueue.push(i + 1);
  }

  for (let i = 0; i < n; i++) {
    if (q[i] != realQueue[i]) {
      for (let j = i + 1; j < n; j++) {
        if (realQueue[j] === q[i]) {
          realPos = j;
          break;
        }
      }

      temp = realPos - i;

      if (temp >= 3) {
        bribe = "Too chaotic";
        break;
      }
      bribe += temp;

      while (temp > 0) {
        t = realQueue[realPos];
        realQueue[realPos] = realQueue[realPos - 1];
        realQueue[realPos - 1] = t;
        realPos--;
        temp--;
      }
    }
  }
  return bribe
}
console.log(minimumBribes([1, 2, 5, 3, 7, 8, 6, 4]), 7);
