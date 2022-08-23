/**
 * Count the number of spaces in the string to calculate the new length of the
 * string and move characters back where required replacing spaces with %20.
 *
 * @example
 * // returns Mr%20John%20Smith
 * replaceSpaces("Mr John Smith    ", 13)
 *
 * @param  {string } url - string with sufficient trailing space
 * @param  {number} trueLength - length of string without trailing space
 * @return {string}  Updated URL with spaces replaced with %20
 *
 * Time: O(trueLength)
 * Additional space: O(n) where n equals url.length
 */

const replaceSpaces = (str, trueLength) => {
  let spaceCount = 0,
    i,
    index;
  for (i = 0; i < trueLength; i++) {
    if (str[i] === " ") {
      spaceCount++;
    }
  }
  index = trueLength + spaceCount * 2 - 1;

  let strArray = str.split("");

  for (i = trueLength - 1; i >= 0; i--) {
    if (str[i] !== " ") {
      strArray[index] = str[i];
      index--;
    } else {
      strArray[index] = "0";
      strArray[index - 1] = "2";
      strArray[index - 2] = "%";
      index -= 3;
    }
  }
  return strArray.join("");
};
console.log(replaceSpaces("Mr John Smith    ", 13), "Mr%20John%20Smith");
