/**
 * The number of goals achieved by two football
 * teams in matches in a league is given in the form
 * of two lists. For each match of team B, compute
 * the total number of matches of team A where
 * team A has scored less than or equal to the
 * number of goals scored by team B in that match.
 *
 *
 * N = |array1|
 * M = |array2|
 * Time: O(N + NlogN + M)
 * Additional space: O(N+M)
 *
 * @param  {array} int[] - goals scored in teamA matches
 * @param  {array} int[] - goals scored in teamB matches
 * @return {array} int[] - number of matches for
 *                         each team B match
 */

function counts(teamA, teamB) {
  const res = [];
  teamA.sort();

  const map = {};
  for (let i = 0; i < teamA.length; i++) {
    map[teamA[i]] = i + 1;
  }

  let x, count;
  for (let j = 0; j < teamB.length; j++) {
    x = teamB[j];
    while (!map[x] && x >= 1) {
      x--;
    }
    count = map[x] ? map[x] : 0;
    res.push(count);
  }
  return res;
}

console.log(counts([1, 2, 3], [2, 4]));
console.log(counts([1, 4, 1, 5, 9], [3, 1, 5, 10])); 
console.log(counts([1, 2, 3, 4, 7, 9], [0, 1, 2, 1, 1, 4]));
console.log(counts([0, 0, 0, 1, 2, 3, 4, 7, 9], [0, 1, 2, 1, 1, 4]));
