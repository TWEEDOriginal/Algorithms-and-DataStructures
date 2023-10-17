/**
 * Return a 2d array containing all the ways
 * target be constructed by concatenating
 * elements of wordBank array
 *
 * elements of wordBank can be reused
 */

/**
 *
 * h = target
 * n = |wordBank|
 * Time: O(n^h)
 * Additional space: O(h)
 *
 */

//to avoid duplication only use first word approach
function bruteForce(target, wordBank) {
  if (target === "") {
    return [[]];
  }

  const combos = [];

  for (let word of wordBank) {
    const index = target.indexOf(word);
    if (index !== 0) continue;

    const miniCombos = bruteForce(target.substring(word.length), wordBank);

    for (const miniCombo of miniCombos) {
      combos.push([word, ...miniCombo]);
    }
  }
  return combos;
}

console.log(
  bruteForce("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])
);
console.log(
  bruteForce("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
console.log(
  bruteForce("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])
);
console.log(bruteForce("purple", ["purp", "p", "ur", "le", "purpl"]));

/**
 *
 * h = target
 * n = |wordBank|
 * Time: O(n^h)
 * Additional space: O(h)
 *
 */

function recursiveSolve(target, wordBank, cache = {}) {
  if (cache[target]) return cache[target];
  if (target === "") return [[]];

  const combos = [];
  for (let word of wordBank) {
    const index = target.indexOf(word);
    if (index !== 0) continue;

    const miniCombos = recursiveSolve(
      target.substring(word.length),
      wordBank,
      cache
    );

    for (const miniCombo of miniCombos) {
      combos.push([word, ...miniCombo]);
    }
  }

  cache[target] = combos;
  return combos;
}

console.log(
  recursiveSolve("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])
);
console.log(
  recursiveSolve("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
console.log(
  recursiveSolve("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])
);
console.log(recursiveSolve("purple", ["purp", "p", "ur", "le", "purpl"]));

/**
 *
 * h = target
 * n = |wordBank|
 * Time: O(n^h)
 * Additional space: O(n^h)
 *
 */

function iterativeSolve(target, wordBank) {
  const cache = Array(target.length + 1)
    .fill()
    .map(() => []);

  cache[0] = [[]];

  for (let i = 1; i <= target.length; i++) {
    for (let word of wordBank) {
      const start = i - word.length;
      if (
        start >= 0 &&
        cache[start].length > 0 &&
        target.substring(start, i) === word
      ) {
        for (const combo of cache[start]) {
          cache[i].push([...combo, word]);
        }
      }
    }
  }
  return cache[target.length];
}

console.log(
  iterativeSolve("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])
);
console.log(
  iterativeSolve("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
console.log(
  iterativeSolve("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])
);
console.log(iterativeSolve("purple", ["purp", "p", "ur", "le", "purpl"]));
