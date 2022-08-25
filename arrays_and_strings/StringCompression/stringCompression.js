/**
 * Takes an input string and counts contiguous sequences of the same character
 * and replaces them with XC (X = count, C = character).
 *
 * N = |str|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {string} str - String with repeated sequences
 * @return {string}       String with letterCount sequence
 */

const stringCompression = (str) => {
  if (str.length <= 0) return str;
  let prev = str[0],
    count = 1,
    index = 1;
  let newStr = "";

  while (index < str.length) {
    if (str[index] !== prev) {
      newStr = newStr + prev + `${count}`;
      prev = str[index];
      count = 0;
    }
    index++;
    count++;
  }
  newStr = newStr + prev + `${count}`;
  return newStr.length < str.length ? newStr : str;
};

console.log(stringCompression("aa"), "aa");
console.log(stringCompression("abc"), "abc");
console.log(stringCompression("aabbcc"), "aabbcc");
console.log(stringCompression("ababababccab"), "ababababccab");

console.log(stringCompression("aabcccccaaa"), "a2blc5a3");
console.log(stringCompression("aaa"), "a3");
console.log(stringCompression("bbbbbb"), "b6");
console.log(stringCompression("abbbbbbc"), "a1b6c1");
console.log(stringCompression("aaabccc"), "a3b1c3");
console.log(stringCompression("hhellllllllooooo!"), "h2e1l8o5!1");
console.log(stringCompression("woorrrllllddddd"), "w1o2r3l4d5");
