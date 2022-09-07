// simple implementation of a stack

/*
Interface:
- pop()
- push(value)
- peek()
- isEmpty()
- size()
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
    const item = top.data;
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
// console.log(newStack);
// console.log(newStack.peek());
// console.log(newStack.isEmpty());
// console.log(newStack.size());