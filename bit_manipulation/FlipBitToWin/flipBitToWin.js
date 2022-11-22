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
  const bin = num.toString(2);

  //no zero in binary
  if ((~num >>> 0).toString(2) == 0) {
    return bin.length;
  }

  let curr = 0,
    temp = 0;
  let longestSequence = 0;
  let tempSequence = 0;
  let flipped = false;

  while (curr < bin.length) {
    if (Number(bin[curr]) == 0) {
      if (!flipped) {
        tempSequence++;
        flipped = true;

        if (Number(bin[curr + 1]) == 1) {
          temp = curr + 1;
        }
      } else {
        longestSequence = Math.max(longestSequence, tempSequence);

        tempSequence = 0;
        flipped = false;

        if (Number(bin[curr - 1]) == 1) {
          tempSequence += curr - temp;
        }

        continue;
      }
    } else {
      tempSequence++;
    }
    curr++;
  }

  return Math.max(longestSequence, tempSequence);
};

const printResult = (array) => {
  for (let item of array) {
    console.log(flipBitToWin(item));
  }
};

printResult([1775, 500, 4294967295]);
