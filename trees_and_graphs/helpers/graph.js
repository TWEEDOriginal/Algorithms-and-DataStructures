// implementation of a Graph
/*

ADT:
# Main operations
V = |vertices|
addVertex(value)                -> time Complexity O(1)

removeVertex(value)             -> time Complexity O(V) 
                                   because we have to check 
                                   if the node to be deleted 
                                   is in use as an adjacent 
                                   in other nodes.

addEdge(source, destination)    -> time Complexity O(1)     

removeEdge(source, destination) -> time Complexity O(1)


*/

// all ops are O(1)
export class Node {
  constructor(value) {
    this.value = value;
    this.adjacents = new Set();
  }

  addAdjacent(node) {
    this.adjacents.add(node);
  }
  removeAdjacent(node) {
    if (!this.isAdjacent(node)) return;

    this.adjacents.delete(node);
  }

  getAdjacents() {
    return this.adjacents;
  }

  isAdjacent(node) {
    return this.adjacents.has(node);
  }
}

// Any binary relationship
// can be rep'd by a graph
// two people (social network)
// two places (Map)
// two servers (internet)
// two airports (airline traffic)

export class Graph {
  constructor(edgeDirection = DIRECTED) {
    this.nodes = new Map();
    this.edgeDirection = edgeDirection;
  }

  getVertex(value) {
    return this.nodes.get(value);
  }

  addVertex(value) {
    if (this.nodes.has(value)) {
      return this.getVertex(value);
    }
    const vertex = new Node(value);
    this.nodes.set(value, vertex);
    return vertex;
  }

  removeVertex(value) {
    if (!this.nodes.has(value)) {
      return;
    }
    const vertex = this.getVertex(value);

    // remove it from everywhere
    // that's pointing to it
    for (const node of this.nodes.values()) {
      node.removeAdjacent(vertex);
    }
    return this.nodes.delete(value);
  }

  addEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);

    sourceNode.addAdjacent(destinationNode);

    if (this.edgeDirection === UNDIRECTED) {
      destinationNode.addAdjacent(sourceNode);
    }

    return [sourceNode, destinationNode];
  }

  removeEdge(source, destination) {
    const sourceNode = this.getVertex(source);
    const destinationNode = this.getVertex(destination);

    sourceNode.removeAdjacent(destinationNode);

    if (this.edgeDirection === UNDIRECTED) {
      destinationNode.removeAdjacent(sourceNode);
    }

    return [sourceNode, destinationNode];
  }
}

export const UNDIRECTED = Symbol("undirected graph"); // two-ways edges
export const DIRECTED = Symbol("directed graph"); // one-way edges

export const printGraph = (graph) => {
  const map = {};
  let adjs = [];
  for (let [key, value] of graph.nodes) {
    adjs = [];
    for (let node of value.adjacents) {
      adjs.push(node.value);
    }
    map[key] = adjs;
  }
  return map;
};
// directed
// let graph = new Graph()
// graph.addEdge('a', 'b')
// graph.addEdge('a', 'a')
// let a = graph.getVertex('a')
// let b = graph.getVertex('b')
// console.log(a.isAdjacent(b))
// console.log(b.isAdjacent(a))
// console.log(graph.addEdge('b', 'c'))
// graph.addEdge('c', 'd')
// graph.addEdge('d', 'b')
// graph.addEdge('d', 'c')
// console.log(printGraph(graph))
// console.log(graph.removeEdge('d', 'c'))
// console.log(printGraph(graph))
// console.log(graph.removeVertex('b'))
// console.log(printGraph(graph))
// graph = new Graph(UNDIRECTED)
// graph.addEdge('a', 'b')
// graph.addEdge('a', 'a')
// a = graph.getVertex('a')
// b = graph.getVertex('b')
// console.log(a.isAdjacent(b))
// console.log(b.isAdjacent(a))
// console.log(graph.addEdge('b', 'c'))
// graph.addEdge('c', 'd')
// graph.addEdge('d', 'b')
// graph.addEdge('d', 'c')
// console.log(printGraph(graph))
// console.log(graph.removeEdge('d', 'c'))
// console.log(printGraph(graph))
// console.log(graph.removeVertex('b'))
// console.log(printGraph(graph))
