import {
  Tree,
  BinaryNode,
  inOrderTransversal,
  preOrderTransversal,
} from "./tree.js";

// |log(n) === height|

class MinHeap extends Tree {
  constructor() {
    super();
    this.size = null;
  }

  insert(data) {
    const node = new BinaryNode(data);
    if (!this.root) {
      this.root = node;
      this.size = 1;
      return;
    }
    const positions = [];
    let dataPosition = this.size + 1;

    while (dataPosition != 1) {
      dataPosition % 2 === 0 ? positions.push("left") : positions.push("right");
      dataPosition = Math.floor(dataPosition / 2);
    }
    let curr = this.root,
      prev;
    let move;
    let temp;

    while (positions.length > 0) {
      if (curr.value > node.value) {
        temp = curr.value;
        curr.value = node.value;
        node.value = temp;
      }
      move = positions.pop();
      prev = curr;
      if (move === "left") {
        curr = curr.left;
        continue;
      }
      curr = curr.right;
    }
    move === "left" ? (prev.left = node) : (prev.right = node);

    this.size++;
  }

  extract_min() {
    let node;
    if (this.size <= 1) {
      node = this.root;
      this.root = null;

      return node;
    }
    const positions = [];
    let lastPosition = this.size;

    while (lastPosition != 1) {
      lastPosition % 2 === 0 ? positions.push("left") : positions.push("right");
      lastPosition = Math.floor(lastPosition / 2);
    }
    let curr = this.root,
      prev;
    let move;
    let temp;
    while (positions.length > 0) {
      move = positions.pop();
      prev = curr;
      move === "left" ? (curr = curr.left) : (curr = curr.right);
    }
    if (move === "left") {
      node = prev.left;
      prev.left = null;
    } else {
      node = prev.right;
      prev.right = null;
    }
    temp = this.root.value;
    this.root.value = node.value;
    node.value = temp;


    curr = this.root;
    let min;
    while (curr) {
      if (curr.left && curr.right) {
        min = Math.min(curr.left.value, curr.right.value);

        if (curr.value > min) {
          temp = curr.value;
          curr.value = min;

          if (min === curr.left.value) {
            curr.left.value = temp;
            curr = curr.left;

            continue;
          } else {
            curr.right.value = temp;
            curr = curr.right;

            continue;
          }
        } else {
          break;
        }
      } else if (curr.left && !curr.right) {
        if (curr.value > curr.left.value) {
          temp = curr.value;
          curr.value = curr.left.value;
          curr.left.value = temp;
        }
        break;
      } else {
        break;
      }
    }

    this.size--;
    return node;
  }
}

const tree = new MinHeap();
tree.insert(8);
tree.insert(10);
tree.insert(4);
tree.insert(20);
tree.insert(2);
tree.insert(6);
console.log(tree);
console.log(inOrderTransversal([], tree.root));
console.log(preOrderTransversal([], tree.root));
console.log(tree.extract_min());
console.log(tree);
console.log(inOrderTransversal([], tree.root));
console.log(preOrderTransversal([], tree.root));
