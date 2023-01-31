class Edge {
  constructor(side, shapeId, isOutsideEdge) {
    this.side = side;
    this.shapeId = shapeId; //indicates the shape
    this.isOutsideEdge = isOutsideEdge;
  }
}
//left fits with a right
//right fits with a left
//top fits with bottom
//bottom fits with top

//one edge has 5 matches
//only true match is the one that the top and bottom match are shared
class PuzzlePiece {
  constructor(top, bottom, left, right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }
}

//@todo: try for halfnumberofEdges
//@todo: shuffle
class Jigsaw {
  //reference maybe
  constructor(n) {
    this.pieces = [];
    this.currentEdgeIndex = 0;
    this.currentPieceIndex = 0;
    this.n = n;
    const numberOfPieces = n * n;
    const halfOfnumberOfEdges = n ** 2 + n; //so a puzzle edge can have 2 possible matches, to increase complexity

    
    while (this.currentPieceIndex < numberOfPieces) {
      const newPiece = this.createPuzzlePiece(this.currentPieceIndex);
      this.pieces.push(newPiece);
      this.currentPieceIndex++;
    }
    console.log(this.pieces, this.pieces.length);
  }

  createPuzzlePiece(pieceIndex) {
    let top;
    const n = this.n;
    if (pieceIndex < n) {
      top = new Edge("top", this.currentEdgeIndex, true);
      this.currentEdgeIndex++;
    } else {
      const topIndex = this.pieces[pieceIndex - n].bottom.shapeId;
      top = new Edge("top", topIndex, false);
    }

    let isBottomOutsideEdge = false;
    const x = n * (n - 1);
    if (pieceIndex >= x) isBottomOutsideEdge = true;

    const bottom = new Edge(
      "bottom",
      this.currentEdgeIndex,
      isBottomOutsideEdge
    );
    this.currentEdgeIndex++;
    let left;
    if (pieceIndex % n == 0) {
      left = new Edge("left", this.currentEdgeIndex, true);
      this.currentEdgeIndex++;
    } else {
      const leftIndex = this.pieces[pieceIndex - 1].right.shapeId;
      left = new Edge("left", leftIndex, false);
    }

    let isRightOutsideEdge = false;
    if ((pieceIndex + 1) % n == 0) isRightOutsideEdge = true;

    const right = new Edge("right", this.currentEdgeIndex, isRightOutsideEdge);
    this.currentEdgeIndex++;

    return new PuzzlePiece(top, bottom, left, right);
  }
}
//@todo: 1 puzzle piece
const jiggy = new Jigsaw(1);
