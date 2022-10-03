/**
 * creates a linkedlist of all
 * nodes at each depth
 *
 * N = |tree|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array} int[] - array
 * @return {Map} - map of lists at each depth
 */

import { LinkedList } from "../../linked_lists/helpers/linkedList.js";
import { createMinimalTree } from "../MinimalTree/minimalTree.js";

const addToList = (node, depth, lists) => {
  if (!node) return;

  if (lists.has(depth)) {
    lists.get(depth).prepend(node.value);
  } else {
    const linkedList = new LinkedList();
    linkedList.prepend(node.value);
    lists.set(depth, linkedList);
  }

  depth++;
  addToList(node.left, depth, lists);
  addToList(node.right, depth, lists);
};
const getLists = (tree) => {
  if (!tree.root) return;
  let depth = 0;
  const lists = new Map();

  //any order transversal should do
  addToList(tree.root, depth, lists);
  console.log(lists);
  return lists;
};

const printResult = (arr) => {
  const tree = createMinimalTree(arr);
  for (let list of getLists(tree).values()) {
    console.log(list.toArray());
  }
};

printResult([2, 4, 6, 8, 10, 20]);
printResult([1, 2, 3, 4, 5]);
