/**
 *
 * an algorithm to get minimum
 * cost to provide library
 * access to all citizens of
 * HackerLand.
 * There are n cities.
 *
 *
 * N = |graph|
 * Time: O(N^2)
 * Additional space: O(N^2)
 *
 * @param  {Graph}
 * @return {Number}
 *
 */

import { search } from "../helpers/GraphSearch/BiDirectionalSearch.js";
import { recursiveSearch } from "../helpers/GraphSearch/depthFirstSearch.js";
import { Graph, UNDIRECTED } from "../helpers/graph.js";

function roadsAndLibraries(n, c_lib, c_road, cities) {
  if (c_road > c_lib) return n * c_lib;
  const hasLibConn = new Set();
  const graph = new Graph(UNDIRECTED);
  let minimumCost = 0;
  let city1, city2;

  for (let cityPair of cities) {
    city1 = graph.getVertex(cityPair[0]);
    city2 = graph.getVertex(cityPair[1]);

    if (!city1 || !city2 || search(city1, city2).length === 0) {
      minimumCost += c_road;
      graph.addEdge(cityPair[0], cityPair[1]);
    }
  }

  for (let city of graph.nodes.values()) {
    if (!hasLibConn.has(city)) {
      recursiveSearch(city, hasLibConn);
      minimumCost += c_lib;
    }
  }

  minimumCost += (n - hasLibConn.size) * c_lib;
  return minimumCost;
}

let n = 5,
  c_lib = 92,
  c_road = 23,
  cities = [
    [2, 1],
    [5, 3],
    [5, 1],
    [3, 4],
    [3, 1],
    [5, 4],
    [4, 1],
    [5, 2],
    [4, 2],
  ];

console.log(roadsAndLibraries(n, c_lib, c_road, cities));

(n = 7),
  (c_lib = 3),
  (c_road = 2),
  (cities = [
    [1, 7],
    [1, 3],
    [1, 2],
    [2, 3],
    [5, 6],
    [6, 8],
  ]);

console.log(roadsAndLibraries(n, c_lib, c_road, cities));
