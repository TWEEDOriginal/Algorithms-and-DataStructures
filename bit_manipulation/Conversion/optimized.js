/**
 *
 * returns the number of bit flips
 * required to convert one number
 * to another
 *
 * n = number of flips
 * Time: O(n)
 * Additional space: O(1)
 *
 * @param  {number} Integer
 * @return {number}
 *
 */

const conversion = (num0, num1) => {
  let flipCount = 0;

  for (let i = num0 ^ num1; i != 0; i = i & (i - 1)) {
    flipCount++;
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
