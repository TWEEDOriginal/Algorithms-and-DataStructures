/**
 * finds kth to last element of a singly linked list
 *
 * N = size of linkedlist
 * Time: O(N)
 * Additional space: O(1)
 *
 * @param  {array}  int[] - linkedlist items
 * @return {number}   - value of kth element from last
 */

import LinkedList from "../helpers/linkedList.js";

// don't use size property of LinkedList
const returnKthToLast = (arr, k) => {
  let list = new LinkedList();
  list.arrayToLinkedList(arr);

  // do iteratively
  // define two pointers , fast and slow pointer
  let fast = list.head;
  let slow = list.head;

  // Move fast pointer k steps in the linkedlist 
  // while slow remains at head
  for (let i = 0; i < k; i++) {
    if (fast === null) return null; //k is larger than length of linked list
    fast = fast.next;
  }
  // move both pointers at the same time,
  // slow pointer will exit at kth node from the end
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow.value;
};
console.log(returnKthToLast([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6));
console.log(returnKthToLast([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2));
console.log(returnKthToLast([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));
console.log(
  returnKthToLast(
    [8, 8, 9, 9, 9, 6, 6, 4, 4, 6, 6, 4, 4, 6, 9, 4, 8, 2, 3, 1],
    8
  )
);
console.log(
  returnKthToLast(
    [8, 8, 9, 9, 9, 6, 6, 4, 4, 6, 6, 4, 4, 6, 9, 4, 8, 2, 3, 1],
    3
  )
);
console.log(returnKthToLast([8, 5, 1], 4));
