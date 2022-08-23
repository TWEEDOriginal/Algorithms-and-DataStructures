/**
 * Count the number of spaces in the string to calculate the new length of the
 * string and move characters back where required replacing spaces with %20.
 *
 * @example
 * // returns Mr%20John%20Smith
 * replaceSpaces("Mr John Smith    ")
 *
 * @param  {string } url - string with sufficient trailing space
 * @param  {number} trueLength - length of string without trailing space
 * @return {string}  Updated URL with spaces replaced with %20
 *
 * Time: O(n) where n trueLength
 * Additional space: O(1)
 */

 const replaceSpaces = (str) => {
    let newStr = "";
    for (let i of str.trim()) {

      if (i === " ") {
        newStr += "%20";
        continue;
      }
      newStr+= i
    }
    return newStr;
  };
  console.log(replaceSpaces("Mr John Smith    ", 13), "Mr%20John%20Smith");
  