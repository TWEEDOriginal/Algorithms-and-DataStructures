/**
 * Converts given string to an object
 * as shown in the example below
 *
 * @example
 *
 * Input
 * optionRule =
 * "{1069} AND ({1070} OR {1071} OR {1072}) AND {1244} AND ({1245} OR {1339})";
 *
 * // returns
 *
 * Output
 * const output = {
 * and: [
 * 1069,
 * { or: [1070, 1071, 1072] },
 * 1244,
 * { or: [1245, 1339] },
 * ]
 * };
 *
 * N = |str|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {string} str to convert
 * @param  {number} index to begin with
 * @return {dictionary}  object
 *
 */

function convert(str, index) {
  const output = {};
  let numbersArray = [];
  let i = index;
  let numberBeginning, currentKey;
  while (i < str.length) {
    if (str[i] == "{") {
      i++;
      numberBeginning = i;
      while (str[i] != "}") {
        i++;
      }
      if (!currentKey) {
        numbersArray.push(Number(str.substring(numberBeginning, i)));
      } else {
        output[currentKey].push(Number(str.substring(numberBeginning, i)));
      }
    } else if (str[i] == "A" && str.substring(i, i + 3) === "AND") {
      if (!currentKey) {
        output["and"] = numbersArray;
        currentKey = "and";
      }
      i = i + 3;
    } else if (str[i] == "O" && str.substring(i, i + 2) === "OR") {
      if (!currentKey) {
        output["or"] = numbersArray;
        currentKey = "or";
      }
      i = i + 2;
    } else if (str[i] == "(") {
      //recurse
      i++;
      const [item, index] = convert(str, i);
      i = index;
      if (!currentKey) {
        numbersArray.push(item);
      } else {
        output[currentKey].push(item);
      }
    } else if (str[i] == ")") {
      return [output, i];
    }
    i++;
  }
  return [output, i];
}
let optionRule =
  "{1069} AND ({1070} OR {1071} OR {1072}) AND {1244} AND ({1245} OR {1339})";
let result = convert(optionRule, 0);
console.log(result[0]);
console.log(JSON.stringify(result[0], null, 2));

optionRule =
  "{1069} OR ({1070} AND {1071} AND {1072}) OR {1244} OR ({1245} AND {1339})";
result = convert(optionRule, 0);
console.log(result[0]);
console.log(JSON.stringify(result[0], null, 2));

optionRule =
  "({1070} OR {1071} OR {1072}) AND {1069} AND {1244} AND ({1245} OR {1339})";
result = convert(optionRule, 0);
console.log(result[0]);
console.log(JSON.stringify(result[0], null, 2));
