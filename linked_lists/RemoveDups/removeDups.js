/**
 * removes duplicates from a linkedlist
 *
 * N = size of linkedlist
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array}  int[] - linkedlist items
 * @return {array}   int[] - deduplicated items
 */

 import { LinkedList} from "../helpers/linkedList.js";

const removeDuplicates = (arr) => {
  let list = new LinkedList();
  list.arrayToLinkedList(arr);
  const hMap = {};
  let curr = list.head;
  let prev = null;
  while (curr) {
    if (hMap[curr.value]) {
      prev.next = curr.next;
      curr = prev.next;
      continue;
    }
    hMap[curr.value] = true;
    prev = curr;
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
