/**
 * Returns the length of the longest string
 * that can be constructed from two strings
 * such that it is a child of both?
 * after deleting 0 or more characters
 *
 *
 * N = |s1|
 * Time: O(N^2)
 * Additional space: O(N^2)
 *
 * @param  {string} str1
 * @param  {string} str2
 * @return {array}  length of longest child
 */

function commonChild(s1, s2) {
  "Longest common sequence method";
  if (s1 === s2) return s1.length;
  const string_length = s1.length;

  const rows = string_length + 1;
  const lcs = [];
  for (let i = 0; i < rows; i++) {
    lcs.push(new Array(rows).fill(0));
  }

  for (let i = 0; i < string_length; i++) {
    for (let j = 0; j < string_length; j++) {
      if (s1[i] === s2[j]) {
        lcs[i + 1][j + 1] = lcs[i][j] + 1;
      } else {
        lcs[i + 1][j + 1] = Math.max(lcs[i][j + 1], lcs[i + 1][j]);
      }
    }
  }
  return lcs[string_length][string_length];
}

console.log(commonChild("abcd", "abdc"), 3);
console.log(commonChild("SHINCHAN", "NOHARAAA"), 3);
