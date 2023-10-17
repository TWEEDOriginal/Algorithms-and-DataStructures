/**
 * Return how many times target be constructed
 * by concatenating elements of wordBank array
 *
 * elements of wordBank can be reused
 */

/**
 *
 * h = target
 * n = |wordBank|
 * Time: O(h*n^h)
 * Additional space: O(h^2)
 *
 */

//to avoid duplication only use first word approach
function bruteForce(target, wordBank) {
  if (target === "") return 1;

  let count = 0;

  for (let word of wordBank) {
    const index = target.indexOf(word);
    if (index !== 0) continue;
    //remove word from beginning of target
    const num = bruteForce(target.substring(word.length), wordBank);
    count += num;
  }
  return count;
}

console.log(bruteForce("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
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
 * Time: O(n*h^2)
 * Additional space: O(h^2+ h)
 *
 */

function recursiveSolve(target, wordBank, cache = {}) {
  if (cache[target]) return cache[target];
  if (target === "") return 1;

  let count = 0;
  for (let word of wordBank) {
    const index = target.indexOf(word);
    if (index !== 0) continue;

    const num = recursiveSolve(target.substring(word.length), wordBank, cache);
    count += num;
  }

  cache[target] = count;
  return count;
}

console.log(recursiveSolve("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
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
 * Time: O(n*h^2)
 * Additional space: O(h)
 *
 */

function iterativeSolve(target, wordBank) {
  const cache = Array(target.length + 1).fill(0);

  cache[0] = 1;

  for (let i = 0; i <= target.length; i++) {
    if (cache[i] != 0) {
      for (let word of wordBank) {
        if (target.substring(i, i + word.length) === word) {
          cache[i + word.length] += cache[i];
        }
      }
    }
  }
  return cache[target.length];
}

console.log(iterativeSolve("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(
  iterativeSolve("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
console.log(
  iterativeSolve("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])
);

console.log(iterativeSolve("purple", ["purp", "p", "ur", "le", "purpl"]));
