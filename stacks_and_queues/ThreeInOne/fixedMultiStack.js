/**
 * Implements x stacks using a single array
 * By dividing the array in x equal
 * parts and allowing each individual stack
 * to grow in that limited space.
 *
 * Time: push O(1), pop O(1), peek O(1), isEmpty O(1)
 * Additional space: push O(1), pop O(1), peek O(1)
 *
 */

import { FullStackException, EmptyStackException } from "../helpers/errors.js";
import MultiStack from "./multiStack.js";

class FixedMultiStack extends MultiStack {
  constructor(numberOfStacks, stackSize) {
    super(numberOfStacks, stackSize);
  }

  push(value, stackNum) {
    this.checkStackExists(stackNum);
    if (this.isFull(stackNum)) throw new FullStackException();
    this.sizes[stackNum]++;
    this.values[this.indexOfTop(stackNum)] = value;
  }

  isFull(stackNum) {
    return this.sizes[stackNum] === this.stackCapacity;
  }

  indexOfTop(stackNum) {
    return stackNum * this.stackCapacity + this.sizes[stackNum] - 1;
  }
}

const new_Stack = new FixedMultiStack(3, 10);
console.log(new_Stack);

for (let i = 0; i < 6; i++) {
  new_Stack.push(i + 1, 0);
}
console.log(new_Stack);

for (let i = 0; i < 4; i++) {
  new_Stack.push(i + 1, 2);
}
console.log(new_Stack);
console.log(new_Stack.pop(2));
console.log(new_Stack);
let size = new_Stack.sizes[0];
for (let i = 0; i < 4; i++) {
  new_Stack.push(i + 1 + size, 0);
}
console.log(new_Stack);

try {
  new_Stack.push(11, 0);
} catch (e) {
  console.log(e instanceof FullStackException, true);
}

try {
  new_Stack.pop(1);
} catch (e) {
  console.log(e instanceof EmptyStackException, true);
}
