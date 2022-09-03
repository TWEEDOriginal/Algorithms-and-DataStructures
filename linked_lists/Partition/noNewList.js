/**
 * puts elements less than x on the left
 * and other elements on the right side
 *
 * N = |linkedlist|
 * Time: O(N)
 * Additional space: O(1)
 *
 * @param  {array}  int[] - linkedlist items
 * @return {array}   int[] - partitioned array
 */

import { LinkedList } from "../helpers/linkedList.js";

const partition = (arr, x) => {
  let list = new LinkedList();
  list.arrayToLinkedList(arr);
  let curr = list.head.next;
  let prev = list.head;

  while (curr) {
    if (curr.value < x) {
      list.prepend(curr.value);
      prev.next = curr.next;
      curr = curr.next;
      continue;
    }
    prev = curr;
    curr = curr.next;
  }

  return list.toArray();
};

console.log(partition([3, 5, 8, 5, 10, 2, 1], 5), [1, 2, 3, 5, 8, 5, 10]);
console.log("\n");
console.log(partition([5, 3, 8, 5, 10, 2, 1], 5), [1, 2, 3, 5, 8, 5, 10]);
console.log("\n");
console.log(partition([5, 5, 8, 5, 10, 3, 2, 1], 5), [1, 2, 3, 5, 5, 8, 5, 10]);
console.log("\n");
console.log(partition([5, 8, 7, 4, 9, 15, 30], 31), [30, 15, 9, 4, 7, 8, 5]);
console.log("\n");
console.log(
  partition([4, 9, 15, 30, 5, 8, 3, 2, 2, 3, 7, 1, 15, 5, 6, 7], 6),
  [5, 1, 3, 2, 2, 3, 5, 4, 9, 15, 30, 8, 7, 15, 6, 7]
);
