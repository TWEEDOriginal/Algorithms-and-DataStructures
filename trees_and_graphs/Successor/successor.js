/**
 *
 * finds the "next" node
 * of a given node in a
 * binary search tree
 *
 * in-order transversal
 * node.left -> node -> node.right
 *
 * h = |height|
 * Time: O(h)
 * Additional space: O(1)
 *
 * @param  {BinaryNode}
 * @return {BinaryNode} - successor
 *
 */

import { Tree, BinaryNode } from "../helpers/Tree.js";

const findSuccessor = (node) => {
  if (!node) return null;

  let newNode;

  if (node.right) {
    newNode = node.right;
    //  return leftMostNode
    while (newNode.left) {
      newNode = newNode.left;
    }

    return newNode;
  } else {
    let parent = node.parent;
    let newNode = node;

    //if node at parent's left return parent

    // if node at parent's right

    // go up while changing parents
    // till parent stops being at right

    // or return null if node is rightMost node
    while (parent && parent.left !== newNode) {
      newNode = parent;
      parent = parent.parent;
    }

    return parent;
  }
};

const reset_root = (root) => {
  root.parent = null;
  root.right = null;
  root.left = null;
};

const tree = new Tree();
tree.root = new BinaryNode(1);
const root = tree.root;

// when there's node.right
let node = root;
node.right = new BinaryNode(2);
console.log(findSuccessor(node), 2);
node.right.left = new BinaryNode(3);
console.log(findSuccessor(node), 3);

// when there's no node.right
// but node is left of parent
reset_root(root);
node = new BinaryNode(2);
root.left = node;
node.parent = root;
console.log(findSuccessor(node), 1);

// when there's no node.right but
// node is right of parent and
// parent is left of it's own parent
node.right = new BinaryNode(3);
node.right.parent = node;
node = node.right;
console.log("\n");
console.log(findSuccessor(node), 1);

//when node is right most element
reset_root(root);
node = root;
for (let i of [2, 3, 4]) {
  node.right = new BinaryNode(i);
  node.right.parent = node;
  node = node.right;
}
console.log(findSuccessor(node));
