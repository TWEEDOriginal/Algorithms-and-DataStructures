import optimizedCountAnagramOccurrences from "../../arrays_and_strings/countAnagrams/optimizedCountAnagrams.js";

function sherlockAndAnagrams(s) {
  // Write your code here
  let pairsCount = 0;
  let tempStr = "",
    subStr = "",
    tempCount = 0;
  for (let i = 0; i < s.length - 1; i++) {
    tempStr = "";
    for (let j = i; j < s.length; j++) {
      tempStr += s[j];
      subStr = s.substring(i + 1, s.length);
      //count number of anagrams of tempStr
      //from  i+1 upwards

      tempCount = optimizedCountAnagramOccurrences(tempStr, subStr);

      pairsCount = tempCount ? pairsCount + tempCount : pairsCount;
    }
  }
  return pairsCount;
}
console.log(sherlockAndAnagrams("ifailuhkqq"), 3);
console.log(sherlockAndAnagrams("kkkk"), 10);
console.log(sherlockAndAnagrams("abba"), 4);
console.log(sherlockAndAnagrams("abcd"), 0);
console.log(sherlockAndAnagrams("cdcd"), 5);
