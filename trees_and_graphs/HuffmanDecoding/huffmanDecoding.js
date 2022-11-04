/**
 *
 * huffman encoding for strings
 *
 * decodeHuff FUNCTION:
 *
 * N = |tree|
 * D = |height|
 * S = |huffman code|
 * Time: O(ND)
 * Additional space: O(S)
 *
 * @param  {String} - huffman code
 * @param  {Tree}
 * @return {String} decoded string
 *
 */

class Node {
  constructor(freq, data) {
    this.data = data;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

const dfs = (huffMap, node, encodedStr) => {
  if (!node) return;
  else if (node.data !== "\0") huffMap[node.data] = encodedStr;

  dfs(huffMap, node.left, encodedStr + "0");
  dfs(huffMap, node.right, encodedStr + "1");
};

function createNode(node, item, itemFreq) {
  const newNode = new Node(node.freq + itemFreq, "\0");
  if (node.freq <= itemFreq) {
    newNode.left = node;
    newNode.right = new Node(itemFreq, item);
  } else {
    newNode.right = node;
    newNode.left = new Node(itemFreq, item);
  }
  return newNode;
}

const stringFreq = (string) => {
  const map = {};

  for (let char of string) {
    map[char] ? map[char]++ : (map[char] = 1);
  }

  return map;
};

const sortbyFreq = (stringFreqs) => {
  const freqArr = [];

  for (let [key, value] of Object.entries(stringFreqs)) {
    freqArr[value] ? freqArr[value].push(key) : (freqArr[value] = [key]);
  }
  return freqArr;
};

function encodeString(string) {
  //find freq of each string
  const map = stringFreq(string);
  const freqArr = sortbyFreq(map);
  let i = 0;
  let node = null;
  while (!freqArr[i]) {
    i++;
  }

  node = new Node(i, freqArr[i][0]);

  for (let j = 1; j < freqArr[i].length; j++) {
    node = createNode(node, freqArr[i][j], i);
  }
  i++;

  while (i < freqArr.length) {
    if (freqArr[i]) {
      for (let item of freqArr[i]) {
        node = createNode(node, item, i);
      }
    }
    i++;
  }
  const huffMap = {};
  dfs(huffMap, node, "");

  let huffmanCode = "";
  for (let char of string) {
    huffmanCode += huffMap[char];
  }
  console.log(huffmanCode);
  return [node, huffmanCode];
}

const decodeHuff = (root, s) => {
  let temp = root;
  let res = "";
  for (let elem of s) {
    if (elem === "1") {
      temp = temp.right;
    } else {
      temp = temp.left;
    }
    if (!temp.left && !temp.right) {
      res += temp.data;
      temp = root;
    }
  }
  console.log(res);
  return res;
};

const printResult = (array) => {
  let root, s;
  for (let str of array) {
    [root, s] = encodeString(str);
    decodeHuff(root, s);
    console.log("\n");
  }
};

printResult([
  "ABRACADABRA",
  "ABACA",
  "Rumpelstiltskin",
  "howmuchwoodwouldawoodchuckchuckifawoodchuckcouldchuckwood?",
]);
