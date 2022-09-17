/**
 * Determines if a string is valid if all
 * characters appear the same number of
 * times with or without removal of a
 * single character
 *
 *
 * N = string length
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {string}
 * @return {string} - YES || NO
 */

function isValid(s) {
  let removed = false,
    difference;

  // maps the frequency of occurence
  // for each character
  const map = {};
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = (map[s[i]] || 0) + 1;
  }

  // character count with the most characters 
  let chosenLength = map[s[0]];

  // map how many characters appear
  // x amount of times
  const counter = {};
  counter[map[s[0]]] = 1;
  for (let key of Object.keys(map).slice(1)) {
    if (counter[map[key]]) {
      counter[map[key]]++;
      chosenLength =
        counter[map[key]] > counter[chosenLength] ? map[key] : chosenLength;
      continue;
    }
    counter[map[key]] = 1;
  }

  for (let key of Object.keys(counter)) {
    if (Number(key) === chosenLength) continue;

    // removal should make it 0 or equal to chosenLength
    difference = Number(key) - 1;
    if (
      removed ||
      counter[key] >= 2 ||
      (difference != 0 && difference != chosenLength)
    )
      return "NO";
    removed = true;
  }
  return "YES";
}

console.log(isValid("aabbcd"), "NO");
console.log(isValid("aabbccddeefghi"), "NO");
console.log(isValid("abcdefghhgfedecba"), "YES");
console.log(
  isValid(
    "ibfdgaeadiaefgbhbdghhhbgdfgeiccbiehhfcggchgghadhdhagfbahhddgghbdehidbibaeaagaeeigffcebfbaieggabcfbiiedcabfihchdfabifahcbhagccbdfifhghcadfiadeeaheeddddiecaicbgigccageicehfdhdgafaddhffadigfhhcaedcedecafeacbdacgfgfeeibgaiffdehigebhhehiaahfidibccdcdagifgaihacihadecgifihbebffebdfbchbgigeccahgihbcbcaggebaaafgfedbfgagfediddghdgbgehhhifhgcedechahidcbchebheihaadbbbiaiccededchdagfhccfdefigfibifabeiaccghcegfbcghaefifbachebaacbhbfgfddeceababbacgffbagidebeadfihaefefegbghgddbbgddeehgfbhafbccidebgehifafgbghafacgfdccgifdcbbbidfifhdaibgigebigaedeaaiadegfefbhacgddhchgcbgcaeaieiegiffchbgbebgbehbbfcebciiagacaiechdigbgbghefcahgbhfibhedaeeiffebdiabcifgccdefabccdghehfibfiifdaicfedagahhdcbhbicdgibgcedieihcichadgchgbdcdagaihebbabhibcihicadgadfcihdheefbhffiageddhgahaidfdhhdbgciiaciegchiiebfbcbhaeagccfhbfhaddagnfieihghfbaggiffbbfbecgaiiidccdceadbbdfgigibgcgchafccdchgifdeieicbaididhfcfdedbhaadedfageigfdehgcdaecaebebebfcieaecfagfdieaefdiedbcadchabhebgehiidfcgahcdhcdhgchhiiheffiifeegcfdgbdeffhgeghdfhbfbifgidcafbfcd"
  ),
  "YES"
);
