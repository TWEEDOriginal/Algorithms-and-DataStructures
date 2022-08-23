/**
 * Count the number of spaces in the string to calculate the new length of the
 * string and move characters back where required replacing spaces with %20.
 *
 * @example
 * // returns Mr%20John%20Smith
 * replaceSpaces("Mr John Smith    ")
 *
 * @param  {string } url - string with sufficient trailing space
 * @return {string}  Updated URL with spaces replaced with %20
 *
 * Time: O(n) where n equals url.length
 * Additional space: O(n)
 */

const replaceSpaces = (str) => {
  const convertToArray = str.trim().split("");
  for (let i in convertToArray) {
    if (convertToArray[i] === " ") {
      convertToArray[i] = "%20";
    }
  }
  return convertToArray.join("");
};
console.log(replaceSpaces("Mr John Smith    ", 13), "Mr%20John%20Smith");
