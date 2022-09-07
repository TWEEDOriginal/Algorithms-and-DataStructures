/**
 * creates a circular linkedlist
 *
 * N = |arr|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array}   int[]
 * @param  {boolean} boolean - to be a circular linkedlist or not
 * @return {array}   int[] - linkedlist
 */

import { LinkedList } from "./linkedList.js";

export default function createLinkedLists(arr, beginning_index, circle) {
  let list = new LinkedList();
  let arr_length = arr.length;

  if (!circle || beginning_index >= arr_length || beginning_index < 0) {
    list.arrayToLinkedList(arr);
    return list;
  }

  list.arrayToLinkedList(arr.slice(0, beginning_index + 1));
  const beginning_node = list.getTail();

  list.arrayToLinkedList(arr.slice(beginning_index + 1, arr_length));
  const tail = list.getTail();
  tail.next = beginning_node;
  return list;
}

// createLinkedLists([1, 2, 3, 4, 5], 2, true);
// createLinkedLists([1, 2, 3, 4, 5], 2, false);
// createLinkedLists([1, 2, 3, 4, 5, 6, 7], 7, true);
