const arr = [2, 3, 4];

const target = 10;

//determine the sum nearest to but not exceeding target
//using any elements in arr zero or more times

/**
 *
 * k = target
 * n = |arr|
 * Time: O(n^k)
 * Additional space: O(k )
 *
 */
function bruteForce(k, arr, i) {
  if (i >= arr.length || k === 0) return 0;

  if (arr[i] > k) return bruteForce(k, arr, i + 1);

  let res = 0;
  for (let n = 0; n * arr[i] <= k; n++) {
    const val = n * arr[i];
    res = Math.max(res, bruteForce(k - val, arr, i + 1) + val);
  }
  return res;
}

function solve(k, arr, i, cache) {
  if (i >= arr.length || k === 0) return 0;

  if (cache[i].has(k)) return cache[i].get(k);

  let res = solve(k, arr, i + 1, cache);

  if (arr[i] <= k) {
    for (let n = 1; n * arr[i] <= k; n++) {
      const val = n * arr[i];
      res = Math.max(res, solve(k - val, arr, i + 1, cache) + val);
    }
  }

  cache[i].set(k, res);
  return res;
}

/**
 *
 * k = target
 * n = |arr|
 * Time: O(kn)
 * Additional space: O(kn + n)
 *
 */
function recursiveSolve(k, arr) {
  const cache = Array(arr.length)
    .fill()
    .map(() => new Map());
  return solve(k, arr, 0, cache);
}

/**
 *
 * k = target
 * n = |arr|
 * Time: O(kn)
 * Additional space: O(kn)
 *
 */
function iterativeSolve(k, arr) {
  if (arr.length === 0 || k == 0) return 0;

  const cache = Array(arr.length + 1)
    .fill()
    .map(() => Array(k + 1).fill(0));

  for (let i = 1; i < cache.length; i++) {
    for (let w = 0; w < cache[0].length; w++) {
      cache[i][w] = cache[i - 1][w];
      if (arr[i - 1] <= w) {
        for (let n = 1; n * arr[i - 1] <= w; n++) {
          const val = n * arr[i - 1];
          cache[i][w] = Math.max(cache[i][w], cache[i - 1][w - val] + val);
        }
      }
    }
  }

  return cache[arr.length][k];
}

console.log(bruteForce(target, arr, 0));
console.log(recursiveSolve(target, arr));
console.log(iterativeSolve(target, arr));
