/**
 * bds is two simultaneous bfs
 * one from each node.
 * When their searches collide,
 * we have found a path.
 * faster search than bfs.
 * useful for only UNDIRECTED paths
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

import { Queue } from "../../../stacks_and_queues/helpers/queue.js";
// import { Graph, UNDIRECTED, Node } from "../graph.js";
import { LinkedList } from "../../../linked_lists/helpers/linkedList.js";

export const search = (start, end) => {
  if (!start || !end) return;

  if (start === end) {
    return [start.value];
  }

  const queue1 = new Queue();
  const queue2 = new Queue();

  let path = new LinkedList();

  let beginning, ending;

  const childParent = new Map();
  const parentChild = new Map();

  childParent.set(start.value, null);
  parentChild.set(end.value, null);

  queue1.add(start);
  queue2.add(end);

  let node1, node2;

  while (!queue1.isEmpty() && !queue2.isEmpty()) {
    node1 = queue1.remove();
    node2 = queue2.remove();
    if (node1 === node2) {
      beginning = node1.value;
      ending = parentChild.get(node2.value);
      break;
    } else if (childParent.has(node2.value)) {
      beginning = node2.value;
      ending = parentChild.get(node2.value);
      break;
    } else if (parentChild.has(node1.value)) {
      beginning = node1.value;
      ending = parentChild.get(node1.value);
      break;
    }

    for (let adj of node1.getAdjacents()) {
      if (adj && !childParent.has(adj.value)) {
        childParent.set(adj.value, node1.value);
        queue1.add(adj);
      }
    }

    for (let adj of node2.getAdjacents()) {
      if (adj && !parentChild.has(adj.value)) {
        parentChild.set(adj.value, node2.value);
        queue2.add(adj);
      }
    }
  }

  while (beginning) {
    path.prepend(beginning);
    beginning = childParent.get(beginning);
  }
  path = path.toArray();
  while (ending) {
    path.push(ending);
    ending = parentChild.get(ending);
  }

  return path;
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

// console.log(search(start, end));
// console.log(search(start, new Node(10)));
