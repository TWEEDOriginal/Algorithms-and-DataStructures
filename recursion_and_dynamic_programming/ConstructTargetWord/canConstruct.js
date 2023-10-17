/**
 * Can target be constructed by concatenating
 * elements of wordBank array
 *
 * elements of wordBank can be reused
 */

/**
 *
 * h = target
 * n = |wordBank|
 * Time: O(h*n^h)
 * Additional  space: O(h^2)
 *
 */

function bruteForce(target, wordBank) {
  if (target === "") return true;

  for (let word of wordBank) {
    const index = target.indexOf(word);
    if (index === -1) continue;

    //split target into two without word
    if (
      bruteForce(target.substring(0, index), wordBank) &&
      bruteForce(target.substring(index + word.length), wordBank)
    )
      return true;
  }
  return false;
}

console.log(bruteForce("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(
  bruteForce("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
console.log(
  bruteForce("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])
);

/**
 *
 * h = target
 * n = |wordBank|
 * Time: O(n*h^2)
 * Additional space: O(h^2+ h)
 *
 */

function recursiveSolve(target, wordBank, cache) {
  if (cache[target]) return cache[target];
  if (target === "") return true;

  for (let word of wordBank) {
    const index = target.indexOf(word);
    if (index === -1) continue;

    if (
      recursiveSolve(target.substring(0, index), wordBank, cache) &&
      recursiveSolve(target.substring(index + word.length), wordBank, cache)
    ) {
      cache[target] = true;
      return true;
    }
  }

  cache[target] = false;
  return false;
}

console.log(recursiveSolve("abcdef", ["ab", "abc", "cd", "def", "abcd"], {}));
console.log(
  recursiveSolve(
    "skateboard",
    ["bo", "rd", "ate", "t", "ska", "sk", "boar"],
    {}
  )
);
console.log(
  recursiveSolve(
    "enterapotentpot",
    ["a", "p", "ent", "enter", "ot", "o", "t"],
    {}
  )
);

/**
 *
 * h = target
 * n = |wordBank|
 * Time: O(n*h^2)
 * Additional space: O(h)
 *
 */

function iterativeSolve(target, wordBank) {
  const cache = Array(target.length + 1).fill(false);

  cache[0] = true;
  for (let i = 1; i <= target.length; i++) {
    for (let word of wordBank) {
      const start = i - word.length;
      if (start >= 0 && cache[start] && target.substring(start, i) === word) {
        cache[i] = cache[start];
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

function altIterativeSolve(target, wordBank) {
  const cache = Array(target.length + 1).fill(false);

  cache[0] = true;

  for (let i = 0; i <= target.length; i++) {
    if (cache[i]) {
      for (let word of wordBank) {
        if (target.substring(i, i + word.length) === word) {
          cache[i + word.length] = true;
        }
      }
    }
  }
  return cache[target.length];
}

console.log(altIterativeSolve("abcdef", ["ab", "abc", "cd", "def", "abcd"]));
console.log(
  altIterativeSolve("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
);
console.log(
  altIterativeSolve("enterapotentpot", [
    "a",
    "p",
    "ent",
    "enter",
    "ot",
    "o",
    "t",
  ])
);
