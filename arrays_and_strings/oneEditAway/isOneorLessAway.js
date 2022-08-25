/**
 * Scan through both strings's at the same time, when a difference is
 * encountered:
 *   * if this is the first edit:
 *     * if strings are the same length then consider it a replacement
 *     * if strings are different lengths then consider it a delete from the longer string
 *   * if this is the second edit then return false
 *
 * N = max(|str1|, |str2|)
 * Time: O(N)
 * Additional space: O(1)
 *
 * @param  {string}  str1 The first string
 * @param  {string}  str2 The second string
 * @return {boolean}      True if strings are 0 or 1 edit apart, otherwise false
 */
export function isOneOrLessAway(str1, str2) {
  // if lengths differ by more than 1 then can't be true
  if (Math.abs(str1.length - str2.length) > 1) {
    return false;
  }

  let isEdited = false;
  for (let i = 0, j = 0; i < str1.length && j < str2.length; ++i, ++j) {
    if (str1[i] !== str2[j]) {
      if (isEdited) {
        // second edit
        return false;
      }

      if (str1.length > str2.length) {
        --j; // decrease j, we are deleting char from str1
      }
      else if (str1.length < str2.length) {
        --i; // decrease i, we are deleting char from str2
      }
      isEdited = true;
    }
  }

  return true;
}

console.log(isOneOrLessAway('pale', 'ple'), true);
console.log(isOneOrLessAway('pales', 'pale'), true);
console.log(isOneOrLessAway('pale', 'bale'), true);
console.log(isOneOrLessAway('pale', 'pate'), true);
console.log(isOneOrLessAway('pale', 'pald'), true);
console.log(isOneOrLessAway('answers', 'answer'), true);
console.log(isOneOrLessAway('technology', 'etechnology'), true);
console.log(isOneOrLessAway('pale', 'bake'), false);
console.log(isOneOrLessAway('pale', 'pl'), false);
console.log(isOneOrLessAway('pale', 'bales'), false);
console.log(isOneOrLessAway('abcdefghiz', 'ihgfedcbaa'), false);
console.log(isOneOrLessAway('1122334455667788', '9911223344556677'), false);
console.log(isOneOrLessAway('45678', '1239'), false);
console.log(isOneOrLessAway('abcd', 'dcba'), false);