/**
 *
 * Prints all possible arrays that could
 * have created a binary search tree
 *
 * N = |tree|
 * Time: bruh
 * Additional space: bruhhhhhh
 *
 * @param  {Node}
 * @return {Array} any[][]
 *
 */

import { BinarySearchTree } from "../helpers/tree.js";

const weaveLists = (first, second, results, prefix) => {
  if (first.length == 0 || second.length == 0) {
    const result = prefix.slice();
    result.push(...first);
    result.push(...second);
    results.push(result);
    return;
  }

  const headFirst = first.shift();
  prefix.push(headFirst);
  weaveLists(first, second, results, prefix);
  prefix.pop();
  first.unshift(headFirst);

  const headSecond = second.shift();
  prefix.push(headSecond);
  weaveLists(first, second, results, prefix);
  prefix.pop();
  second.unshift(headSecond);
};

const findSequences = (node) => {
  const res = [];
  if (!node) {
    res.push([]);
    return res;
  }

  const prefix = [node.value];

  const leftSeq = findSequences(node.left);
  const rightSeq = findSequences(node.right);

  for (let arr_i of leftSeq) {
    for (let arr_j of rightSeq) {
      const weaved = [];
      weaveLists(arr_i, arr_j, weaved, prefix);
      res.push(...weaved);
    }
  }

  return res;
};

const printResult = (array) => {
  const tree = new BinarySearchTree();
  for (let item of array) {
    tree.insert(item);
  }

  console.log(findSequences(tree.root));
};
printResult([50, 20, 60, 10, 25, 70, 5, 15, 65, 80]);
printResult([2, 1, 3]);
