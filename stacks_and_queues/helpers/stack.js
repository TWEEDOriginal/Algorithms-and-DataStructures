// simple implementation of a stack

/*
Interface:
- pop()       -> Remove the top item from the stack : time Complexity O(1)
- push(value) -> Add an item to the top of the stack : time Complexity O(1)
- peek()      -> Return the top of the stack : time Complexity O(1)
- isEmpty()   -> Check if the stack is empty : time Complexity O(1)
- size()      -> Get the number of items in the stack : time Complexity O(n)
*/

import { EmptyStackException } from "./errors.js";

export class StackNode {
  constructor(data) {
    this.data = data;
    this.previous = null;
  }
}

export class Stack {
  constructor() {
    this.top = null;
  }

  pop() {
    if (!this.top) throw new EmptyStackException();
    const item = this.top.data;
    this.top = this.top.previous;
    return item;
  }

  push(data) {
    const new_node = new StackNode(data);
    new_node.previous = this.top;
    this.top = new_node;
  }

  peek() {
    if (!this.top) throw new EmptyStackException();
    return this.top.data;
  }

  isEmpty() {
    return this.top == null;
  }

  size() {
    let curr = this.top,
      count = 0;
    while (curr) {
      curr = curr.previous;
      count++;
    }
    return count
  }
}

// const newStack = new Stack();
// console.log(newStack);
// console.log(newStack.isEmpty());
// newStack.push(5);
// newStack.push(6);
// newStack.push(7);
// console.log(newStack.pop());
// console.log(newStack.peek());
// console.log(newStack.peek());
// console.log(newStack.isEmpty());
// console.log(newStack.size());