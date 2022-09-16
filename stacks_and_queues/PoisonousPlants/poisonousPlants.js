/**
 * After each day, if any plant has more pesticide
 * than the plant on its left, being weaker
 * than the left one, it dies.
 * Counts number of days after which no plant dies
 *
 * N = |plants|
 * Time: add O(N);
 * Additional space: O(N)
 *
 *
 */

import { Stack } from "../helpers/stack.js";

const poisonousPlants = (plants) => {
  let days = 0,
    plantDays = 0;
  const stack = new Stack();

  stack.push({ pesticide_value: plants[0], plantDays: 0 });

  for (let i = 1; i <= plants.length; i++) {
    plantDays = 0;

    while (stack.top && stack.top.data.pesticide_value >= plants[i]) {
      plantDays = Math.max(plantDays, stack.pop().plantDays);
    }

    plantDays++;
    // it means there's no plant with
    // less pesticide and it never died
    if (stack.isEmpty()) plantDays = 0;

    stack.push({ pesticide_value: plants[i], plantDays });

    days = days < plantDays ? plantDays : days;
  }

  return days;
};

console.log(poisonousPlants([4, 3, 7, 5, 6, 4, 2]), 3);
console.log(poisonousPlants([3, 2, 5, 4]), 2);
console.log(poisonousPlants([6, 5, 8, 4, 7, 10, 9]), 2);
console.log(poisonousPlants([100, 109]), 1);
