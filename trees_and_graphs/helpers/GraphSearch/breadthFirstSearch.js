/**
 * bfs if we want to find shortest path
 * (or just any path) btw two nodes
 *
 * N = |vertices|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {node} Vertex - root node to search from
 * @return {set} - set containing all found nodes
 */

import { Queue } from "../../../stacks_and_queues/helpers/queue.js";
import { Graph, UNDIRECTED } from "../graph.js";

export const search = (root) => {
  if (!root) return;

  const visited = new Set();
  const visitList = new Queue();
  visitList.add(root);
  let node;

  while (!visitList.isEmpty()) {
    node = visitList.remove();

    visited.add(node);
    for (let adj of node.getAdjacents()) {
      if (adj && !visited.has(adj)) {
        visitList.add(adj);
      }
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

// for (let node of search(root)) {
//   values.push(node.value);
// }
// console.log(values, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
