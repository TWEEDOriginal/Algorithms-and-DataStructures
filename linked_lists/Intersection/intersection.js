/**
 * check if two linkedlists intersect by memory reference
 *
 *
 * N = |list1|
 * M = |list2|
 * Time: O(N+M)
 * Additional space: O(1)
 *
 * @param  {array}   int[]
 * @param  {array}   int[]
 * @param  {boolean} int[] - to intersect or not
 * @return {array}   int[] - intersecting node
 */

import createLinkedLists from "../helpers/createIntersectingLists.js";

const skip = (list, diff) => {
  let node = list.head;
  while (diff > 0) {
    node = node.next;
    diff--;
  }
  return node;
};

const findIntersection = (arr1, arr2, intersect) => {
  let { list1, list2 } = createLinkedLists(arr1, arr2, intersect);

  // Get length of each linkedlist and tail
  let len1 = list1.size,
    len2 = list2.size;
  const tail1 = list1.getTail();
  const tail2 = list2.getTail();

  if (tail1 !== tail2) {
    return null;
  }

  // advance the pointer for the
  // larger list by difference in lengths
  let node1 = skip(list1, len1 - len2);
  let node2 = skip(list2, len2 - len1);

  //traverse both lists to find intersect
  while (node1 && node2) {
    if (node1 === node2) {
      const res = [];
      while (node1) {
        res.push(node1.value);
        node1 = node1.next;
      }
      return res;
    }
    node1 = node1.next;
    node2 = node2.next;
  }
  return null;
};

console.log(findIntersection([3, 1, 5, 9, 7, 2, 1], [4, 6, 7, 2, 1], true), [ 7, 2, 1 ]);
console.log(findIntersection([3, 1, 5, 9, 7, 2, 1], [4, 6, 7, 2, 1], false), null);
