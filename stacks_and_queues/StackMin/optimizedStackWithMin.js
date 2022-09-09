/**
 * Has an extra function min which
 * returns the minimum element
 *
 * Time: push O(1), pop O(1), min O(1)
 *
 * Additional space: worst case O(n)
 * best case O(1) because items are only
 * added to the min stack if they are less
 * than or equal to the current min
 *
 */

class StackNode {
  constructor(data) {
    this.data = data;
    this.previous = null;
  }
}

export class StackWithMin {
  constructor() {
    this.top = null;
    this.minimum = null;
  }

  pop() {
    if (!this.top) return;
    const item = this.top.data;
    this.top = this.top.previous;
    this.minimum.data === item ? (this.minimum = this.minimum.previous) : null;
    return item;
  }

  push(data) {
    const new_node = new StackNode(data);
    new_node.previous = this.top;
    this.top = new_node;

    if (!this.minimum || (this.minimum && data <= this.minimum.data)) {
      const new_min = new StackNode(data);
      new_min.previous = this.minimum;
      this.minimum = new_min;
    }
  }

  min() {
    return this.minimum ? this.minimum.data : null;
  }
}

const operate = (arr) => {
  const new_stack = new StackWithMin();
  for (let i = 0; i < arr.length; i++) {
    new_stack.push(arr[i]);
  }
  console.log(new_stack.min());
  console.log(new_stack.pop());
  console.log(new_stack.pop());
  return new_stack.min();
};

console.log(operate([5, 6, 3, 7]), 5);
console.log(operate([2, 4, 6, 8, 10, 12]), 2);
console.log(operate([12, 10, 8, 6, 4, 2]), 6);
