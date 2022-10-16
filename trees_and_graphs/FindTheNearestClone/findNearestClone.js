/**
 *
 * Given a color, the algorithm finds
 * the shortest path connecting any
 * two nodes of that color.
 *
 *
 * N = |colors|
 * M = |Edges|
 * Time: O(N+M)
 * Additional space: O(N)
 *
 * @param  {Number} - number of colors
 * @param  {Array}
 * @param  {Array}
 * @param  {Numbers} - color ids
 * @return {set} - set containing all found nodes
 *
 */

import { Graph, UNDIRECTED } from "../helpers/graph.js";
import { Queue } from "../../stacks_and_queues/helpers/queue.js";

const bfs = (graph, color, ids, val) => {
  let start = graph.getVertex(color);
  let pathlength = -1;
  const queue = new Queue();
  const childParent = new Map();
  childParent.set(color, null);
  queue.add(start);
  let node, found;

  while (!queue.isEmpty()) {
    node = queue.remove();
    if (node.value !== color && ids[node.value - 1] === val) {
      found = node.value;
      break;
    }
    for (let adj of node.getAdjacents()) {
      if (adj && !childParent.has(adj.value)) {
        childParent.set(adj.value, node.value);
        queue.add(adj);
      }
    }
  }

  while (found) {
    pathlength++;
    found = childParent.get(found);
  }
  return pathlength;
};

function findShortest(graphNodes, graphFrom, graphTo, ids, val) {
  const graph = new Graph(UNDIRECTED);
  let color1, color2;
  for (let i = 0; i < graphFrom.length; i++) {
    color1 = graphFrom[i];
    color2 = graphTo[i];
    graph.addEdge(color1, color2);
  }

  let color;
  if (ids[val - 1] !== val) {
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] === val) {
        color = i + 1;
        break;
      }
    }
  } else if (ids[val - 1] === val) {
    color = val;
  }
  if (!color || !graph.nodes.has(color)) {
    return -1;
  }
  return bfs(graph, color, ids, val);
}

let graphNodes = 4,
  graphFrom = [1, 1, 4],
  graphTo = [2, 3, 2],
  ids = [1, 2, 1, 1],
  val = 1;
console.log(findShortest(graphNodes, graphFrom, graphTo, ids, val));
ids = [1, 2, 3, 4];
val = 2;
console.log(findShortest(graphNodes, graphFrom, graphTo, ids, val));
(graphNodes = 5),
  (graphFrom = [1, 1, 2, 3]),
  (graphTo = [2, 3, 4, 5]),
  (ids = [1, 2, 3, 3, 2]),
  (val = 2);
console.log(findShortest(graphNodes, graphFrom, graphTo, ids, val));
