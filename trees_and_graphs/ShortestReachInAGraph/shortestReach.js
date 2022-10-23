import { Graph, UNDIRECTED } from "../helpers/graph.js";
import { Queue } from "../../stacks_and_queues/helpers/queue.js";

const bfs = (s, res, graph) => {
  const visited = new Set();
  const visitList = new Queue();
  visitList.add([graph.getVertex(s), 0]);

  let node, distance;

  while (!visitList.isEmpty()) {
    [node, distance] = visitList.remove();

    if (node.value < s) {
      res[node.value - 1] = distance;
    } else if (node.value > s) {
      res[node.value - 2] = distance;
    }

    for (let adj of node.getAdjacents()) {
      if (adj && !visited.has(adj)) {
        visitList.add([adj, distance + 6]);
        visited.add(adj);
      }
    }
  }
  return res;
};

const find_all_distances = (s, n, graph) => {
  const res = Array(n - 1).fill(-1);
  return bfs(s, res, graph);
};

const printResult = (array) => {
  let graph;
  for (let item of array) {
    graph = new Graph(UNDIRECTED);
    for (let i of item.edges) {
      graph.addEdge(i[0], i[1]);
    }
    console.log(find_all_distances(item.s, item.n, graph));
  }
};

printResult([
  {
    n: 6,
    edges: [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 5],
    ],
    s: 1,
  },
  {
    n: 4,
    edges: [
      [1, 2],
      [1, 3],
    ],
    s: 1,
  },
  { n: 3, edges: [[2, 3]], s: 2 },
  {
    n: 7,
    edges: [
      [1, 2],
      [1, 3],
      [3, 4],
      [2, 5],
    ],
    s: 2,
  },
]);
