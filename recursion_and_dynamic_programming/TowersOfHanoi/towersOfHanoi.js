/**
 * solves the tower of hanoi problem
 *
 * n = |disks|
 * Time: O(2^n)
 * Additional space: O(n)
 *
 * @param  {array}  number[][] - towers
 * @param  {number} - numberOfDisks
 * @param  {number} - origin tower
 * @param  {number} - destination tower
 * @param  {number} - other tower
 * @return {array}  number[][] - towers with moved disks
 */

function move(towers, startIndex, destIndex) {
  towers[destIndex].push(towers[startIndex].pop());
  console.log("after move", towers);
}

function solve(towers, noOfDisks, startIndex, destIndex, otherIndex) {
  if (noOfDisks == 1) {
    move(towers, startIndex, destIndex);
    return;
  }

  const noOfChildren = noOfDisks - 1;

  solve(towers, noOfChildren, startIndex, otherIndex, destIndex);
  move(towers, startIndex, destIndex);

  solve(towers, noOfChildren, otherIndex, destIndex, startIndex);
}

//bottom of tower is index 0
const Hanoi = [
  [[3, 2, 1], [], []],
  [[4, 3, 2, 1], [], []],
  [[7, 6, 5, 4, 3, 2, 1], [], []],
];

for (let towers of Hanoi) {
  console.log(towers);
  solve(towers, towers[0].length, 0, 2, 1);
  console.log(towers);
}
