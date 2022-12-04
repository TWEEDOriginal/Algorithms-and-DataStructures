/**
 *
 * returns the next smallest and next largest
 * number with same number of 1s in bit rep
 *
 * b = number of bits when converted to binary
 * Time: O(b)
 * Additional space: O(1)
 *
 * @param  {number} Integer 
 * @return {number}
 *
 */

const getNextSmallest = (num) => {
  let temp = num;
  let zeroCount = 0;
  let onesCount = 0;
  let zeroToOneBit;
  //first set of ones from lsb upwards
  while ((temp & 1) == 1) {
    onesCount++;
    temp >>>= 1;
  }

  if (temp == 0) return -1;

  //next set of ones after set of zeros
  while ((temp & 1) == 0 && temp != 0) {
    zeroCount++;
    temp >>>= 1;
  }

  zeroToOneBit = onesCount + zeroCount;
  num &= ~0 << (zeroToOneBit + 1);
  const mask = (1 << (onesCount + 1)) - 1;
  num |= mask << (zeroCount - 1);

  return num;
};

const getNextLargest = (num) => {
  let temp = num;
  let zeroCount = 0;
  let onesCount = 0;
  let zeroToOneBit;
  //first set of zeros from lsb upwards
  while ((temp & 1) == 0 && temp != 0) {
    zeroCount++;
    temp >>>= 1;
  }
  //next set of ones after set of zeros
  while ((temp & 1) == 1) {
    onesCount++;
    temp >>>= 1;
  }
  if (zeroCount + onesCount == 31 || zeroCount + onesCount == 0) return -1;

  zeroToOneBit = onesCount + zeroCount;

  num |= 1 << zeroToOneBit; //flip 0 to 1
  num &= ~((1 << zeroToOneBit) - 1);
  num |= (1 << (onesCount - 1)) - 1;
  return num;
};

const nextNumber = (num) => {
  const nextSmallest = getNextSmallest(num);
  const nextLargest = getNextLargest(num);
  const integers = [nextSmallest, num, nextLargest];
  const binary = [
    nextSmallest.toString(2),
    num.toString(2),
    nextLargest.toString(2),
  ];
  return { integers, binary };
};

const printResult = (array) => {
  for (let item of array) {
    try {
      console.log(nextNumber(item));
    } catch (e) {
      console.error(e);
    }
  }
};

printResult([1775, 13948, 500, 4294967295, -1, 6]);
