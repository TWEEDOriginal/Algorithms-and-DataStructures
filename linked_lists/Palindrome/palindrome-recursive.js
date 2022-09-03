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

let res, curr1;

// default res is true
// if res becomes false then automatically return false

const checkPalindrome = (curr2) => {
  if (!curr2) return true;
  res = checkPalindrome(curr2.next);
  if (!res) return false;

  if (curr1.value !== curr2.value) res = false;
  curr1 = curr1.next;
  return res;
};

const isPalindrome = (arr) => {
  let list = new LinkedList();
  list.arrayToLinkedList(arr);
  curr1 = list.head;
  return checkPalindrome(list.head);
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
