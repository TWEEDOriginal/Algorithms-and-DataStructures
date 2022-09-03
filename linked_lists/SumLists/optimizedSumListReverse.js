/**
 * adds two single digit numbers
 * returns sum repd as a linked list
 *
 * N = max(|list1|, |list2|)
 * Time: O(N)
 * Additional space: O(1)
 *
 * @param  {array}  int[] - linkedlist items
 * @param  {array}  int[] - linkedlist items
 * @return {array}   int[] - linkedlist of sum digits
 */

import { LinkedList, Node } from "../helpers/linkedList.js";

const sumLists = (arr1, arr2) => {
  let list1 = new LinkedList();
  list1.arrayToLinkedList(arr1);
  let list2 = new LinkedList();
  list2.arrayToLinkedList(arr2);
  let prev1 = null;
  let curr1 = list1.head;
  let curr2 = list2.head;

  let remainder = 0,
    sum = 0;

  while (curr1 && curr2) {
    sum = curr1.value + curr2.value + remainder;
    curr1.value = sum % 10;
    remainder = Math.floor(sum / 10);
    prev1 = curr1;
    curr1 = curr1.next;
    curr2 = curr2.next;
  }

  if (curr2) {
    curr1 = curr2;
  }

  while (curr1) {
    sum = curr1.value + remainder;
    prev1.next = new Node(sum % 10);
    prev1 = prev1.next;
    remainder = Math.floor(sum / 10);
    curr1 = curr1.next;
  }

  if (remainder > 0) {
    prev1.next = new Node(remainder);
  }

  return list1.toArray();
};

console.log(sumLists([4, 4], [4, 8]), [8, 2, 1]);
console.log(sumLists([4, 5, 3], [8]), [2, 6, 3]);
console.log(sumLists([2, 9], [4, 9, 9, 9, 9, 9]), [6, 8, 0, 0, 0, 0, 1]);
console.log(sumLists([7, 1, 6], [5, 9, 2]), [2, 1, 9]);
console.log(sumLists([7, 1], [5, 9, 2]), [2, 1, 3]);
console.log(sumLists([7, 1, 6], [5, 9]), [2, 1, 7]);
console.log(
  sumLists([0], [9, 8, 7, 6, 5, 4, 3, 2, 1]),
  [9, 8, 7, 6, 5, 4, 3, 2, 1]
);
