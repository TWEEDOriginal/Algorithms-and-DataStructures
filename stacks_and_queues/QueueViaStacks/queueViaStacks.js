/**
 * Implements a queue using two stacks
 *
 * N = |MyQueue|
 * Time: add O(1), remove and peek worst case O(N); 
 * best case O(1); Amortized time O(1)
 * 
 * Additional space: O(N) 
 */

import { Stack } from "../helpers/stack.js";
import { EmptyQueueException } from "../helpers/errors.js";

class MyQueue {
  constructor() {
    this.firstItems = new Stack();
    this.lastItems = new Stack();
  }

  size() {
    return this.firstItems.size() + this.lastItems.size();
  }

  add(item) {
    this.lastItems.push(item);
  }

  peek() {
    this.shiftStacks();
    if (this.isQueueEmpty()) throw new EmptyQueueException();

    return this.firstItems.peek();
  }

  remove() {
    this.shiftStacks();
    if (this.isQueueEmpty()) throw new EmptyQueueException();

    return this.firstItems.pop();
  }

  // ensure this.firstItems has
  // the first items in the queue
  shiftStacks() {
    if (!this.firstItems.isEmpty()) return;

    while (!this.lastItems.isEmpty()) {
      this.firstItems.push(this.lastItems.pop());
    }
  }

  isQueueEmpty() {
    return this.firstItems.isEmpty() && this.lastItems.isEmpty();
  }
}

const buyTickets = new MyQueue();
console.log(buyTickets);
for (let i = 0; i < 15; i++) {
    buyTickets.add(i + 1);
}
console.log(buyTickets);
console.log(buyTickets.peek(), 1);
console.log(buyTickets.remove(), 1);
console.log(buyTickets.remove(), 2);
console.log(buyTickets.remove(), 3);
console.log(buyTickets.remove(), 4);
console.log(buyTickets.remove(), 5);
console.log(buyTickets);
console.log(buyTickets.add(16));
console.log(buyTickets);