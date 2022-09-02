/**
 * puts elements less than x on the left
 * and other elements on the right side
 *
 * N = size of linkedlist
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array}  int[] - linkedlist items
 * @return {array}   int[] - partitioned array
 */

import { LinkedList, Node } from "../helpers/linkedList.js";

const partition = (arr, x) => {
  let list = new LinkedList();
  list.arrayToLinkedList(arr);
  let curr = list.head;
  let prev = null;
  let big = new LinkedList();

  while (curr.value >= x) {
    big.append(curr.value);
    list.head = curr.next;
    curr = curr.next;
  }

  while (curr) {
    if (curr.value < x) {
      prev = curr;
      curr = curr.next;
      continue;
    }
    big.append(curr.value);
    prev.next = curr.next;
    curr = prev.next;
  }
  let big_curr = big.head;

  while (big_curr) {
    prev.next = new Node(big_curr.value);
    prev = prev.next;
    big.head = big_curr.next;
    big_curr = big.head;
  }

  return list.toArray();
};

console.log(partition([3, 5, 8, 5, 10, 2, 1], 5), [3, 2, 1, 5, 8, 5, 10]);
console.log(partition([5, 5, 8, 5, 10, 3, 2, 1], 5), [3, 2, 1, 5, 5, 8, 5, 10]);
console.log(partition([5, 8, 7, 4, 9, 15, 30], 31), [5, 8, 7, 4, 9, 15, 30]);
console.log(
  partition([4, 9, 15, 30, 5, 8, 3, 2, 2, 3, 7, 1, 15, 5, 6, 7], 6),
  [4, 5, 3, 2, 2, 3, 1, 5, 9, 15, 30, 8, 7, 15, 6, 7]
);
