/**
 * Has an extra function min which
 * returns the minimum element
 *
 * Time: push O(1), pop O(1), min O(1)
 *
 * Additional space: O(n) because each
 * node references the min beneath it
 *
 */

class NodeWithMin {
  constructor(data, min) {
    this.data = data;
    this.previous = null;
    this.min = min;
  }
}

export class StackWithMin {
  constructor() {
    this.top = null;
  }

  pop() {
    if (!this.top) return;
    const item = this.top.data;
    this.top = this.top.previous;
    return item;
  }

  push(data) {
    const min = this.top && this.top.min < data ? this.top.min : data;
    const new_node = new NodeWithMin(data, min);
    new_node.previous = this.top;
    this.top = new_node;
  }

  min() {
    return this.top ? this.top.min : null;
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
