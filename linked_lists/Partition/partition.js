import { LinkedList, Node } from "../helpers/linkedList.js";

const partition = (arr, x) => {
  let list = new LinkedList();
  list.arrayToLinkedList(arr);
  let curr = list.head;
  let prev = null;
  let big = new LinkedList();

  while (curr.value >= x) {
    big.append(curr.value);
    list.head = curr.next;
    curr = curr.next;
  }

  while (curr) {
    if (curr.value < x) {
      prev = curr;
      curr = curr.next;
      continue;
    }
    big.append(curr.value);
    prev.next = curr.next;
    curr = prev.next;
  }
  let big_curr = big.head;

  while (big_curr) {
    prev.next = new Node(big_curr.value);
    prev = prev.next;
    big.head = big_curr.next;
    big_curr = big.head;
  }

  return list.toArray();
};

console.log(partition([3, 5, 8, 5, 10, 2, 1], 5));
console.log(partition([5, 5, 8, 5, 10, 3, 2, 1], 5));
