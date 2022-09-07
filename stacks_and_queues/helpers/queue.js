// simple implementation of a queue

/*
Interface:
- add(item)  -> Add an item to the end of the queue : time Complexity O(1)
- remove()   -> Remove the first item in the queue : time Complexity O(1)
- peek()     -> Return the first item in the queue : time Complexity O(1)
- isEmpty()  -> Check if the queue is empty : time Complexity O(1)
- size()     -> Get the number of items in the stack  : time Complexity O(n)
*/

import { EmptyQueueException } from "./errors.js";

export class QueueNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  add(item) {
    const node = new QueueNode(item);
    if (this.last) this.last.next = node;

    this.last = node;

    if (!this.first) {
      this.first = this.last;
    }
  }

  remove() {
    if (!this.first) throw new EmptyQueueException();

    const data = this.first.data;
    this.first = this.first.next;

    if (!this.first) this.last = null;

    return data;
  }

  peek() {
    if (!this.first) throw new EmptyQueueException();

    return this.first.data;
  }

  isEmpty() {
    return this.first == null;
  }

  size() {
    let curr = this.first,
      count = 0;
    while (curr) {
      curr = curr.next;
      count++;
    }
    return count;
  }
}

// const newQueue = new Queue();
// console.log(newQueue);
// newQueue.add(8);
// newQueue.add(5);
// newQueue.add(2);
// console.log(newQueue, newQueue.size());
// console.log(newQueue.remove());
// console.log(newQueue.peek());
