//  Rabin-Karp Algorithm using a rolling hash function O(b) 😁;
// worst case 0(s(b-s)) because sum just ain't that unique 😔
// => assuming all lower case english letters 😬

import alphabetDict from "./alphabetDict.js";

let sCounts = {},
  bCounts = {};

function optimizedCountAnagramOccurrences(s, b) {
  sCounts = {};
  bCounts = {};
  if (s === b) return 1;
  if (s.length > b.length) return;
  let sHash = 0,
    bHash = 0;
  let firstIndex = 0,
    lastIndex = s.length - 1,
    matchCount = 0;
  for (let i = 0; i < s.length; i++) {
    sCounts[s[i]] = (sCounts[s[i]] || 0) + 1;
    bCounts[b[i]] = (bCounts[b[i]] || 0) + 1;
    sHash += alphabetDict[s[i]];
    bHash += alphabetDict[b[i]];
  }

  matchCount += compareHash(sHash, bHash, firstIndex, lastIndex, b);

  for (let j = 1; j <= b.length - s.length; j++) {
    bCounts[b[firstIndex]] -= 1;
    bHash -= alphabetDict[b[firstIndex]];
    firstIndex = j;
    lastIndex = j + s.length - 1;
    bCounts[b[lastIndex]] = (bCounts[b[lastIndex]] || 0) + 1;
    bHash += alphabetDict[b[lastIndex]];
    matchCount += compareHash(sHash, bHash, firstIndex, lastIndex, b);
  }
  return matchCount;
}

function compareHash(h1, h2, beginning, last, b) {
  if (h1 !== h2) return 0;
  for (let j = beginning; j <= last; j++) {
    if (!sCounts[b[j]]) {
      return 0;
    }
    if (bCounts[b[j]] > sCounts[b[j]]) {
      return 0;
    }
  }
  return 1;
}

console.log(
  optimizedCountAnagramOccurrences("abbc", "cbabadcbbabbcbabaabccbabc"),
  7
);

export default optimizedCountAnagramOccurrences;
