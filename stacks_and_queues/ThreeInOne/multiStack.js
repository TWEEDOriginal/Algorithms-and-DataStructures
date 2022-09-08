import {
  EmptyStackException,
  InvalidStackException,
} from "../helpers/errors.js";

export default class MultiStack {
  constructor(numberOfStacks, stackSize) {
    this.numberOfStacks = numberOfStacks;

    this.values = [];
    //maximum size of each stack
    this.stackCapacity = stackSize;

    //current size of each stack
    this.sizes = [];
    for (let i = 0; i < numberOfStacks; i++) {
      this.sizes[i] = 0;
    }
  }

  pop(stackNum) {
    this.checkStackExists(stackNum);
    if (this.isEmpty(stackNum)) throw new EmptyStackException();

    const topIndex = this.indexOfTop(stackNum);

    const value = this.values[topIndex];
    this.values[topIndex] = 0; // clear
    this.sizes[stackNum]--; // shrink
    return value;
  }

  peek(stackNum) {
    this.checkStackExists(stackNum);
    if (this.isEmpty(stackNum)) throw new EmptyStackException();

    return this.values[this.indexOfTop(stackNum)];
  }

  checkStackExists(stackNum) {
    if (stackNum >= this.numberOfStacks) throw new InvalidStackException();
  }

  isEmpty(stackNum) {
    return this.sizes[stackNum] === 0;
  }
}
