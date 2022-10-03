/**
 * checks if the heights of two
 * subtrees of any node never differ
 * by more than one
 *
 * N = |tree|
 * H = |height|
 * Time: O(N)
 * Additional space: O(H)
 *
 * @param  {Tree}
 * @return {Boolean}
 *
 */

import { BinarySearchTree } from "../helpers/tree.js";

const getHeightAndDiff = (node) => {
  if (node == null) {
    return [-1, 0];
  }

  const [leftHeight, leftDifference] = getHeightAndDiff(node.left);
  const [rightHeight, rightDifference] = getHeightAndDiff(node.right);

  const nodeHeight = 1 + Math.max(leftHeight, rightHeight);
  const nodeDifference = Math.abs(leftHeight - rightHeight);

  return [
    nodeHeight,
    Math.max(leftDifference, rightDifference, nodeDifference),
  ];
};

const checkBalanced = (tree) => {
  if (!tree.root) return true;

  const [height, difference] = getHeightAndDiff(tree.root);
  console.log(height, difference);

  return difference <= 1;
};

const printResult = (arr, expected) => {
  const tree = new BinarySearchTree();

  for (let i = 0; i < arr.length; i++) {
    tree.insert(arr[i]);
  }

  console.log(checkBalanced(tree), expected);
};

printResult([8, 10, 4, 20, 2, 6], true);
printResult([10, 11, 12, 13, 9, 8, 7], false);
printResult([8, 4, 12, 10, 9, 8], false);
