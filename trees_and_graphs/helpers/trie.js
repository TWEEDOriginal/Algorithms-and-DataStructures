// implementation of a Trie
/*
* Trie from ReTrieve aka Prefix Tree or Digital tree.
* e.g used for dictionaries to store entire alphabets,
* for spell-checking and autosuggestions in search engines

ADT:
# Main operations
n = |word|
insert(word)           -> Add a new word : time Complexity O(n)
find_prefixes(word)    -> find all prefixes of a word : time Complexity O(n)
delete(word)           -> Delete a word: time Complexity O(n)

*/

import { Tree } from "./tree.js";

// could have had this.isLeaf to indicate
// if it's the end of word
export class TrieNode {
  constructor(value) {
    this.value = value;
    this.children = {};
  }
}

// could have used a boolean flag 
// on the parent node instead
export class TerminatingTrieNode extends TrieNode {
  constructor() {
    super("*");
  }
}

export class Trie extends Tree {
  constructor() {
    super();
    this.root = new TrieNode("");
  }

  insert(word) {
    if (!word) return;
    word = word.toLowerCase().trim();
    let curr = this.root;
    for (let letter of word) {
      if (!curr.children[letter]) {
        curr.children[letter] = new TrieNode(letter);
      }
      curr = curr.children[letter];
    }
    curr.children["*"] = new TerminatingTrieNode();
  }

  find_prefixes(word) {
    const prefixes = [];
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!curr.children[word[i]]) {
        break;
      }
      if (
        curr.children[word[i]].children["*"] &&
        curr.children[word[i]].children["*"] instanceof TerminatingTrieNode
      ) {
        prefixes.push(word.substring(0, i + 1));
      }

      curr = curr.children[word[i]];
    }
    return prefixes;
  }

  delete(word) {
    if (!this.root || !word) return;
    word = word.toLowerCase().trim();
    let lastValuableNode = this.root;
    let letterToDelete = word[0];
    let curr = this.root;
    for (let i = 0; i < word.length - 1; i++) {
      if (!curr.children[word[i]]) {
        return "Word not in trie";
      }

      // check if letter has more than one child or
      // if it is the ending of a word
      if (
        this.getLength(curr.children[word[i]].children) >= 2 ||
        (curr.children[word[i]].children["*"] &&
          curr.children[word[i]].children["*"] instanceof TerminatingTrieNode)
      ) {
        lastValuableNode = curr.children[word[i]];
        letterToDelete = word[i + 1];
      }

      curr = curr.children[word[i]];
    }
    //last letter
    curr = curr.children[word[word.length - 1]];
    const children_length = this.getLength(curr.children);

    let position;

    if (
      children_length === 0 ||
      !curr.children["*"] ||
      !(curr.children["*"] instanceof TerminatingTrieNode)
    ) {
      return "Word may technically be in trie but it's not terminated";
    } else if (children_length === 1) {
      position = `${letterToDelete} position`;
      delete lastValuableNode.children[letterToDelete];
    } else {
      position = "last position";
      delete curr.children["*"];
    }

    return `Word Deleted at ${position}`;
  }

  getLength(children) {
    return Object.keys(children).length;
  }
}

// const trie = new Trie();
// trie.insert("man");
// trie.insert("many");
// trie.insert("ma");
// console.log(trie);
// trie.insert("a");
// trie.insert("ant");
// trie.insert("an");
// console.log(trie.find_prefixes("many"));
// console.log(trie.find_prefixes("ant"));
// let words = ["the", "a", "there", "answer", "any", "by", "bye", "their"];
// for (let i = 0; i < words.length; i++) {
//   trie.insert(words[i]);
// }
// console.log(trie);
// console.log(trie.delete("man"));
// console.log(trie.delete("man"));
// console.log(trie.delete("many"));
// console.log(trie.find_prefixes("many"));
// console.log(trie.delete("bye"));
// console.log(trie.find_prefixes("bye"));
// trie.insert("black");
// console.log(trie.delete("by"));
// console.log(trie.find_prefixes("black"));
