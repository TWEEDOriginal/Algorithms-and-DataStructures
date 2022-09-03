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

import { LinkedList } from "../helpers/linkedList.js";

let sum = 0,
  remainder = 0;
const sumListsForward = (curr1, curr2, new_list) => {
  if (!curr1 && !curr2) return 0;

  remainder = sumListsForward(
    curr1?.next || null,
    curr2?.next || null,
    new_list
  );
  console.log(remainder);
  sum = 0;
  sum += remainder;
  if (curr1) {
    sum += curr1.value;
    curr1 = curr1.next;
  }

  if (curr2) {
    sum += curr2.value;
    curr2 = curr2.next;
  }

  remainder = sum >= 10 ? 1 : 0;
  new_list.prepend(sum % 10);
  return remainder;
};

const padList = (list, padLen) => {
  for (let i = 0; i < padLen; i++) {
    list.prepend(0);
  }
  return list;
};

const sumLists = (arr1, arr2) => {
  let list1 = new LinkedList();
  list1.arrayToLinkedList(arr1);
  let list2 = new LinkedList();
  list2.arrayToLinkedList(arr2);

  // ideally create a helper function
  // to loop through the linked list
  let len1 = list1.size;
  let len2 = list2.size;
  if (len1 < len2) list1 = padList(list1, len2 - len1);
  else {
    list2 = padList(list2, len1 - len2);
  }
  const new_list = new LinkedList();

  remainder = sumListsForward(list1.head, list2.head, new_list);

  if (remainder > 0) new_list.prepend(remainder);
  return new_list.toArray();
};

console.log(sumLists([6, 1, 7], [2, 9, 5]), [9, 1, 2]);
console.log(sumLists([3, 5, 4], [8]), [3, 6, 2]);
console.log(sumLists([9, 2], [9, 9, 9, 9, 9, 4]), [1, 0, 0, 0, 0, 8, 6]);
console.log(sumLists([1, 7], [2, 9, 5]), [3, 1, 2]);
console.log(sumLists([6, 1, 7], [9, 5]), [7, 1, 2]);
console.log(
  sumLists([0], [1, 2, 3, 4, 5, 6, 7, 8, 9]),
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
);
