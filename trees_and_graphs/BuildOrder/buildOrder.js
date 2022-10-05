/**
 * Builds project dependencies
 * before building each project
 * Finds a build order that allows
 * all projects to be built
 *
 * topological sort problem
 *
 * P = |projects|
 * D = |Dependency pairs|
 * Time: O(P+D)
 * Additional space: O(P)
 *
 * @param  {array} any[]
 * @param  {array} any[][] - list of dependency pairs
 * @return {array} build order
 *
 */

import { Graph } from "../helpers/graph.js";
import { InvalidBuildError } from "../helpers/errors.js";

//dfs method
const build = (node, buildOrder, visited) => {
  if (buildOrder.has(node.value)) return;

  // there's a cycle, this will cause infinite loop
  // while trying to get dependencies
  if (visited.has(node.value))
    throw new InvalidBuildError("No valid build order");

  const dependencies = node.getAdjacents();

  if (dependencies.size == 0) {
    buildOrder.add(node.value);
    return;
  }

  visited.add(node.value);

  for (let dependency of dependencies) {
    build(dependency, buildOrder, visited);
  }

  buildOrder.add(node.value);
};

const buildOrder = (projects, dependencyPairs) => {
  const buildOrder = new Set();

  const dependencies = new Graph();
  for (let pair of dependencyPairs) {
    dependencies.addEdge(pair[1], pair[0]);
  }

  const visited = new Set();

  for (let project of projects) {
    const node = dependencies.getVertex(project);

    if (!node || node.getAdjacents().size == 0) {
      buildOrder.add(project);
      continue;
    }

    if (buildOrder.has(node.value)) continue;

    build(node, buildOrder, visited);
  }

  if (buildOrder.size != projects.length)
    throw new InvalidBuildError("No valid build order");

  return buildOrder;
};

const printResult = (projects, dependencyPairs) => {
  try {
    console.log(buildOrder(projects, dependencyPairs));
  } catch (e) {
    if (!(e instanceof InvalidBuildError)) throw e;

    console.error(e.message);
  }
};

printResult(
  ["a", "b", "c", "d", "e", "f"],
  [
    ["a", "d"],
    ["f", "b"],
    ["b", "d"],
    ["f", "a"],
    ["d", "c"],
  ]
);

printResult(
  ["a", "b", "c", "d", "e", "f", "g"],
  [
    ["d", "g"],
    ["f", "c"],
    ["f", "b"],
    ["f", "a"],
    ["b", "a"],
    ["c", "a"],
    ["a", "e"],
    ["b", "e"],
  ]
);

printResult(
  [9, 1, 5, 6],
  [
    [6, 5],
    [5, 1],
    [1, 9],
  ]
);

printResult(
  [9, 1, 5, 6],
  [
    [6, 5],
    [5, 1],
    [1, 9],
    [9, 5],
  ]
);

printResult(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [
    [2, 1],
    [3, 1],
    [4, 2],
    [6, 2],
    [5, 3],
    [7, 3],
    [8, 4],
    [11, 8],
    [12, 8],
    [10, 6],
    [10, 5],
    [9, 7],
    [13, 10],
    [13, 9],
    [14, 13],
  ]
);
