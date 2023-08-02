/**
 * Return the number of ways
 * a child can run up a
 * staircase with N steps
 *
 * N = |steps|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {number}
 * @return {number}
 */

const stepsChoices = [1, 2, 3];

function countWays(n, memo) {
  if (n < 0) return 0;

  if (memo[n]) return memo[n];

  let count = 0;
  for (let choice of stepsChoices) {
    count += countWays(n - choice, memo);
  }
  memo[n] = count;
  return memo[n];
}

function initialize(n) {
  if (n <= 0) return 0;

  return countWays(n, [1]);
}

console.log(initialize(3));
