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

  start.previous = null;
  end.next = null;
  queue1.add(start);
  queue2.add(end);
  let node1, node2;
  while (!queue1.isEmpty() && !queue2.isEmpty()) {
    node1 = queue1.remove();
    node2 = queue2.remove();
    if (node1 === node2) {
      beginning = node1;
      ending = node2.next || undefined;
      break;
    } else if (node2.previous !== undefined) {
      beginning = node2;
      ending = node2.next || undefined;
      break;
    } else if (node1.next !== undefined) {
      beginning = node1;
      ending = node1.next || undefined;
      break;
    }
    for (let adj of node1.getAdjacents()) {
      if (adj && adj.previous === undefined) {
        adj.previous = node1;
        queue1.add(adj);
      }
    }
    for (let adj of node2.getAdjacents()) {
      if (adj && adj.next === undefined) {
        adj.next = node2;
        queue2.add(adj);
      }
    }
  }
  let temp;
  while (beginning) {
    path.prepend(beginning.value);
    temp = beginning.previous;
    beginning.previous = undefined;
    beginning.next = undefined;
    beginning = temp;
  }
  path = path.toArray();
  while (ending) {
    path.push(ending.value);
    temp = ending.next;
    ending.previous = undefined;
    ending.next = undefined;
    ending = temp;
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
