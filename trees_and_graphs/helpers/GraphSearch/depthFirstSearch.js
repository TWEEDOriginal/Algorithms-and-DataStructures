/**
 * Dfs if we want to vist every node
 * start at any node
 *
 * N = |vertices|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {node} Vertex - root node to search from
 * @return {set} - set containing all found nodes
 */

import { Stack } from "../../../stacks_and_queues/helpers/stack.js";
import { Graph, UNDIRECTED } from "../graph.js";

export const iterativeSearch = (root) => {
  if (!root) return;

  const visited = new Set();
  const visitList = new Stack();

  visitList.push(root);

  while (!visitList.isEmpty()) {
    const node = visitList.pop();

    if (node && !visited.has(node)) {
      visited.add(node);

      for (let adj of node.getAdjacents()) {
        visitList.push(adj);
      }
    }
  }
  return visited;
};

export const recursiveSearch = (root, visited) => {
  if (!root) return;

  visited.add(root);

  for (let adj of root.getAdjacents()) {
    if (adj && !visited.has(adj)) {
      recursiveSearch(adj, visited);
    }
  }
  return visited;
};

// const graph = new Graph(UNDIRECTED);

// const [root] = graph.addEdge(1, 2);
// graph.addEdge(1, 3);
// graph.addEdge(1, 4);
// graph.addEdge(5, 2);
// graph.addEdge(6, 3);
// graph.addEdge(7, 3);
// graph.addEdge(8, 4);
// graph.addEdge(9, 5);
// graph.addEdge(10, 6);

// let values = [];

// for (let node of iterativeSearch(root)) {
//   values.push(node.value);
// }
// console.log(values, [1, 4, 8, 3, 7, 6, 10, 2, 5, 9]);

// values = [];
// for (let node of recursiveSearch(root, new Set())) {
//   values.push(node.value);
// }
// console.log(values, [1, 2, 5, 9, 3, 6, 10, 7, 4, 8]);
