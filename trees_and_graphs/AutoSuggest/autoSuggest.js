/**
 * Autocomplete str input or
 * suggests alternatives if
 * the input isn't in the trie
 *
 * N = |string|
 * M = |alphabet|
 * Time: O(N^2*M) 💀
 * Additional space: O(N*M)
 *
 * @param  {Trie} Trie - trie DataStructure
 * @param  {string} words - word to find in trie
 * @return {array} - array containing all suggestions
 */

import { Trie, TerminatingTrieNode } from "../helpers/trie.js";

function suggestionsRec(curr, word, words) {
  let children = curr.children;
  if (children["*"] && children["*"] instanceof TerminatingTrieNode) {
    words.push(word);
  }

  for (let letter of Object.keys(children)) {
    if (letter === "*" && children[letter] instanceof TerminatingTrieNode)
      continue;
    suggestionsRec(children[letter], word + letter, words);
  }
}

function autoComplete(trie, word, words) {
  let curr = trie.root;
  const alternatives = [];
  for (let i = 0; i < word.length; i++) {
    alternatives[i] = curr.children;
    if (!curr.children[word[i]]) {
      return [words, alternatives];
    }
    curr = curr.children[word[i]];
  }
  // don't autocomplete if the word is already valid
  if (curr.children["*"] && curr.children["*"] instanceof TerminatingTrieNode) {
    words.push(word);
    return [words, alternatives];
  }

  suggestionsRec(curr, word, words);
  return [words, alternatives];
}

function autoCompleteNew(node, word, index, words) {
  for (let i = index; i < word.length; i++) {
    if (!node.children[word[i]]) {
      return;
    }
    node = node.children[word[i]];
  }
  suggestionsRec(node, word, words);
}

/***
 *
 * Spell checker that assumes that each
 * letter is wrong, but only that
 * letter can be wrong
 *
 * Wrong means:
 * - It can be replaced with another letter
 *   and the word will still be correct
 *
 * - It can be removed and the remaining letters
 *   will still form a valid word
 *
 * - a letter can be added before
 *   it and it’ll still be valid
 *
 *
 * First check if the actual word is
 * valid or can be autocompleted normally
 * before doing all these serenren
 *
 * An ideal implementation will also
 * have frequency of use implemented
 *
 *
 ***/

function autoSuggest(trie, word) {
  const [suggestions, alternatives] = autoComplete(trie, word, []);

  //word in dictionary
  if (suggestions.length > 0) {
    return suggestions;
  }
  let newWord, alternative;

  for (let i = 0; i < word.length; i++) {
    alternative = alternatives[i];

    if (!alternative) continue;

    for (let letter of Object.keys(alternative)) {
      //replace
      newWord = word.substring(0, i) + letter + word.substring(i + 1);
      autoCompleteNew(alternative[letter], newWord, i + 1, suggestions);
      //insert before
      newWord = word.substring(0, i) + letter + word.substring(i);
      autoCompleteNew(alternative[letter], newWord, i + 1, suggestions);
    }
    //remove
    newWord = word.substring(0, i) + word.substring(i + 1);

    if (i === 0) {
      autoCompleteNew(trie.root, newWord, 0, suggestions);
    } else {
      autoCompleteNew(
        alternatives[i - 1][newWord[i - 1]],
        newWord,
        i,
        suggestions
      );
    }
  }
  return suggestions;
}

let trie = new Trie();
let words = [
  "hello",
  "dog",
  "hell",
  "cat",
  "a",
  "hel",
  "help",
  "helps",
  "helping",
  "many",
  "man",
  "max",
  "ma",
  "bulp",
  "belt",
  "character",
];
for (let word of words) {
  trie.insert(word);
}

console.log(autoComplete(trie, "h", []));
console.log(autoComplete(trie, "m", []));
console.log(autoComplete(trie, "man", []));
console.log(autoSuggest(trie, "belp"));
console.log(autoSuggest(trie, "blt"));
console.log(autoSuggest(trie, "charcte"));
console.log(autoSuggest(trie, "beelt"));
console.log(autoSuggest(trie, "bbelt"));
console.log(autoSuggest(trie, "charaxcte"));
