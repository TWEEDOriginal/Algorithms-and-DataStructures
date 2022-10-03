/**
 * converts a sorted array
 * to a binary search tree
 * with minimal height
 *
 * uses method similar to binary search
 *
 * N = |array|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array} int[] - sorted array
 * @return {Tree} - binary search tree
 */

import { BinaryNode, Tree, inOrderTransversal } from "../helpers/Tree.js";

const createNode = (arr, start, end) => {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const node = new BinaryNode(arr[mid]);

  node.left = createNode(arr, start, mid - 1);
  node.right = createNode(arr, mid + 1, end);

  return node;
};

export const createMinimalTree = (arr) => {
  if (arr.length <= 0) return;

  const minimalTree = new Tree();

  //ROOT is mid element
  minimalTree.root = createNode(arr, 0, arr.length - 1);

  return minimalTree;
};

// let res = convert([2, 4, 6, 8, 10, 20]);
// console.log(res);
// console.log(inOrderTransversal([], res.root));
// res = convert([1, 2, 3, 4, 5]);
// console.log(res);
// console.log(inOrderTransversal([], res.root));
