/**
 * 
 * an algorithm to count the number of paths 
 * in a tree that sum to a given value. 
 * 
 * N = |tree|
 * H = log(N) = |height|
 * Time: O(NH) - assuming a balanced tree,
 *               worst case O(N^2)
 * Additional space: O(H) - assuming a balanced 
 *                          tree, worst case O(N)
 * 
 * @param  {Tree} 
 * @param  {Number} int - target number
 * @return {Number} - number of paths
 *
 */

import { Tree, BinaryNode } from "../helpers/tree.js";

const numberOfPaths = (node, target, sums) => {
  let count = 0;
  if (!node) return count;

  for (let i = 0; i < sums.length; i++) {
    sums[i] = sums[i] + node.value;

    if (sums[i] == target) {
      count++;
    }
  }

  sums.push(0);
  const rightSums = sums.slice();

  count += numberOfPaths(node.left, target, sums);
  count += numberOfPaths(node.right, target, rightSums);

  return count;
};

const getPaths = (tree, target) => {
  return numberOfPaths(tree.root, target, [0]);
};

let tree = new Tree();
tree.root = new BinaryNode(5);
tree.root.left = new BinaryNode(-5);
tree.root.right = new BinaryNode(5);
tree.root.left.left = new BinaryNode(5);
tree.root.left.right = new BinaryNode(5);
tree.root.right.left = new BinaryNode(-5);
tree.root.right.right = new BinaryNode(-5);
console.log(getPaths(tree, 5));
