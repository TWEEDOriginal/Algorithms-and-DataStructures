/**
 * A data structure composed of several
 * stacks and creates a new stack once
 * the previous one exceeds capacity
 *
 *
 * Time: push O(1), pop O(1), popAt O(1)
 * Additional space: push O(1), pop O(1),
 * popAt O(1)
 *
 */

import { StackWithSize } from "../helpers/stack.js";
import {
  EmptySetOfStacksException,
  InvalidStackException,
  EmptyStackException,
} from "../helpers/errors.js";

class SetOfStacks {
  constructor(stackCapacity) {
    this.stackCapacity = stackCapacity;
    this.currentStack = 0;
    this.stacks = [];
    this.stacks[0] = new StackWithSize();
  }

  push(data) {
    const last = this.stacks[this.currentStack];
    last.append(data);

    if (last.stackSize === this.stackCapacity) {
      this.currentStack++;
      this.stacks[this.currentStack] = new StackWithSize();
    }
  }

  pop() {
    if (this.isCompletelyEmpty()) throw new EmptySetOfStacksException();
    let last = this.stacks[this.currentStack];
    while (last.isEmpty()) {
      if (this.currentStack === 0) {
        throw new EmptySetOfStacksException();
      }

      this.currentStack--;
      last = this.stacks[this.currentStack];
    }

    const data = last.remove();
    return data;
  }

  popAt(index) {
    if (this.isStackEmpty(index)) throw new EmptyStackException();

    const data = this.stacks[index].remove();
    return data;
  }

  isStackEmpty(index) {
    if (this.currentStack < index) {
      throw new InvalidStackException();
    }

    return this.stacks[index].isEmpty();
  }

  isCompletelyEmpty() {
    return this.currentStack === 0 && this.stacks[this.currentStack].isEmpty();
  }
}

const plates = new SetOfStacks(5);
console.log(plates);
for (let i = 0; i < 15; i++) {
  plates.push(i + 1);
}
console.log(plates);
console.log(plates.pop());
console.log(plates);
plates.push(4);
console.log(plates);
console.log(plates.stacks[2]);
console.log(plates.popAt(0));
console.log(plates);
