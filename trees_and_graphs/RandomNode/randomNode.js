/**
 * 
 * method getRandomNode() which
 * returns a random node from a tree
 *
 * N = |Tree|
 * H = |Height| = log(N)
 * Time: O(H)
 * Additional space: O(1)
 *
 * @return {Node}
 *
 */

import { BinaryNode, Tree } from "../helpers/tree.js";

class BinaryTreeNode extends BinaryNode {
  constructor(value) {
    super(value);
    this.size = 0;
  }
}
class BinaryTree extends Tree {
  constructor() {
    super();
  }

  getRandomNode() {
    let curr = this.root;
    let leftSize;
    let rand = Math.floor(Math.random() * curr.size);

    while (curr) {
      leftSize = curr.left ? curr.left.size : 0;

      if (rand < leftSize) {
        curr = curr.left;
      } else if (rand == leftSize) {
        return curr;
      } else {
        rand = rand - (leftSize + 1);
        curr = curr.right;
      }
    }
    return null;
  }

  bstInsert(data) {
    const node = new BinaryTreeNode(data);
    node.size++;

    if (!this.root) {
      this.root = node;
      return this.root;
    }

    let curr = this.root,
      prev;

    while (curr) {
      curr.size++;
      prev = curr;

      if (data <= curr.value) {
        curr = curr.left;
        continue;
      }
      curr = curr.right;
    }

    if (data <= prev.value) {
      prev.left = node;
      return prev.left;
    }
    prev.right = node;
    return prev.right;
  }

  bstFind(data) {
    if (!this.root) {
      return;
    }
    let curr = this.root;
    while (curr) {
      if (curr.value === data) {
        return curr;
      } else if (data < curr.value) {
        curr = curr.left;
        continue;
      }
      curr = curr.right;
    }
    return;
  }

  recursiveDelete(node, data) {
    let found, temp, size;
    if (!node) {
      return [null, false, 0];
    }
    if (node.value === data) {
      return [null, true, node.size];
    } else if (data < node.value) {
      [temp, found, size] = this.recursiveDelete(node.left, data);
      node.left = temp;
    } else {
      [temp, found, size] = this.recursiveDelete(node.right, data);
      node.right = temp;
    }

    if (found) {
      node.size -= size;
    }

    return [node, found, size];
  }

  bstDelete(data) {
    const [node, found, size] = this.recursiveDelete(this.root, data);
    this.root = node;
  }
}
let tree = new BinaryTree();
let arr = [8, 10, 4, 20, 2, 6];
for (let item of arr) {
  tree.bstInsert(item);
}
console.log(tree.getRandomNode());
console.log(tree);
console.log(tree.bstFind(20))
tree.bstDelete(6);
console.log(tree);
