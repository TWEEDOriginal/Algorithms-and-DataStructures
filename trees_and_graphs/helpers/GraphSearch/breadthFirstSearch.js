/**
 * bfs if we want to find shortest path
 * (or just any path) btw two nodes
 *
 * useful for DIRECTED or UNDIRECTED paths
 *
 * N = |vertices|
 * d = |height|
 * Time: O(N^d)
 * Additional space: O(N)
 *
 * @param  {Node} Vertex - root node to search from
 * @return {set} - set containing all found nodes
 */

import { Queue } from "../../../stacks_and_queues/helpers/queue.js";
// import { Graph, UNDIRECTED, Node } from "../graph.js";
import { LinkedList } from "../../../linked_lists/helpers/linkedList.js";

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

export const breadthFirstSearch = (start, end) => {
  if (!start || !end) return;
  let found;
  const path = new LinkedList();
  const visitList = new Queue();
  const childParent = new Map();
  childParent.set(start.value, null);
  visitList.add(start);
  let node;

  while (!visitList.isEmpty()) {
    node = visitList.remove();

    if (node === end) {
      found = node.value;
      break;
    }

    for (let adj of node.getAdjacents()) {
      if (adj && !childParent.has(adj.value)) {
        childParent.set(adj.value, node.value);
        visitList.add(adj);
      }
    }
  }
  while (found) {
    path.prepend(found);
    found = childParent.get(found);
  }
  return path.toArray();
};

// const graph = new Graph(UNDIRECTED);

// const [start] = graph.addEdge(1, 2);
// graph.addEdge(1, 3);
// graph.addEdge(1, 4);
// graph.addEdge(5, 2);
// graph.addEdge(6, 3);
// graph.addEdge(7, 3);
// graph.addEdge(8, 4);
// graph.addEdge(9, 5);
// graph.addEdge(10, 6);
// graph.addEdge(2, 11);
// const [end] = graph.addEdge(20, 11);
// let values = [];

// for (let node of search(start)) {
//   values.push(node.value);
// }
// console.log(values, [1, 2, 3, 4, 5, 11, 6, 7, 8, 9, 10]);

// console.log(breadthFirstSearch(start, end));
// console.log(breadthFirstSearch(start, new Node(10)));
