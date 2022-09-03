/**
 * check if a linkedlist is a palindrome
 *
 * N = |list|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array}  int[] - linkedlist items
 * @return {boolean}
 */

import { LinkedList } from "../helpers/linkedList.js";

const isPalindrome = (arr) => {
  let list = new LinkedList();
  list.arrayToLinkedList(arr);
  let newList = new LinkedList();
  let fast = list.head;
  let slow = list.head;
  while (fast && fast.next) {
    newList.prepend(slow.value);
    slow = slow.next;
    fast = fast.next.next;
  }

  // Has odd number of elements,
  // so skip the middle element*
  if (fast) slow = slow.next;

  let curr = newList.head;
  while (slow) {
    if (slow.value !== curr.value) return false;
    curr = curr.next;
    slow = slow.next;
  }
  return true;
};

console.log(isPalindrome(["r", "e", "f", "e", "r"]), true);
console.log(isPalindrome([1, 1]), true);
console.log(isPalindrome([2, 1, 3, 3, 1, 2]), true);
console.log(isPalindrome([2, 1, 3, 8, 9, 16, 16, 9, 8, 3, 1, 2]), true);
console.log(isPalindrome([2, 1, 3, 8, 9, 16, 11, 16, 9, 8, 3, 1, 2]), true);
console.log(isPalindrome(["r", "e", "f", "e", "r"]), true);
console.log(isPalindrome(["n", "o"]), false);
console.log(isPalindrome([2, 1, 3, 3, 2]), false);
console.log(isPalindrome([2, 1, 8, 9, 16, 16, 9, 8, 3, 1, 2]), false);
console.log(isPalindrome([2, 1, 3, 8, 9, 16, 11, 16, 9, 8, 3, 1]), false);