/**
 *
 * iterative solution because it hits
 * maximum call stack size with
 * recursive solution
 *
 */

import { logger } from "../../logger.js";
import { Stack } from "../../stacks_and_queues/helpers/stack.js";

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
    logger.info("pre shuffle", this.pieces, this.pieces.length);
    this.shuffle();
    logger.info("post shuffle", this.pieces, this.pieces.length);
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
    logger.info("firstPiece before rotation", firstPiece, positions);
    firstPiece.rotate(positions);
    this.matrix[0][0] = firstPiece;
    this.visited.add(firstPiece);
    logger.info("firstPiece after rotation", firstPiece);

    //set matrix positions recursively
    const leftOfNextPiece = -firstPiece.sides[1].shapeId;
    this.setPosition(leftOfNextPiece);

    logger.info("result");
    for (let row of this.matrix) {
      logger.info("row", row);
    }
  }

  setPosition(firstShape) {
    const lastElem = this.n - 1;
    let shape = firstShape;
    let row = 0;
    let column = 1;
    const attemptedStack = new Stack();
    while (row <= lastElem && column <= lastElem) {
      let shapeMap = this.insidePieceMap;
      logger.info("row and column", row, column);
      logger.info("lastElem", lastElem);
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
      logger.info("shapeId and pieces", shape, pieces);

      if (!pieces) {
        //reduce column or row
        let topOrLeft = 3;
        if (column == 0) {
          column = lastElem;
          row--;
        } else {
          column--;
          column === 0 ? (topOrLeft = 0) : null;
        }
        logger.info(
          "piece before removal from visited",
          this.matrix[row][column]
        );
        logger.info("new row and column when no pieces", row, column);
        //set shape to leftorTopOfOldPiece (using matrix[old_row][old_column] to get it)
        shape = this.matrix[row][column].sides[topOrLeft].shapeId;
        //remove the piece in the matrix[old_row][old_column] from
        this.visited.delete(this.matrix[row][column]);
        continue;
      }
      logger.info("stack before pieces iteration", attemptedStack);
      logger.info("top of stack before pieces iteration", attemptedStack.top);

      //if top of stack is not [row][column] add a new set to top
      if (
        !attemptedStack.top ||
        !(
          attemptedStack.top.data.row == row &&
          attemptedStack.top.data.column == column
        )
      ) {
        attemptedStack.push({
          row,
          column,
          attemptedPieces: new Set(),
        });

        logger.info("new top of stack", attemptedStack.top);
      }

      for (let piece of pieces) {
        //check if item in attempted set or in visted set
        if (
          attemptedStack.top.data.attemptedPieces.has(piece) ||
          this.visited.has(piece)
        ) {
          logger.info("piece already attempted or visited", piece);
          continue;
        }
        //add attempted item to attempted set in top of stack
        attemptedStack.top.data.attemptedPieces.add(piece);
        logger.info("one pizzu", piece);
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
          logger.info(
            positions,
            "positions before rotation",
            topEdgeIndex,
            leftEdgeIndex
          );
          if (column === 0) {
            logger.info(
              "before left validation for column 0",
              leftEdgeIndex,
              piece.sides[leftEdgeIndex]
            );
            //check if left is an outsideEdge
            if (!piece.sides[leftEdgeIndex].isOutsideEdge) continue;

            logger.info("after left validation for column 0");
          } else {
            if (row == 0) {
              logger.info(
                "before top validation for row 0",
                piece.sides[topEdgeIndex]
              );
              //check if top is an outsideEdge
              if (!piece.sides[topEdgeIndex].isOutsideEdge) continue;
              logger.info(
                "after top validation for row 0",
                topEdgeIndex,
                leftEdgeIndex
              );
            } else {
              logger.info(
                "before top validation for other rows",
                piece.sides[topEdgeIndex],
                this.matrix[row - 1][column].sides[2].shapeId
              );
              if (
                piece.sides[topEdgeIndex].shapeId !==
                -this.matrix[row - 1][column].sides[2].shapeId
              )
                continue;
              logger.info(
                "after top validation for other rows",
                topEdgeIndex,
                leftEdgeIndex
              );
            }
          }
          //lastRow
          if (row == lastElem) {
            logger.info(
              "before bottom validation for last row",
              bottomEdgeIndex,
              piece.sides[bottomEdgeIndex]
            );
            //check if bottom is an outsideEdge
            if (!piece.sides[bottomEdgeIndex].isOutsideEdge) continue;
            logger.info("after bottom validation");
          }
          //lastColumn
          if (column == lastElem) {
            logger.info(
              "before right validation for last column",
              rightEdgeIndex,
              piece.sides[rightEdgeIndex]
            );
            //check if bottom is an outsideEdge
            if (!piece.sides[rightEdgeIndex].isOutsideEdge) continue;
            logger.info("after right validation");
          }

          piecePassedValidation = true;
          break;
        }

        if (!piecePassedValidation) continue;

        logger.info("before rotation", piece, positions);
        piece.rotate(positions);
        this.matrix[row][column] = piece;
        this.visited.add(piece);
        logger.info("after rotation and setting matrix", piece, positions);

        // reached last element
        if (row == lastElem && column == lastElem) {
          logger.info("last piece inserted");
          return;
        }

        if (column !== lastElem) {
          //left
          shape = -piece.sides[1].shapeId;
          //next position in that row
          column++;
        } else {
          //top
          shape = -this.matrix[row][0].sides[2].shapeId;
          //first position in next row
          row++;
          column = 0;
        }

        //a piece was selected
        break;
      }
      logger.info(
        "top of stack after iteration",
        attemptedStack.top,
        attemptedStack.top.data.attemptedPieces
      );

      //if after for loop through pieces and no next was selected
      if (
        attemptedStack.top.data.row == row &&
        attemptedStack.top.data.column == column
      ) {
        attemptedStack.pop();
        let topOrLeft = 3;
        if (column == 0) {
          column = lastElem;
          row--;
        } else {
          column--;
          column === 0 ? (topOrLeft = 0) : null;
        }
        logger.info("top of stack after popping", attemptedStack.top);
        logger.info("row and column after popping", row, column);
        //set shape to leftorTopOfOldPiece (using matrix[old_row][old_column] to get it)
        shape = this.matrix[row][column].sides[topOrLeft].shapeId;
        logger.info("shape after popping", shape);
        //remove the piece in the matrix[old_row][old_column] from
        this.visited.delete(this.matrix[row][column]);
      }
    }
  }
}

const jiggy = new Jigsaw(10);
jiggy.solve();
