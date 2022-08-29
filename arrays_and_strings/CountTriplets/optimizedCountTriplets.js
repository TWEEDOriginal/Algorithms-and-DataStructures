/**
 * finds the number of triplets of indices (i,j,k) in an ordered array
 * such that the elements at those indices are in geometric progression
 * for a given common ratio r and i < j < k
 *
 * N = |arr|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array}  int[]
 * @return {number}  - r common ratio
 */

// declare function and pass it input array and ratio integer
function countTriplets(arr, r) {
  // keeps count of occurrences of integer within array
  const hGram = {};

  // keeps count of occurrences of number which can be middle digit of
  // a potential triplet
  const hGram2 = {};

  // counts number of complete triplets
  let count = 0;

  // if arr contains less than 3 integers, no triplet can exist
  if (arr.length < 3) return 0;

  // decrementing for loop traverses the array from its end which
  // enables multiplication to be used to evaluate other
  // possible triplet digits instead of division which is more
  // computationally expensive
  for (let i = arr.length - 1; i >= 0; i--) {
    // current arr element being evaluated
    // represents 1st digit of potential triplet
    let t1 = arr[i];

    // represents 2nd digit of potential triplet
    let t2 = t1 * r;

    // represents 3rd digit of potential triplet
    let t3 = t2 * r;

    // case 1: current element is the first digit of potential triplet
    // i.e. potential triplet = [t1, t1*r, t1*r*r]
    // which means the second and third digits of potential triplet have // been vetted
    // increment count by value associated to the key of hGram2[t3]
    // wherein said key = 3rd digit of potential triplet
    // otherwise, if said value is null, increment count by 0
    count += hGram2[t3] || 0;

    // case 2: current element is the second digit of potential triplet
    // i.e. potential triplet = [t1/r, t1, t1*r]
    // which means the third digit of potential triplet has been vetted
    // if hGram2 already includes key of current element
    // increment value associated to said key by the value associated
    // to the key of hGram[t2], unless it's null, then to 0.
    // otherwise, add key of current element to hGram2 and set value to
    // the value associated to the key of hGram[t2]
    // unless it's null, then to 0.
    hGram2[t2] ? (hGram2[t2] += hGram[t2] || 0) : (hGram2[t2] = hGram[t2] || 0);

    // case 3: current element is the third digit of potential triplet
    // potential triplet = [t1/r/r, t1/r, t1]
    // which means the first and second digits of potential triplet have
    // NOT been vetted
    // if hGram already includes key of current element
    // increment value associated to said key by 1
    // otherwise, add key of current element to hGram and set value to 1
    hGram[t1] ? hGram[t1]++ : (hGram[t1] = 1);
  }

  // return total count of valid triplets within input array
  return count;
}

console.log(countTriplets([1, 2, 2, 4], 2), 2);
