/**
 *
 * an algorithm to count the number of paths
 * in a tree that sum to a given value.
 *
 *
 * N = |tree|
 * H = log(N) = |height|
 * Time: O(N)
 * Additional space: O(H) - assuming a balanced
 *                          tree, worst case O(N)
 *
 * @param  {Tree}
 * @param  {Number} int - target number
 * @return {Number} - number of paths
 *
 */

import { Tree, BinaryNode } from "../helpers/tree.js";


const numberOfPaths = (node, target, runningSum, map) => {
  let count = 0;
  if (!node) return count;

  runningSum += node.value;
  count += (map.get(runningSum - target) ?? 0);
  if (runningSum == target) count++;
  
  map.set(runningSum, (map.get(runningSum) ?? 0) + 1);
  

  count += numberOfPaths(node.left, target, runningSum, map);
  count += numberOfPaths(node.right, target, runningSum, map);
  //decrement runningSum value by 1 
  map.set(runningSum, map.get(runningSum) - 1);
  return count;
};

const getPaths = (tree, target) => {
  return numberOfPaths(tree.root, target, 0, new Map());
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
