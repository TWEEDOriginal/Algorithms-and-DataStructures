/**
 *
 * Inserts a number m into n
 * between two bit positions
 * i and j
 *
 * N = size of linkedlist
 * Time: O(1)
 * Additional space: O(1)
 *
 * @param  {number} Bit - 32 bit number n
 * @param  {number} Bit - 32 bit number m
 * @param  {number} Decimal - Bit position
 * @param  {number} Decimal - Bit position
 * @return {number}
 */

const insertion = (n, m, i, j) => {
  //leftShift M by i bits
  m = m << 2;

  // clearAllBits in n that are between i and j
  const x = ~(-1 << i);
  const y = -1 << (j + 1);
  const mask = x | y;
  n = n & mask;

  // insert m into n
  n = n | m;
  console.log((n >>> 0).toString(2));

  return n;
};
console.log(insertion(0b10000000000, 0b10011, 2, 6));
