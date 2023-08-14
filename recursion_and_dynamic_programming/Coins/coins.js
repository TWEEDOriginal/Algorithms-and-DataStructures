function countWays(n, coins, index, calculated) {
  //has been calculated
  if (calculated.has(n) && calculated.get(n).has(index))
    return calculated.get(n).get(index);

  //can only be represented by pennies
  if (index >= coins.length - 1) return 1;

  let count = 0,
    choice = coins[index];

  //try for all possible options of that
  //coin before moving onto the next
  for (let i = 0; i * choice <= n; i++) {
    count += countWays(n - i * choice, coins, index + 1, calculated);
  }

  if (!calculated.has(n)) calculated.set(n, new Map());
  calculated.get(n).set(index, count);

  return count;
}

const calculated = new Map();
console.log(countWays(100, [25, 10, 5, 1], 0, calculated), calculated);
