/**
 * Ensure that an opening bracket
 * occurs to the left of a closing bracket
 *
 * N = |String|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {string}
 * @return {string} YES | NO
 */

import { Stack } from "../helpers/stack.js";

function isBalanced(s) {
  const opening = ["{", "[", "("];
  const dict = { "}": "{", "]": "[", ")": "(" };

  const stack = new Stack();
  let stack_top = null,
    char;

  for (let i = 0; i < s.length; i++) {
    char = s[i];

    if (opening.includes(char)) {
      stack.push(char);
      continue;
    }
    stack_top = stack.top;

    if (!stack_top || dict[char] != stack_top.data) return "NO";

    stack.pop();
  }
  if (stack.top) return "NO";

  return "YES";
}

console.log(isBalanced("{[()]}"), "YES");
console.log(isBalanced("{[(])}"), "NO");
console.log(isBalanced("{{[[(())]]}}"), "YES");
console.log(isBalanced("{{([])}}"), "YES");
console.log(isBalanced("{{)[](}}"), "NO");
console.log(isBalanced("{(([])[])[]}"), "YES");
console.log(isBalanced("{(([])[])[]]}"), "NO");
console.log(isBalanced("{(([])[])[]}[]"), "YES");
