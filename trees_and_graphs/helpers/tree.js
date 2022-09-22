// implementation of the BinarySearchTree
/*
ADT:
# Main operations
insert(data)         -> Add a node to the left if <= current node
                        or to the right if > current node
                        : time Complexity O(log(n))
                        n = 2^h - 1 where h is tree height
*/

export class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

export class Tree {
  constructor() {
    this.root = null;
  }
}

export class BinaryNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree extends Tree {
  constructor() {
    super();
  }

  insert(data) {
    const node = new BinaryNode(data);
    if (!this.root) {
      this.root = node;
      return;
    }
    let curr = this.root,
      prev;
    while (curr) {
      prev = curr;
      if (data <= curr.value) {
        curr = curr.left;
        continue;
      }
      curr = curr.right;
    }

    if (data <= prev.value) {
      prev.left = node;
      return;
    }
    prev.right = node;
  }
}

export function inOrderTransversal(nodes, node) {
  if (node) {
    inOrderTransversal(nodes, node.left);
    nodes.push(node.value);
    inOrderTransversal(nodes, node.right);
  }
  return nodes;
}

export function preOrderTransversal(nodes, node) {
  if (node) {
    nodes.push(node.value);
    preOrderTransversal(nodes, node.left);
    preOrderTransversal(nodes, node.right);
  }
  return nodes;
}

export function postOrderTransversal(nodes, node) {
  if (node) {
    postOrderTransversal(nodes, node.left);
    postOrderTransversal(nodes, node.right);
    nodes.push(node.value);
  }
  return nodes;
}

// const tree = new BinarySearchTree();
// tree.insert(8);
// tree.insert(10);
// tree.insert(4);
// tree.insert(20);
// tree.insert(2);
// tree.insert(6);
// console.log(inOrderTransversal([], tree.root));
// console.log("\n");
// console.log(preOrderTransversal([], tree.root));
// console.log("\n");
// console.log(postOrderTransversal([], tree.root));
