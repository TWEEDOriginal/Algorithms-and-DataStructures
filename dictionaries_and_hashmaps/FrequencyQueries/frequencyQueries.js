/**
 * given a number of queries. Each query is of the form two integers described below:
 * 1 x : Insert x in your data structure.
 * 2 y : Delete one occurence of y from your data structure, if present.
 * 3 z : Check if any integer is present whose frequency is exactly . If yes, print 1 else 0.
 *
 * N = |queries|
 * Time: O(N)
 * Additional space: O(N)
 *
 * @param  {array}  int[][] - queries
 * @return {array}   int[] - each item is the result of a z frequency check
 */

function freqQuery(queries) {
  //keeps indices of of items in your data structure
  const hMap = {},
    // your data structure
    arr = [];

  // maps an array of all the items with a particular count
  const countMap = {};

  // array with logg responses
  const returnArray = [];
  let logg = 0;

  let query_i_0, x_y_or_z, last_index, hmapItemLength;

  for (let i = 0; i < queries.length; i++) {
    query_i_0 = queries[i][0];
    x_y_or_z = queries[i][1];

    if (query_i_0 === 1) {
      arr.push[x_y_or_z];

      if (hMap[x_y_or_z]) {
        // add new x index to hmap[x] array
        hMap[x_y_or_z].push(arr.length - 1);
        hmapItemLength = hMap[x_y_or_z].length;
        last_index = hmapItemLength - 1;

        //remove element from former countMap count
        //e.g if x previously occured 4 times make it 5
        last_index > 0 ? countMap[last_index].pop(x_y_or_z) : null;

        countMap[hmapItemLength]
          ? countMap[hmapItemLength].push(x_y_or_z)
          : (countMap[hmapItemLength] = [x_y_or_z]);

        continue;
      }

      hMap[x_y_or_z] = [arr.length - 1];
      countMap[1] ? countMap[1].push(x_y_or_z) : (countMap[1] = [x_y_or_z]);
    } else if (query_i_0 === 2) {
      if (hMap[x_y_or_z] && hMap[x_y_or_z].length > 0) {
        hmapItemLength = hMap[x_y_or_z].length;
        last_index = hmapItemLength - 1;

        arr[hMap[x_y_or_z][last_index]] = undefined;
        // remove the last y index from hmap[y] array
        hMap[x_y_or_z].pop();

        //remove element from former countMap count
        //e.g if y previously occured 5 times make it 4
        countMap[hmapItemLength].pop(x_y_or_z);
        // last_index is now new length
        last_index > 0 ? countMap[last_index].push(x_y_or_z) : null;
      }
    } else {
      logg = 0;

      // check if countMap[z] exists and it has up to 1 item
      //that occurs z times
      if (countMap[x_y_or_z] && countMap[x_y_or_z].length > 0) {
        logg = 1;
      }
      returnArray.push(logg);
    }
  }
  return returnArray;
}

console.log(
  freqQuery([
    [1, 5],
    [1, 6],
    [3, 2],
    [1, 10],
    [1, 10],
    [1, 6],
    [2, 5],
    [3, 2],
  ]),
  [0, 1]
);
