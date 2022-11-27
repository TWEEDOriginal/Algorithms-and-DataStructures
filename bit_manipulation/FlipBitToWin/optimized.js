/**
 *
 * finds longest sequence of ones
 * after flipping just one bit
 *
 * b = number of bits when converted to binary
 * Time: O(b)
 * Additional space: O(1)
 *
 * @param  {number} Integer - Decimal Number
 * @return {number}
 *
 */

const flipBitToWin = (num) => {
  if ((~num >>> 0).toString(2) == 0) {
    const bin = num.toString(2);
    console.log(bin);
    return bin.length;
  }
  let currentLength = 0;
  let previousLength = 0;
  let maxLength = 0;

  while (num !== 0) {
    //check if value of LSB is 1 or 0
    if ((num & 1) == 1) {
      currentLength++;
    } else {
      //check if the bit to the left of LSB is a 1 or 0
      previousLength = (num & 2) == 2 ? currentLength : 0;
      currentLength = 0;
    }

    maxLength = Math.max(previousLength + 1 + currentLength, maxLength);

    //logical right shift
    num >>>= 1;
  }
  return maxLength;
};

const printResult = (array) => {
  for (let item of array) {
    console.log(flipBitToWin(item));
  }
};

printResult([1775, 500, 4294967295]);
