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
import { Tree, BinaryNode } from "../helpers/tree.js";
import { createMinimalTree } from "../MinimalTree/minimalTree.js";

const findSubNode = (node, current) => {
  if (!current) return false;

  if (node === current) {
    return true;
  }

  const left = findSubNode(node, current.left);
  const right = findSubNode(node, current.right);

  if (left || right) {
    return true;
  }

  return false;
};

const findNodes = (node1, node2, current) => {
  if (!current) return;

  if (node1 === current) {
    // check if node2 is a descendant of node1

    const foundLeft = findSubNode(node2, current.left);
    const foundRight = findSubNode(node2, current.right);

    if (foundLeft || foundRight) return { isAncestor: true };

    return { isAncestor: false };
  }
  if (node2 === current) {
    // check if node1 is a descendant of node2

    const foundLeft = findSubNode(node1, current.left);
    const foundRight = findSubNode(node1, current.right);

    if (foundLeft || foundRight) return { isAncestor: true };

    return { isAncestor: false };
  }

  const left = findNodes(node1, node2, current.left);
  const right = findNodes(node1, node2, current.right);
  if (left && right) {
    return { isAncestor: true, commonAncestor: current };
  } else if (left) {
    if (!left.commonAncestor && left.isAncestor) {
      left.commonAncestor = current;
    }
    return left;
  } else if (right) {
    if (!right.commonAncestor && right.isAncestor) {
      right.commonAncestor = current;
    }
    return right;
  }

  return;
};
const findFirstCommonAncestor = (node1, node2, tree) => {
  const root = tree.root;
  if (node1 === root || node2 === root) throw new NoCommonAncestorError();
  // transverse through entire
  // tree till you find each node
  let firstCommonAncestor = findNodes(node1, node2, root);

  return firstCommonAncestor.commonAncestor;
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
let node1 = tree.root.left.left;
tree.root.left.right.right = new BinaryNode(6);
let node2 = tree.root.left.right.right;
printResult(node1, node2, tree);
tree = createMinimalTree([2, 4, 6, 8, 10, 20]);
console.log(tree)
node1 = tree.root.left.right;
node2 = tree.root.right.right;
printResult(node1, node2, tree);
