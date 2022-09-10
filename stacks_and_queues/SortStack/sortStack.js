/**
 * sort a stack such that smallest items are on top
 *
 * N = |Stack|
 * Time: O(N^2)
 * Additional space: O(N)
 *
 */

import { Stack, StackNode } from "../helpers/stack.js";

const sortStack = (stack) => {
  if (stack.isEmpty()) return;

  const tempStack = new Stack();
  tempStack.push(stack.pop());

  let newItem, curr, next, newNode;

  while (!stack.isEmpty()) {
    newItem = stack.pop();
    curr = tempStack.top;

    if (newItem <= curr.data) {
      tempStack.push(newItem);
      continue;
    }

    while (curr && newItem > curr.data) {
      next = curr;
      curr = curr.previous;
    }

    newNode = new StackNode(newItem);
    newNode.previous = curr;
    next.previous = newNode;
  }

  return tempStack;
};

const convertToArray = (stack) => {
  const arr = [];
  while (!stack.isEmpty()) {
    arr.push(stack.pop());
  }
  return arr;
};

const populateStack = (arr) => {
  const stack = new Stack();
  for (let i = 0; i < arr.length; i++) {
    stack.push(arr[i]);
  }
  return stack;
};

const operate = (arr) => {
  return convertToArray(sortStack(populateStack(arr)));
};

// 5 is original top of stack
console.log(operate([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
//1 is top
console.log(operate([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
//scattered
console.log(operate([4, 5, 1, 2, 3]), [1, 2, 3, 4, 5]);
console.log(
  operate([100, 15, 20, 30, 10, 80, 50, 45, 75, 35, 85, 55, 40, 99]),
  [10, 15, 20, 30, 35, 40, 45, 50, 55, 75, 80, 85, 99, 100]
);
