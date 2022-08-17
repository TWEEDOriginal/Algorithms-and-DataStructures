function countAnagramOccurrences(s, b) {
  var matchCount = 0;
  var sCounts = {}; // counts for the letters in s
  // construct sCounts
  for (var i = 0; i < s.length; i++) {
    sCounts[s[i]] = (sCounts[s[i]] || 0) + 1;
  }
  let x = 0;
  // for each letter in b
  while (s.length + x <= b.length) {
    let bCounts = {};
    var match = true;
    for (var j = x; j < s.length + x; j++) {
      if (!sCounts[b[j]]) {
        x = j + 1;
        match = false;
        break;
      }
      bCounts[b[j]] = (bCounts[b[j]] || 0) + 1;
      if (bCounts[b[j]] > sCounts[b[j]]) {
        x += 1;
        match = false;
        break;
      }
    }
    if (match) {
      x += 1;
      matchCount += 1;
    }
  }
  return matchCount;
}
console.log(countAnagramOccurrences("abbc", "cbabadcbbabbcbabaabccbabc"));
