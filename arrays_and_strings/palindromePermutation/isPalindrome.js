/**
 * check if a string is a permutation of a palindrome (case insensitive)
 *
 * @example
 * // returns true
 * isPalindrome("Tact Coa")
 *
 * @param  {string } str - String to check
 * @return {boolean}  True if input string is a permutation of a
 *                    palindrome (ignoring spaces), otherwise false
 *
 * Time: O(n) where n equals string length
 * Additional space: O(n) where n equals string length
 */


const isPalindrome = (str) => {
  let allowOdds = false;
  const { dict, arr, newStr } = buildCharFrequencyTable(str);

  if (newStr.length % 2 !== 0) {
    allowOdds = true;
  }
  return checkMaxOneOdd(dict, arr, allowOdds);
};

const buildCharFrequencyTable = (str) => {
  let dict = {},
    arr = [],
    newStr = "",
    letter;

  for (let i = 0; i < str.length; i++) {
    letter = str[i].toLowerCase();
    if (letter === " ") continue;
    newStr += letter;
    if (dict[letter]) {
      dict[letter] += 1;
      continue;
    }
    arr.push(letter);
    dict[letter] = 1;
  }

  return { dict, arr, newStr };
};

const checkMaxOneOdd = (dict, arr, allowOdds) => {
  for (let i = 0; i < arr.length; i++) {
    if (dict[arr[i]] % 2 !== 0) {
      if (!allowOdds) return false;
      allowOdds = false;
    }
  }

  return true;
};

console.log(isPalindrome("Tact Coa"), true);
console.log(isPalindrome(" "), true);
console.log(isPalindrome("   "), true);
console.log(isPalindrome("aabb"), true);
console.log(isPalindrome("ab a b"), true);
console.log(isPalindrome("sa sadfgsadfgh jk;hjkz;sadfg hjk;dfghjk;"), true);
console.log(isPalindrome("abcadef"), false);
console.log(isPalindrome("1234567890"), false);
console.log(isPalindrome("a b"), false);