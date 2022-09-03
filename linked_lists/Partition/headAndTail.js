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
  if (!list.head)
     throw new Error('List cannot be Empty')
  let newList = new LinkedList();
  newList.append(list.head.value);
  let tail = newList.head;
  let curr = list.head.next;

  while (curr) {
    if (curr.value < x) {
      newList.prepend(curr.value);
      curr = curr.next;
      continue;
    }
    tail.next = new Node(curr.value);
    tail = tail.next;
    curr = curr.next;
  }

  return newList.toArray();
};

console.log(partition([3, 5, 8, 5, 10, 2, 1], 5), [1, 2, 3, 5, 8, 5, 10]);
console.log(partition([5, 5, 8, 5, 10, 3, 2, 1], 5), [1, 2, 3, 5, 5, 8, 5, 10]);
console.log(partition([5, 8, 7, 4, 9, 15, 30], 31), [30, 15, 9, 4, 7, 8, 5]);
console.log(
  partition([4, 9, 15, 30, 5, 8, 3, 2, 2, 3, 7, 1, 15, 5, 6, 7], 6),
  [5, 1, 3, 2, 2, 3, 5, 4, 9, 15, 30, 8, 7, 15, 6, 7]
);