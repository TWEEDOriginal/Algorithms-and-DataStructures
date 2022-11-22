/**
 *
 * converts a number btw 0 and 1
 * to it's binary representation
 *
 * at most 32 times which is a constant so 1
 * Time: O(1) 
 * Additional space: O(1)
 *
 * @param  {number} Double - Decimal Number
 * @return {binary}
 * 
 */

const binaryToString = (num) => {
  if (num <= 0 || num >= 1) return "ERROR";

  const n = ["."];
  let charCount = 2;

  while (charCount < 32) {
    num = num * 2;
    if (num < 1) {
      n.push(0);
    } else {
      n.push(1);
      if (num == 1) {
        return n.join("");
      }
      num -= 1;
    }
    charCount++;
  }
  return "ERROR";
};

const printResult = (array) => {
  for (let item of array) {
    console.log(binaryToString(item));
  }
};

printResult([0.25, 0.5, 0.625, 0.75, 0, 0.33, 0.4, 0.6255, 0.72, 1]);
