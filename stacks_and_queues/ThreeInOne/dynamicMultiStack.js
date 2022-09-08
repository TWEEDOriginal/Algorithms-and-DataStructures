/**
 * Implements x stacks using a single array
 * and allows each individual stack to grow infinitely
 *
 *
 * Time: push O(1), pop O(1), peek O(1), isEmpty O(1)
 * Additional space: push O(1), pop O(1), peek O(1)
 *
 */

import MultiStack from "./multiStack.js";
import { EmptyStackException } from "../helpers/errors.js";

class DynamicMultiStack extends MultiStack {
  constructor(numberOfStacks, stackSize) {
    super(numberOfStacks, stackSize);
  }

  push(value, stackNum) {
    this.checkStackExists(stackNum);
    this.sizes[stackNum]++;
    this.values[this.indexOfTop(stackNum)] = value;
  }

  indexOfTop(stackNum) {
    return stackNum + this.numberOfStacks * (this.sizes[stackNum] - 1);
  }
}

const new_Stack = new DynamicMultiStack(3, 10);
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
console.log(new_Stack.peek(0));
try {
  new_Stack.pop(1);
} catch (e) {
  console.log(e instanceof EmptyStackException, true);
}
