/**
 *
 * returns the number of bit flips
 * required to convert one number
 * to another
 *
 * b = number of bits when converted to binary
 * Time: O(b)
 * Additional space: O(1)
 *
 * @param  {number} Integer
 * @return {number}
 *
 */

const conversion = (num0, num1) => {
  let flipCount = 0;

  while (num0 !== 0 || num1 !== 0) {
    if ((num1 & 1) != (num0 & 1)) flipCount++;

    num0 >>>= 1;
    num1 >>>= 1;
  }
  return flipCount;
};

const printResult = (array) => {
  for (let [item0, item1] of array) {
    try {
      console.log(conversion(item0, item1));
    } catch (e) {
      console.error(e);
    }
  }
};

printResult([[29, 15]]);
