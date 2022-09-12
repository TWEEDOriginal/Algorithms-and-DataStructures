/**
 * Given an integer array of size n,
 * find the maximum of the minimum(s)
 * of every window size in the array.
 * The window size varies from 1 to n.
 *
 * N = |arr|
 * Time: add O(N);
 * Additional space: O(N)
 *
 */

import { Stack } from "../helpers/stack.js";

function riddle(arr) {
  let stack = new Stack(),
    len;
  const max_array = new Array(arr.length),
    smallerLeft = [],
    smallerRight = [];
  max_array.fill(0);

  for (let i = 0; i < arr.length; i++) {
    if (stack.isEmpty()) {
      stack.push(i);
      smallerLeft.push(0);
      continue;
    }
    while (!stack.isEmpty() && arr[stack.top.data] >= arr[i]) {
      stack.pop();
    }

    !stack.isEmpty()
      ? smallerLeft.push(stack.top.data + 1)
      : smallerLeft.push(0);

    stack.push(i);
  }
  stack = new Stack();

  for (let i = arr.length - 1; i >= 0; i--) {
    if (stack.isEmpty()) {
      stack.push(i);
      smallerRight.push(arr.length - 1);
      continue;
    }
    while (!stack.isEmpty() && arr[stack.top.data] >= arr[i]) {
      stack.pop();
    }

    !stack.isEmpty()
      ? smallerRight.push(stack.top.data - 1)
      : smallerRight.push(arr.length - 1);

    stack.push(i);
  }

  for (
    let i = 0, j = smallerRight.length - 1;
    i < smallerLeft.length && j >= 0;
    i++, j--
  ) {
    len = smallerRight[j] - smallerLeft[i];

    // arr[i] can only be a minimum value in
    // window size => len + 1
    max_array[len]
      ? (max_array[len] = Math.max(max_array[len], arr[i]))
      : (max_array[len] = arr[i]);
  }

  // Some entries in max_array[] may not be
  // filled yet. Fill them by taking
  // values from right side of max_array[]

  for (let i = arr.length - 2; i >= 1; i--) {
    max_array[i] = Math.max(max_array[i], max_array[i + 1]);
  }

  return max_array;
}

console.log(riddle([2, 6, 1, 12]), [12, 2, 1, 1]);
