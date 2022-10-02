/**
 * bds is two simultaneous bfs
 * one from each node. 
 * When their searches collide, 
 * we have found a path.
 * faster search than bfs.
 * 
 * N = |vertices|
 * d = |height|
 * Time: O(N^(d/2))
 * Additional space: O(N)
 *
 * @param  {node} Vertex - root node to search from
 * @return {set} - set containing all found nodes
 */

import { Queue } from "../../../stacks_and_queues/helpers/queue.js"
import { Graph, UNDIRECTED } from "../graph.js";

const search = (start, end) => {
    if (!start || !end) return;
   const queue1 = new Queue()
   const queue2 = new Queue()
   while(!queue1.isEmpty() && !queue2.isEmpty()){
    
   }
}