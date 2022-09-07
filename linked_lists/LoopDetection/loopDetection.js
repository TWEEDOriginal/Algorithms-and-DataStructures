/**
 * Returns the node at the beginning
 * of a loop in a circular linked list
 *
 * N = |arr|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array}   any[]
 * @param  {boolean} boolean - to be a circular linkedlist or not
 * @return {Node} - node at the beginning of loop
 */

import createLinkedList from "../helpers/createCircularList.js";

const findBeginning = (arr, beginning_index, circle) => {
  const list = createLinkedList(arr, beginning_index, circle);
  let slow = list.head,
    fast = list.head;
  
  // Find meeting point. This will be LOOP_SIZE - k 
  // steps into the linked list.
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
     
    // collision spot
    if (slow === fast) {
      break;
    }
  }

  // not a circular linked list
  if (!fast || !fast.next || slow !== fast) {
    return null;
  }

  //Move slow to Head. Keep fast at Meeting Point. 
  // Each are k steps from the Loop Start.
  slow = list.head;

  // If they move at the same pace, 
  // they must meet at Loop Start 
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return fast;
};

console.log(findBeginning([1, 2, 3, 4, 5], 2, true));
console.log(findBeginning([1, 2, 3, 4, 5], 2, false));
console.log(findBeginning([1, 2, 3, 4, 5, 6], 0, true));
console.log(findBeginning([], 0, true));
console.log(findBeginning([1, 2, 3, 4, 5, 6], 5, true));
