/**
 * finds kth to last element of a singly linked list
 *
 * N = size of linkedlist
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array}  int[] - linkedlist items
 * @return {number}   - value of kth element from last
 */

import LinkedList from "../helpers/linkedList.js";

let res, node;

class Index {
  constructor() {
    this.value = 0;
  }
}

const recursivelyFindKthToLast = (head, k, idx) => {
  if (head === null) return null;
  node = recursivelyFindKthToLast(head.next, k, idx);
  idx.value = idx.value + 1;

  if (idx.value === k) {
    return head;
  }

  return node;
};

const returnKthToLast = (arr, k) => {
  let new_list = new LinkedList();
  new_list.arrayToLinkedList(arr);
  let idx = new Index();
  res = recursivelyFindKthToLast(new_list.head, k, idx);
  return res?.value || res;
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
