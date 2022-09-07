/**
 * creates two new linkedlists with an intersecting node
 * if variable intersect is true
 *
 * N = |arr1|
 * M = |arr2|
 * Time: O(N+M)
 * Additional space: O(N+M)
 *
 * @param  {array}   int[]
 * @param  {array}   int[]
 * @param  {boolean} boolean - to intersect or not
 * @return {array}   int[] - linkedlist of sum digits
 */

import { LinkedList, Node } from "./linkedList.js";

const addRemainingNodes = (list, arr, subArrayLength) => {
  for (let i = arr.length - subArrayLength - 1; i >= 0; i--) {
    list.prepend(arr[i]);
  }
  return list;
};

const createSubArrayNode = (subArray) => {
  let node = new Node(subArray[0]);
  let curr;
  for (let i = 1; i < subArray.length; i++) {
    curr = new Node(subArray[i]);
    curr.next = node;
    node = curr;
  }
  return node;
};

const getSubArray = (arr1, arr2) => {
  const subArray = [];
  for (let i = arr1.length - 1, j = arr2.length - 1; i >= 0, j >= 0; i--, j--) {
    if (arr1[i] !== arr2[j]) break;
    subArray.push(arr1[i]);
  }
  return subArray;
};

export default function createLinkedLists(arr1, arr2, intersect) {
  // create a new array of all items that are similar
  const subArray = getSubArray(arr1, arr2);
  const subArrayLength = subArray.length;
  let list1, list2;
  if (!intersect || subArrayLength < 1) {
    list1 = new LinkedList();
    list1.arrayToLinkedList(arr1);
    list2 = new LinkedList();
    list2.arrayToLinkedList(arr2);
    return { list1, list2 };
  }

  const node = createSubArrayNode(subArray);
  list1 = new LinkedList();
  list2 = new LinkedList();
  list1.head = node;
  list1.size = subArrayLength;
  list2.head = node;
  list2.size = subArrayLength;
  list1 = addRemainingNodes(list1, arr1, subArrayLength);
  list2 = addRemainingNodes(list2, arr2, subArrayLength);
  return { list1, list2 };
}

// console.log(getSubArray([3, 1, 5, 9, 7, 2, 1], [4, 6, 7, 2, 1]));
// console.log(createSubArrayNode([1, 2, 7]));
// console.log(createLinkedLists([3, 1, 5, 9, 7, 2, 1], [4, 6, 7, 2, 1], true));
