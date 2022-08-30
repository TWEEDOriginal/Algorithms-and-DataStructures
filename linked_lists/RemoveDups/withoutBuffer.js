/**
 * removes duplicates from a linkedlist
 *
 * N = |linkedlist|
 * Time: O(N^2)
 * Additional space: O(1)
 *
 * @param  {array}  int[] - linkedlist items
 * @return {array}   int[] - deduplicated items
 */

import LinkedList from "../helpers/linkedList.js";

const removeDuplicates = (arr) => {
  let list = new LinkedList();
  const new_array = list.arrayToLinkedList(arr);

  if (!new_array) return arr;

  let curr = list.head;

  while (curr) {
    let prev = curr;
    let next_ = prev.next;

    while (next_) {
      if (next_.value === curr.value) {
        prev.next = next_.next;
        next_ = next_.next;
        continue;
      }
      prev = next_;
      next_ = next_.next;
    }
    curr = curr.next;
  }
  return list.toArray();
};

console.log(removeDuplicates([1, 5, 1, 6, 8, 6, 8, 8, 8, 8]), [1, 5, 6, 8]);
console.log(
  removeDuplicates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
);
console.log(
  removeDuplicates([
    8, 8, 9, 9, 9, 6, 6, 4, 4, 6, 6, 4, 4, 6, 9, 4, 8, 2, 3, 1,
  ]),
  [8, 9, 6, 4, 2, 3, 1]
);
