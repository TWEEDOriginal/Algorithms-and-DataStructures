/**
 * finds shortest route between
 * nodes in a DIRECTED Graph
 * uses bfs
 *
 * N = |vertices|
 * d = |height|
 * Time: O(N^(d/2))
 * Additional space: O(N)
 *
 * @param  {Node} Start - start node
 * @param  {Node} End - end node
 * @return {array} - containing the path from start to End
 */

import { breadthFirstSearch } from "../helpers/GraphSearch/breadthFirstSearch.js";
import { Graph, Node } from "../helpers/graph.js";

const routeBetweenNodes = (start, end) => {
  return breadthFirstSearch(start, end).join("==>");
};

let graph = new Graph();

let [start] = graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(5, 2);
graph.addEdge(6, 3);
graph.addEdge(7, 3);
graph.addEdge(8, 4);
graph.addEdge(9, 5);
graph.addEdge(10, 6);
let end = graph.getVertex(4);
console.log(routeBetweenNodes(start, end), true);
graph = new Graph();
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "D");
graph.addEdge("D", "E");

console.log(
  routeBetweenNodes(graph.getVertex("A"), graph.getVertex("B")),
  true
);
console.log(
  routeBetweenNodes(graph.getVertex("A"), graph.getVertex("E")),
  true
);

console.log(
  routeBetweenNodes(graph.getVertex("D"), graph.getVertex("E")),
  true
);

console.log(
  routeBetweenNodes(graph.getVertex("B"), graph.getVertex("A")),
  false
);
