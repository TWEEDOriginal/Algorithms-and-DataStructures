/**
 * Returns an array with the largest
 * friend circle for each query
 *
 * Query contains a and b that shake hands
 * with each other, then a and friends of a
 * become friends with b and friends of b.
 *
 * P = |Population of HackerWorld|
 * Time: O(P)
 * Additional space: O(P)
 *
 * @param  {array}   number[][]
 * @return  {boolean} number[] - array with largest friend circles
 *
 */

function maxCircle(queries) {
  let largestGroups = [],
    a,
    b;
  let current = 0,
    aIndex,
    bIndex;
  const friendCircles = [];
  const visited = new Map();

  for (let handshake of queries) {
    a = handshake[0];
    b = handshake[1];
    if (visited.has(a) && visited.has(b)) {
      //change the one with the smaller number of items
      aIndex = visited.get(a);
      bIndex = visited.get(b);
      if (aIndex == bIndex) {
        largestGroups.push(current);
        continue;
      }

      const aLength = friendCircles[aIndex].length;
      const bLength = friendCircles[bIndex].length;
      current = Math.max(current, aLength + bLength);

      if (aLength < bLength) {
        for (let friend of friendCircles[aIndex]) {
          friendCircles[bIndex].push(friend);
          visited.set(friend, bIndex);
        }
      } else {
        for (let friend of friendCircles[bIndex]) {
          friendCircles[aIndex].push(friend);
          visited.set(friend, aIndex);
        }
      }
    } else if (!visited.has(a) && visited.has(b)) {
      bIndex = visited.get(b);

      visited.set(a, bIndex);
      friendCircles[bIndex].push(a);

      current = Math.max(current, friendCircles[bIndex].length);
    } else if (visited.has(a) && !visited.has(b)) {
      aIndex = visited.get(a);

      visited.set(b, aIndex);
      friendCircles[aIndex].push(b);

      current = Math.max(current, friendCircles[aIndex].length);
    } else {
      friendCircles.push(handshake);

      const lastItem = friendCircles.length - 1;
      visited.set(a, lastItem);
      visited.set(b, lastItem);

      current = Math.max(current, 2);
    }

    largestGroups.push(current);
  }
  return largestGroups;
}

const printResult = (array) => {
  for (let item of array) {
    console.log(maxCircle(item));
  }
};

printResult([
  [
    [6, 4],
    [5, 9],
    [8, 5],
    [4, 1],
    [1, 5],
    [7, 2],
    [4, 2],
    [7, 6],
  ],
  [
    [1, 2],
    [3, 4],
    [1, 3],
    [5, 7],
    [5, 6],
    [7, 4],
  ],
  [
    [1000000000, 23],
    [11, 3778],
    [7, 47],
    [11, 1000000000],
  ],
]);
