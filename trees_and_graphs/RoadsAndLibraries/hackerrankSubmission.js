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
 * @param  {Number} - number of cities
 * @param  {Number} - price of building a library
 * @param  {Number} - price of building a road
 * @param  {Array} int[][] - city pairs that can have 
 *                           roads between them
 * @return {Number} - minimum_cost to make libraries
 *                    accessible to all citizens.
 *
 */

const bfs = (graph, city1, city2) => {
  if (!graph[city1] || !graph[city2]) return false;

  const queue1 = [];
  const queue2 = [];
  const childParent = new Set();
  const parentChild = new Set();
  childParent.add(city1);
  parentChild.add(city2);
  queue1.push(city1);
  queue2.push(city2);
  let value1, value2;
  while (queue1.length > 0 && queue2.length > 0) {
    value1 = queue1.shift();
    value2 = queue2.shift();
    if (value1 === value2) {
      return true;
    } else if (childParent.has(value2) || parentChild.has(value1)) {
      return true;
    }
    for (let city of graph[value1]) {
      if (parentChild.has(city)) {
        return true;
      }
      if (!childParent.has(city)) {
        childParent.add(city);
        queue1.push(city);
      }
    }

    for (let city of graph[value2]) {
      if (childParent.has(city)) {
        return true;
      }
      if (!parentChild.has(city)) {
        parentChild.add(city);
        queue2.push(city);
      }
    }
  }
  return false;
};

const dfs = (graph, city, hasLibConn) => {
  hasLibConn.add(Number(city));
  for (let connCity of graph[city]) {
    if (!hasLibConn.has(Number(connCity))) {
      dfs(graph, connCity, hasLibConn);
    }
  }
};
function roadsAndLibraries(n, c_lib, c_road, cities) {
  if (c_road > c_lib) return n * c_lib;
  const hasLibConn = new Set();
  const graph = {};
  let minimumCost = 0;
  let city1, city2;

  for (let cityPair of cities) {
    city1 = cityPair[0];
    city2 = cityPair[1];

    if (!bfs(graph, city1, city2)) {
      minimumCost += c_road;
      graph[city1] ? graph[city1].push(city2) : (graph[city1] = [city2]);
      graph[city2] ? graph[city2].push(city1) : (graph[city2] = [city1]);
    }
  }

  for (let city of Object.keys(graph)) {
    if (!hasLibConn.has(Number(city))) {
      dfs(graph, city, hasLibConn);
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
