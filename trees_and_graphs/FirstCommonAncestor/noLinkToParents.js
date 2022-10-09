/**
 * Finds first common ancestor of
 * two nodes in a Binary Tree
 *
 * assumes a node is not an ancestor of itself
 * and both nodes are part of the tree
 * 
 * N = |nodes|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {BinaryNode} node1
 * @param  {BinaryNode} node2
 * @param  {Tree} 
 * @return {BinaryNode} firstCommonAncestor
 *
 */

import { NoCommonAncestorError } from "../helpers/errors.js";
import { LinkedList } from "../../linked_lists/helpers/linkedList.js";
import { Tree, BinaryNode } from "../helpers/tree.js";
import { createMinimalTree } from "../MinimalTree/minimalTree.js";

const findNode = (node, current, direction) => {
  if (!current) return;
  if (node === current) {
    return new LinkedList();
  }

  const left = findNode(node, current.left, "left");
  const right = findNode(node, current.right, "right");

  if (left) {
    if (direction) left.prepend(direction);
    return left;
  }

  if (right) {
    if (direction) right.prepend(direction);
    return right;
  }

  return;
};

const findFirstCommonAncestor = (node1, node2, tree) => {
  const root = tree.root;
  if (node1 === root || node2 === root) throw new NoCommonAncestorError();
  // transverse through entire
  // tree till you find each node
  let firstCommonAncestor = root;
  const node1path = findNode(node1, root, null);
  const node2path = findNode(node2, root, null);

  let direction;

  while (
    node1path.head &&
    node2path.head &&
    node1path.head.value === node2path.head.value
  ) {
    direction = node1path.head.value;
    firstCommonAncestor =
      direction == "left"
        ? firstCommonAncestor.left
        : firstCommonAncestor.right;

    node1path.delete(direction);
    node2path.delete(direction);
  }

  return firstCommonAncestor;
};

const printResult = (node1, node2, tree) => {
  try {
    console.log(findFirstCommonAncestor(node1, node2, tree));
  } catch (e) {
    if (!(e instanceof NoCommonAncestorError)) throw e;

    console.error(e.message);
  }
};

let tree = new Tree();
tree.root = new BinaryNode(8);
tree.root.left = new BinaryNode(10);
tree.root.right = new BinaryNode(4);
tree.root.left.left = new BinaryNode(20);

tree.root.left.right = new BinaryNode(2);
let node1 = tree.root.left.right;
tree.root.left.right.right = new BinaryNode(6);
let node2 = tree.root.left.right.right;
printResult(node1, node2, tree);
tree = createMinimalTree([2, 4, 6, 8, 10, 20]);
console.log(tree)
node1 = tree.root.right.left;
node2 = tree.root.right.right;
printResult(node1, node2, tree);
