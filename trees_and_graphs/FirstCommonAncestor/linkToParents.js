/**
 * Finds first common ancestor of
 * two nodes in a Binary Tree
 *
 * assumes a node is not an ancestor of itself
 * and both nodes are part of the tree
 *
 * N = |nodes|
 * H = log(N) = |height|
 * Time: O(H)
 * Additional space: O(H)
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

const findFirstCommonAncestor = (node1, node2, tree) => {
  const root = tree.root;
  if (node1 === root || node2 === root) throw new NoCommonAncestorError();

  let firstCommonAncestor = root;
  const node1path = new LinkedList();
  const node2path = new LinkedList();

  let node = node1.parent;

  while (node != root) {
    node.parent.left === node
      ? node1path.prepend("left")
      : node1path.prepend("right");
    node = node.parent;
  }

  node = node2.parent;

  while (node != root) {
    node.parent.left === node
      ? node2path.prepend("left")
      : node2path.prepend("right");
    node = node.parent;
  }

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
tree.root.parent = null;
tree.root.left = new BinaryNode(10);
tree.root.left.parent = tree.root;
tree.root.right = new BinaryNode(4);
tree.root.right.parent = tree.root;
tree.root.left.left = new BinaryNode(20);
tree.root.left.left.parent = tree.root.left;
let node1 = tree.root.left.left;
tree.root.left.right = new BinaryNode(2);
tree.root.left.right.parent = tree.root.left;
tree.root.left.right.right = new BinaryNode(6);
tree.root.left.right.right.parent = tree.root.left.right;
let node2 = tree.root.left.right.right;
printResult(node1, node2, tree);


