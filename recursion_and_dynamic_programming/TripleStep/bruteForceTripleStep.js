/**
 * Return the number of ways
 * a child can run up a
 * staircase with N steps
 *
 * N = |steps|
 * Time: O(3^N)
 * Additional space: O(N)
 *
 * @param  {number}
 * @return {number}
 */

const stepsChoices = [1, 2, 3];

function countWays(n) {
  if (n < 0) return 0;
  if (n == 0) return 1;

  let count = 0;
  for (let choice of stepsChoices) {
    count += countWays(n - choice);
  }
  return count;
}

console.log(countWays(3));
