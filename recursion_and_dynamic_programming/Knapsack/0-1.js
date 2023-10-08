const items = [
  {
    value: 1,
    weight: 10,
  },
  {
    value: 2,
    weight: 5,
  },
  {
    value: 7,
    weight: 5,
  },
  {
    value: 10,
    weight: 90,
  },
];

const maxWeight = 100;
//get max value into knapsack without exceeding
//maxWeight and without repeating any item

/**
 *
 * w = maxWeight
 * n = |items|
 * Time: O(2^n)
 * Additional space: O(n)
 *
 */
const bruteForce = (items, maxWeight, index) => {
  if (index >= items.length) return 0;

  if (items[index].weight > maxWeight)
    return bruteForce(items, maxWeight, index + 1);

  return Math.max(
    bruteForce(items, maxWeight - items[index].weight, index + 1) +
      items[index].value, //include item
    bruteForce(items, maxWeight, index + 1) //omit this item
  );
};

/**
 *
 * w = maxWeight
 * n = |items|
 * Time: O(wn)
 * Additional space: O(wn + n)
 *
 */
const optimizedRecursive = (items, maxWeight, index, cache) => {
  if (index >= items.length) return 0;

  //check if cache has index maxWeight maxValue combo
  if (cache[index].has(maxWeight)) return cache[index].get(maxWeight);

  let maxValue = optimizedRecursive(items, maxWeight, index + 1, cache);

  if (items[index].weight <= maxWeight)
    maxValue = Math.max(
      optimizedRecursive(
        items,
        maxWeight - items[index].weight,
        index + 1,
        cache
      ) + items[index].value,
      maxValue
    );

  cache[index].set(maxWeight, maxValue);

  return maxValue;
};

const recursiveSolve = () => {
  const cache = Array(items.length)
    .fill()
    .map(() => new Map());
  return optimizedRecursive(items, maxWeight, 0, cache);
};

/**
 *
 * w = maxWeight
 * n = |items|
 * Time: O(wn)
 * Additional space: O(wn)
 *
 */
const iterativeSolve = (items, maxWeight) => {
  if (items.length === 0 || maxWeight == 0) return 0;

  const cache = Array(items.length + 1)
    .fill()
    .map(() => Array(maxWeight + 1).fill(0));

  // For each item and weight,
  // compute the max value of the items up to
  // that item that doesn't go over maxWeight
  for (let index = 1; index < cache.length; index++) {
    //each item
    for (let w = 0; w < cache[0].length; w++) {
      // each weight
      cache[index][w] = cache[index - 1][w];

      if (w >= items[index - 1].weight) {
        cache[index][w] = Math.max(
          cache[index - 1][w],
          cache[index - 1][w - items[index - 1].weight] + items[index - 1].value
        );
      }
    }
  }
  return cache[items.length][maxWeight];
};

console.log(bruteForce(items, maxWeight, 0));
console.log(recursiveSolve());
console.log(iterativeSolve(items, maxWeight));
