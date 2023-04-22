/**
 * Implementation of an N*N Jigsaw puzzle
 *
 * # classes
 * - Edge        -> contains shape and if it's a border or not
 * - PuzzlePiece -> has the actual orientation of the piece
 *                    which is only used during creation because
 *                    irl we won't know the actual orientation
 *                    of a piece just by looking at it. It also
 *                    has an array of edges which can be any of
 *                    the 4 possible orientations of a puzzle piece.
 * - Jigsaw      -> for creation of the puzzle and for solving too
 *
 *
 * ## Main Operations
 *   - incrementEdgeIndex()  -> for setting the edge shape and it also
 *                               makes it harder to solve by making a
 *                               shape appear multiple times.
 *   - shuffle()             -> for shuffling the array that contains all the
 *                               puzzle pieces, to make it harder to solve.
 *   - createPuzzlePiece(i)  -> for creating each puzzle in N*N
 *
 *
 *
 *
 * # Algorithm for solving the puzzle
 * - groupSimilarPieces()  -> maps corner pieces, inside pieces and
 *                            border pieces based on the edge shape.
 * - rotate(positions)     -> for setting the puzzle orientation to the
 *                             desired orientation based on the index
 *                             of the actual top and left sides
 * - setPosition(s, p)     -> for setting the correct position of a piece in
 *                             in the result matrix, starting from choosing
 *                             an arbitrary corner piece placed in the top
 *                             left corner and inserting each piece column
 *                             by column for each row till the last piece
 *                             has been fitted.
 *
 *
 */

class Edge {
  constructor(shapeId, isOutsideEdge) {
    this.shapeId = shapeId; //indicates the shape
    this.isOutsideEdge = isOutsideEdge;
  }
}

class PuzzlePiece {
  constructor(top, bottom, left, right, outsideEdgeCount, pieceIndex) {
    //Not to be used for solving the puzzle
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.isCorner = false;
    this.isBorder = false;
    this.index = pieceIndex;

    if (outsideEdgeCount >= 1) {
      this.isBorder = true;
      if (outsideEdgeCount === 2) this.isCorner = true;
    }

    //ideally it should be randomly selected
    const clockwisePatterns = ["TRBL", "RBLT", "BLTR", "LTRB"];
    // to simulate not knowing the actual orientation of a piece
    const choice =
      clockwisePatterns[Math.floor(Math.random() * clockwisePatterns.length)];

    //use sides to solve
    switch (choice) {
      case "TRBL":
        this.sides = [top, right, bottom, left];
        break;
      case "RBLT":
        this.sides = [right, bottom, left, top];
        break;
      case "BLTR":
        this.sides = [bottom, left, top, right];
        break;
      case "LTRB":
        this.sides = [left, top, right, bottom];
        break;
    }
  }

  //rotate method (contains index of top and left sides)
  rotate(positions) {
    //TRBL
    if (positions.has(0) && positions.has(3)) return;
    //RBLT to TRBL
    else if (positions.has(3) && positions.has(2)) {
      this.sides = [this.sides[3], this.sides[0], this.sides[1], this.sides[2]];
      return;
    }
    //BLTR to TRBL
    else if (positions.has(2) && positions.has(1)) {
      this.sides = [this.sides[2], this.sides[3], this.sides[0], this.sides[1]];
      return;
    }
    //LTRB to TRBL
    else if (positions.has(1) && positions.has(0)) {
      this.sides = [this.sides[1], this.sides[2], this.sides[3], this.sides[0]];
      return;
    }
  }
}

class Jigsaw {
  constructor(n) {
    this.pieces = [];
    this.currentEdgeIndex = 0;
    this.currentPieceIndex = 0;
    this.halfOfnumberOfEdges = n ** 2 + n;
    this.n = n;
    const numberOfPieces = n * n;
    this.cornerPieces = [];
    this.cornerPieceMap = new Map();
    this.borderPieceMap = new Map(); //for those with just one outsideEdge
    this.insidePieceMap = new Map();
    this.matrix = this.initializeMatrix(n);
    this.visited = new Set();

    //so a puzzle edge can have 2 possible matches, to increase complexity
    //only true match for (left right) is the one that the top and bottom match are shared
    //only true match for (top bottom) is the one that the left and right match are shared

    while (this.currentPieceIndex < numberOfPieces) {
      const newPiece = this.createPuzzlePiece(this.currentPieceIndex);
      this.pieces.push(newPiece);
      this.currentPieceIndex++;
    }
    console.log("pre shuffle", this.pieces, this.pieces.length);
    this.shuffle();
    console.log("post shuffle", this.pieces, this.pieces.length);
  }

  incrementEdgeIndex() {
    this.currentEdgeIndex++;

    //for simulating multiple edges having the same shape
    this.currentEdgeIndex =
      this.currentEdgeIndex == this.halfOfnumberOfEdges
        ? 0
        : this.currentEdgeIndex;
  }

  shuffle() {
    let currentIndex = this.pieces.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.pieces[currentIndex], this.pieces[randomIndex]] = [
        this.pieces[randomIndex],
        this.pieces[currentIndex],
      ];
    }

    return;
  }

  createPuzzlePiece(pieceIndex) {
    let top;
    const n = this.n;
    let outsideEdgeCount = 0;
    if (pieceIndex < n) {
      top = new Edge(this.currentEdgeIndex, true);
      outsideEdgeCount++;
      this.incrementEdgeIndex();
    } else {
      //negative of bottom shapeId to simulate inverted shape
      const topIndex = -this.pieces[pieceIndex - n].bottom.shapeId;
      top = new Edge(topIndex, false);
    }

    let isBottomOutsideEdge = false;
    const x = n * (n - 1);
    if (pieceIndex >= x) {
      isBottomOutsideEdge = true;
      outsideEdgeCount++;
    }

    const bottom = new Edge(this.currentEdgeIndex, isBottomOutsideEdge);
    this.incrementEdgeIndex();
    let left;
    if (pieceIndex % n == 0) {
      left = new Edge(this.currentEdgeIndex, true);
      outsideEdgeCount++;
      this.incrementEdgeIndex();
    } else {
      //negative of right shapeId to simulate inverted shape
      const leftIndex = -this.pieces[pieceIndex - 1].right.shapeId;
      left = new Edge(leftIndex, false);
    }

    let isRightOutsideEdge = false;
    if ((pieceIndex + 1) % n == 0) {
      isRightOutsideEdge = true;
      outsideEdgeCount++;
    }

    const right = new Edge(this.currentEdgeIndex, isRightOutsideEdge);
    this.incrementEdgeIndex();

    return new PuzzlePiece(
      top,
      bottom,
      left,
      right,
      outsideEdgeCount,
      pieceIndex
    );
  }

  initializeMatrix(n) {
    const matrix = [];
    for (let i = 0; i < n; i++) {
      matrix[i] = new Array(n).fill(0);
    }
    return matrix;
  }

  groupSimilarPieces() {
    for (let puzzle of this.pieces) {
      let shapeMap = this.insidePieceMap;
      if (puzzle.isBorder) {
        shapeMap = this.borderPieceMap;
        if (puzzle.isCorner) {
          this.cornerPieces.push(puzzle);
          shapeMap = this.cornerPieceMap;
        }
      }
      for (let edge of puzzle.sides) {
        if (edge.isOutsideEdge) {
          continue;
        }
        const shapeId = edge.shapeId;
        shapeMap.has(shapeId)
          ? shapeMap.get(shapeId).push(puzzle)
          : shapeMap.set(shapeId, [puzzle]);
      }
    }
  }

  solve() {
    this.groupSimilarPieces();
    const firstPiece =
      this.cornerPieces[Math.floor(Math.random() * this.cornerPieces.length)];
    const positions = new Set();
    for (let i = 0; i < firstPiece.sides.length; i++) {
      if (firstPiece.sides[i].isOutsideEdge) positions.add(i);
    }
    console.log("firstPiece before rotation", firstPiece, positions);
    firstPiece.rotate(positions);
    this.matrix[0][0] = firstPiece;
    this.visited.add(firstPiece);
    console.log("firstPiece after rotation", firstPiece);

    //set matrix positions recursively
    const leftOfNextPiece = -firstPiece.sides[1].shapeId;
    this.setPosition(leftOfNextPiece, [0, 1]);

    console.log("result");
    for (let row of this.matrix) {
      console.log(row);
    }
  }

  setPosition(shape, matrixPosition) {
    let shapeMap = this.insidePieceMap;
    const [row, column] = matrixPosition;
    console.log("row and column", row, column);
    const lastElem = this.n - 1;
    console.log("lastElem", lastElem);
    if (row == 0) {
      //check if it's last elem too
      shapeMap =
        column === lastElem ? this.cornerPieceMap : this.borderPieceMap;
    } else if (row < lastElem) {
      //otherwise everything else is an inside piece
      if (column == 0 || column == lastElem) shapeMap = this.borderPieceMap;
    } else {
      if (column == 0 || column == lastElem) {
        shapeMap = this.cornerPieceMap;
      } else {
        shapeMap = this.borderPieceMap;
      }
    }
    const pieces = shapeMap.get(shape);
    console.log("shapeId and pieces", shape, pieces);

    if (!pieces) return false;

    for (let piece of pieces) {
      if (this.visited.has(piece)) {
        console.log("piece already visited", piece);
        continue;
      }
      console.log("one pizzu", piece);
      let positions;
      let topEdgeIndex, leftEdgeIndex, bottomEdgeIndex, rightEdgeIndex;
      let piecePassedValidation = false;
      for (let i = 0; i < piece.sides.length; i++) {
        if (piece.sides[i].shapeId !== shape) {
          continue;
        }
        topEdgeIndex = null;
        leftEdgeIndex = null;
        if (column === 0) {
          topEdgeIndex = i;
        } else {
          leftEdgeIndex = i;
        }

        //add left index or top index
        if (topEdgeIndex === 0 || leftEdgeIndex === 3) {
          //"TRBL"
          topEdgeIndex = 0;
          leftEdgeIndex = 3;
          bottomEdgeIndex = 2;
          rightEdgeIndex = 1;
        } else if (topEdgeIndex === 1 || leftEdgeIndex === 0) {
          //"LTRB"
          topEdgeIndex = 1;
          leftEdgeIndex = 0;
          bottomEdgeIndex = 3;
          rightEdgeIndex = 2;
        } else if (topEdgeIndex === 2 || leftEdgeIndex === 1) {
          //"BLTR"
          topEdgeIndex = 2;
          leftEdgeIndex = 1;
          bottomEdgeIndex = 0;
          rightEdgeIndex = 3;
        } else if (topEdgeIndex === 3 || leftEdgeIndex === 2) {
          //"RBLT"
          topEdgeIndex = 3;
          leftEdgeIndex = 2;
          bottomEdgeIndex = 1;
          rightEdgeIndex = 0;
        }

        positions = new Set();
        positions.add(topEdgeIndex);
        positions.add(leftEdgeIndex);
        console.log(
          positions,
          "positions before rotation",
          topEdgeIndex,
          leftEdgeIndex
        );
        if (column === 0) {
          console.log(
            "before left validation for column 0",
            leftEdgeIndex,
            piece.sides[leftEdgeIndex]
          );
          //check if left is an outsideEdge
          if (!piece.sides[leftEdgeIndex].isOutsideEdge) continue;

          console.log("after left validation for column 0");
        } else {
          if (row == 0) {
            console.log(
              "before top validation for row 0",
              piece.sides[topEdgeIndex]
            );
            //check if top is an outsideEdge
            if (!piece.sides[topEdgeIndex].isOutsideEdge) continue;
            console.log(
              "after top validation for row 0",
              topEdgeIndex,
              leftEdgeIndex
            );
          } else {
            console.log(
              "before top validation for other rows",
              piece.sides[topEdgeIndex],
              this.matrix[row - 1][column].sides[2].shapeId
            );
            if (
              piece.sides[topEdgeIndex].shapeId !==
              -this.matrix[row - 1][column].sides[2].shapeId
            )
              continue;
            console.log(
              "after top validation for other rows",
              topEdgeIndex,
              leftEdgeIndex
            );
          }
        }
        //lastRow
        if (row == lastElem) {
          console.log(
            "before bottom validation for last row",
            bottomEdgeIndex,
            piece.sides[bottomEdgeIndex]
          );
          //check if bottom is an outsideEdge
          if (!piece.sides[bottomEdgeIndex].isOutsideEdge) continue;
          console.log("after bottom validation");
        }
        //lastColumn
        if (column == lastElem) {
          console.log(
            "before right validation for last column",
            rightEdgeIndex,
            piece.sides[rightEdgeIndex]
          );
          //check if bottom is an outsideEdge
          if (!piece.sides[rightEdgeIndex].isOutsideEdge) continue;
          console.log("after right validation");
        }

        piecePassedValidation = true;
        break;
      }

      if (!piecePassedValidation) continue;

      console.log("before rotation", piece, positions);
      piece.rotate(positions);
      this.matrix[row][column] = piece;
      this.visited.add(piece);
      console.log("after rotation and setting matrix", piece, positions);

      // reached last element
      if (row == lastElem && column == lastElem) {
        console.log("last piece inserted");
        return true;
      }

      //setPosition
      let leftOrTopOfNextPiecePiece, newMatrixPositions;
      if (column !== lastElem) {
        //left
        leftOrTopOfNextPiecePiece = -piece.sides[1].shapeId;
        //next position in that row
        newMatrixPositions = [row, column + 1];
      } else {
        //top
        leftOrTopOfNextPiecePiece = -this.matrix[row][0].sides[2].shapeId;
        //first position in next row
        newMatrixPositions = [row + 1, 0];
      }
      if (this.setPosition(leftOrTopOfNextPiecePiece, newMatrixPositions))
        return true;
      console.log("piece in the wrong spot", piece);
      this.visited.delete(piece);
    }

    return false;
  }
  //not needed
  fitsWith(edge1, edge2) {}
}

const jiggy = new Jigsaw(40);
jiggy.solve();
