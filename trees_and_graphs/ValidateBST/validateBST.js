/**
 *
 * checks if a binary tree
 * is a binary search tree.
 *
 * N = |tree|
 * Time: O(N)
 * Additional space: O(logN) on a
 *                   balanced tree
 *
 * @param  {Tree}
 * @return {Boolean}
 *
 */
import { createMinimalTree } from "../MinimalTree/minimalTree.js";

const validateNode = (node, min, max) => {
  if (node == null) {
    return true;
  }

  if ((max && node.value > max) || (min && node.value <= min)) {
    return false;
  }

  const isLeftValid = validateNode(node.left, min, node.value);
  const isRightValid = validateNode(node.right, node.value, max);

  if (!isLeftValid || !isRightValid) {
    return false;
  }
  return true;
};

const validateBST = (tree) => {
  if (!tree.root) return true;

  return validateNode(tree.root, null, null);
};

const printResult = (arr, expected) => {
  console.log(validateBST(createMinimalTree(arr)), expected);
};
printResult([2, 4, 6, 8, 10, 20], true);
printResult([1, 2, 3, 4, 5], true);
printResult([6, 2, 3, 4, 5], false);
printResult([1, 2, 3, 0, 5], false);
