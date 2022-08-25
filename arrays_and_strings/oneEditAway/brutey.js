/** edit == insert, remove or replace
 * check two strings are one edit or zero edit away from being similar
 *
 * @example
 * // returns true
 * oneAway('pale', 'ple')
 *
 * @param  {string } str - First string to compare
 * @param  {string } str - Second string to compare
 * @return {boolean}  True if only one edit or zero edit is required
 *                    otherwise false
 *
 * Time: O(n) where n equals length of smaller string
 * Additional space: O(n) where n equals length of bigger string
 */


const oneAway = (str1, str2) => {
    if (str1 === str2) return true
   let l1 = str1.length, l2 = str2.length;
   
   if(Math.abs(l1 - l2) > 1) return false;
   
   let edits = 0, min_l, small, big;
   if (l1 >= l2){
       min_l = l2
       big = str1
       small = str2
   }
   else {
       min_l = l1
       big = str2
       small = str1
   }
   let j = 0;
   for(let i = 0; i< min_l; i++){
       
       if(small[j] === big[i]) {
           j++
           continue
       }
       edits++
       if(edits > 1) {
           return false; }
       if(big[i+1] === small[j]) {
       continue
       }
       j++
   }
   
   if(big[min_l] !== small[j]) {
       edits++
   }
   
   return edits <= 1? true: false;
 };
 
console.log(oneAway('pale', 'ple'), true);
console.log(oneAway('pales', 'pale'), true);
console.log(oneAway('pale', 'bale'), true);
console.log(oneAway('pale', 'pate'), true);
console.log(oneAway('pale', 'pald'), true);
console.log(oneAway('answers', 'answer'), true);
console.log(oneAway('technology', 'etechnology'), true);
console.log(oneAway('pale', 'bake'), false);
console.log(oneAway('pale', 'pl'), false);
console.log(oneAway('pale', 'bales'), false);
console.log(oneAway('abcdefghiz', 'ihgfedcbaa'), false);
console.log(oneAway('1122334455667788', '9911223344556677'), false);
console.log(oneAway('45678', '1239'), false);
console.log(oneAway('abcd', 'dcba'), false);
 

 
 
 
 
 