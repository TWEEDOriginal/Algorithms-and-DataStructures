/***  PRE ATTEMPT THOUGHTS ✨✨✨ ***/
//for each machine city while doing dfs check if all roads that
// connect it to others have been deleted before continuing to find minimum time
// also check if the machine city even has adjacent nodes

//dfs till you don't find anymore machine city
//for each machine city found, delete road with smallest time up to that point

// delete road === just disconnect the two nodes that use that road no stress
// or
//keep track of deleted roads

// minimum = [city1, city2, time]

/**
 * return an integer representing
 * the minimum time to cut off
 * access between the machines.
 *
 * N = |cities|
 * M = |machines|
 * Time: O(NM)
 * Additional space: O(N + M)
 *
 * @param  {Array} int[][] - roads
 * @param  {Array} int[] - cities with machines
 * @return {Number} - minimum time
 *
 */

const checkBlackList = (blackList, cities) => {
  return blackList.has(`${cities[0]}${cities[1]}`);
};
const dfs = (city, graph, machines, visited, blackList, minimum, cities) => {
  if (
    visited.has(city) ||
    graph.get(city).size == 0 ||
    checkBlackList(blackList, cities)
  )
    return 0;

  visited.add(city);
  let timeCount = 0;
  let newMinimum;

  for (let [city2, time] of graph.get(city)) {
    newMinimum =
      minimum[2] == -1
        ? [city, city2, time]
        : minimum[2] < time
        ? minimum
        : [city, city2, time];

    if (!visited.has(city2) && machines.has(city2)) {
      if (!checkBlackList(blackList, [newMinimum[0], newMinimum[1]])) {
        blackList.add(`${newMinimum[0]}${newMinimum[1]}`);
        blackList.add(`${newMinimum[1]}${newMinimum[0]}`);
        timeCount += newMinimum[2];
      }

      continue;
    }
    timeCount += dfs(city2, graph, machines, visited, blackList, newMinimum, [
      city,
      city2,
    ]);
  }
  return timeCount;
};

function minTime(roads, machines) {
  const graph = new Map();
  let city1, city2, time;

  const machineSet = new Set();
  for (let city of machines) {
    machineSet.add(city);
    graph.set(city, new Map());
  }

  for (let edge of roads) {
    city1 = edge[0];
    city2 = edge[1];
    time = edge[2];
    graph.has(city1)
      ? graph.get(city1).set(city2, time)
      : graph.set(city1, new Map([[city2, time]]));

    graph.has(city2)
      ? graph.get(city2).set(city1, time)
      : graph.set(city2, new Map([[city1, time]]));
  }

  let visited;
  const blackList = new Set();
  let minimumTime = 0;
  for (let machineCity of machines) {
    visited = new Set();
    minimumTime += dfs(
      machineCity,
      graph,
      machineSet,
      visited,
      blackList,
      [-1, -1, -1],
      [-1, -1]
    );
  }
  return minimumTime;
}
let roads = [
  [2, 1, 8],
  [1, 0, 5],
  [2, 4, 5],
  [1, 3, 4],
];

let machines = [2, 4, 0];
console.log(minTime(roads, machines));
