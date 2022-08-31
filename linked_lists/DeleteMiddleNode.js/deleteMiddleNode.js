/**
 * Deletes any node in the middle of a singly linked list
 * Any node but the first and last node
 * not given access to the head just the node to be deleted
 *
 * N = size of linkedlist
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {node} Node - node to be deleted
 * @return {boolean}
 */

import LinkedList from "../helpers/linkedList.js";

const deleteMiddleNode = (node) => {
    
  if (node && node?.next) {
    node.value = node.next.value;
    node.next = node.next.next;
    return true; // successfully deleted
  }
  console.log("Node cannot be tail");
  return false; // failure
};
const deleteMiddleNode_ = (arr, index) => {
  let new_list = new LinkedList();
  new_list.arrayToLinkedList(arr);
  if (index === 1) {
    console.log("Node cannot be head");
    return false;
  }

  let node = new_list.head;
  for (let i = 2; i <= index; i++) {
    node = node.next;
    if (!node) {
      console.log("Index cannot be larger than length of linkedlist");
      return false;
    }
   
  }
  console.log(node);
  const res = deleteMiddleNode(node);
  console.log(new_list.toArray());
  return res;
};

console.log(deleteMiddleNode_([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)); // delete 3rd item
console.log(deleteMiddleNode_([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10));
console.log(deleteMiddleNode_([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11));
