/**
 * solves a crossword puzzle
 *
 * r = |row|
 * c = |column|
 * w = |words|
 * Time: O(rc + w)
 * Additional space: O(rc)
 *
 * @param  {array} string[] - crossword
 * @param  {array} string[] - words
 * @return {array} string[] - crossword
 */

function removeWord(crossword, word, space, end) {
  console.log("removing word", word, space, end);
  if (space.type === "horizontal") {
    for (let i = space.start; i <= end; i++) {
      //another word is occupying vertical space and is using that letter
      if (
        (crossword[space.row - 1] &&
          !["+", "-"].includes(crossword[space.row - 1][i])) ||
        (crossword[space.row + 1] &&
          !["+", "-"].includes(crossword[space.row + 1][i]))
      ) {
        continue;
      }
      crossword[space.row][i] = "-";
    }
  } else if (space.type === "vertical") {
    for (let i = space.start; i <= end; i++) {
      //another word is occupying horizontal space and is using that letter
      if (
        (crossword[i][space.col - 1] &&
          !["+", "-"].includes(crossword[i][space.col - 1])) ||
        (crossword[i][space.col + 1] &&
          !["+", "-"].includes(crossword[i][space.col + 1]))
      ) {
        continue;
      }
      crossword[i][space.col] = "-";
    }
  } else {
    crossword[end] = "-";
  }
}

function fillSpace(crossword, word, space) {
  console.log("fillSpace params", word, space);
  let pointer = space.start;
  if (space.type === "horizontal") {
    for (let letter of word) {
      // a different letter in that position
      if (![letter, "-"].includes(crossword[space.row][pointer])) {
        break;
      }

      crossword[space.row][pointer] = letter;
      pointer++;
    }
  } else if (space.type === "vertical") {
    for (let letter of word) {
      // a different letter in that position
      if (![letter, "-"].includes(crossword[pointer][space.col])) {
        break;
      }
      crossword[pointer][space.col] = letter;
      pointer++;
    }
  } else {
    crossword[space.row][space.col] = letter;
    return true;
  }

  console.log("pointerrr", pointer);

  if (pointer <= space.end) {
    if (pointer > space.start) {
      removeWord(crossword, word, space, pointer - 1);
    }
    return false;
  }

  //if pointer === end return true
  return true;
}

function solveCrossword(crossword, wordCountMap, spaces, spaceIndex, visited) {
  //if lastSpaceIndex add w
  const space = spaces[spaceIndex];
  const spaceLength = space.end - space.start + 1;

  for (let word of wordCountMap.get(spaceLength)) {
    if (visited.has(word)) continue;
    //forward (if result of forward is negative continue)
    console.log("attempting to fill space with word", word);
    if (!fillSpace(crossword, word, space)) continue;
    visited.add(word);
    console.log("filled space with word", word);
    //final space has been filled
    if (spaceIndex === spaces.length - 1) return true;

    if (
      solveCrossword(crossword, wordCountMap, spaces, spaceIndex + 1, visited)
    )
      return true;
    removeWord(crossword, word, space, space.end);
    visited.delete(word);
  }

  return false;
}

function getSpaces(crossword) {
  const spaces = [];
  for (let r = 0; r < crossword.length; r++) {
    crossword[r] = crossword[r].split("");
    let c = 0;
    while (c < crossword[0].length) {
      if (crossword[r][c] === "-") {
        //vertical space
        if (
          (!crossword[r - 1] || crossword[r - 1][c] != "-") &&
          crossword[r + 1] &&
          crossword[r + 1][c] == "-"
        ) {
          let end = r;
          while (crossword[end + 1] && crossword[end + 1][c] == "-") {
            end++;
          }

          spaces.push({ col: c, start: r, end, type: "vertical" });
        }
        //horizontal space
        if (crossword[r][c - 1] != "-" && crossword[r][c + 1] == "-") {
          let end = c;
          while (crossword[r][end + 1] && crossword[r][end + 1] == "-") {
            end++;
          }
          spaces.push({ row: r, start: c, end, type: "horizontal" });
        }

        //isolated letter
        if (
          crossword[r][c + 1] != "-" &&
          crossword[r][c - 1] != "-" &&
          (!crossword[r + 1] || crossword[r + 1][c] != "-") &&
          (!crossword[r - 1] || crossword[r - 1][c] != "-")
        ) {
          spaces.push({
            row: r,
            column: c,
            type: "single letter",
          });
        }
      }
      c++;
    }
  }
  return spaces;
}

function crosswordPuzzle(crossword, words) {
  // Write your code here
  const wordCountMap = new Map();
  for (let word of words.split(";")) {
    const wordLength = word.length;
    if (wordCountMap.has(wordLength)) wordCountMap.get(wordLength).push(word);
    else {
      wordCountMap.set(wordLength, [word]);
    }
  }
  // get all valid spaces
  const spaces = getSpaces(crossword);

  const visited = new Set();
  solveCrossword(crossword, wordCountMap, spaces, 0, visited);

  for (let r = 0; r < crossword.length; r++) {
    crossword[r] = crossword[r].join("");
  }

  return crossword;
}

console.log(
  crosswordPuzzle(
    [
      "+-++++++++",
      "+-++-+++++",
      "+-------++",
      "+-++-+++++",
      "+-++-+++++",
      "+-++-+++++",
      "++++-+++++",
      "++++-+++++",
      "++++++++++",
      "----------",
    ],
    "CALIFORNIA;NIGERIA;CANADA;TELAVIV"
  )
);
