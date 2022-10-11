/**
 * 
 * compares two trees to see if
 * Tree2 is a subtree of Tree1
 *
 * N = |Tree1|
 * M = |Tree2|
 * K = number of occurences of Tree2 root in Tree1
 * Time: O(N + KM)
 * Additional space: O(log(N) + log(M))
 *
 * @param  {Tree} -Tree1
 * @param  {Tree} -Tree2
 * @return {Boolean}
 *
 */

import { BinarySearchTree } from "../helpers/tree.js";
import { createMinimalTree } from "../MinimalTree/minimalTree.js";

const compareNodes = (node1, node2) => {
  if (node1 && node2) {
    if (node1.value !== node2.value) return false;

    const leftComparison = compareNodes(node1.left, node2.left);
    if (!leftComparison) return false;

    const rightComparison = compareNodes(node1.right, node2.right);
    if (!rightComparison) return false;

    return true;
  } else if (!node1 && !node2) {
    return true;
  } else {
    return false;
  }
};

function checkSubtree(node1, node2) {
  if (node1) {
    if (node1.value === node2.value && compareNodes(node1, node2)) return true;

    return checkSubtree(node1.left, node2) || checkSubtree(node1.right, node2);
  }

  return false;
}

const contains = (tree1, tree2) => {
  if (!tree2.root) return true;

  return checkSubtree(tree1.root, tree2.root);
};

const printResult = (arr1, arr2, expected) => {
  if (arr1.length < arr2.length) return false;
  const tree1 = createMinimalTree(arr1);
  const tree2 =
    arr2.length > 0 ? createMinimalTree(arr2) : new BinarySearchTree();
  console.log(contains(tree1, tree2), expected);
};
printResult([1, 2, 3, 4, 5, 6], [], true);
printResult([1, 2, 3, 4, 5, 6], [4, 5, 6], true);
printResult([1, 2, 3, 4, 5, 6, 7], [4, 5, 6], false);
