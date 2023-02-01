class Edge {
  constructor(side, shapeId, isOutsideEdge) {
    this.side = side;
    this.shapeId = shapeId; //indicates the shape
    this.isOutsideEdge = isOutsideEdge;
  }
}

class PuzzlePiece {
  constructor(top, bottom, left, right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }
}

class Jigsaw {
  constructor(n) {
    this.pieces = [];
    this.currentEdgeIndex = 0;
    this.currentPieceIndex = 0;
    this.n = n;
    const numberOfPieces = n * n;

    //so a puzzle edge can have 2 possible matches, to increase complexity
    //only true match for (left right) is the one that the top and bottom match are shared
    //only true match for (top bottom) is the one that the left and right match are shared
    this.halfOfnumberOfEdges = n ** 2 + n;

    while (this.currentPieceIndex < numberOfPieces) {
      const newPiece = this.createPuzzlePiece(this.currentPieceIndex);
      this.pieces.push(newPiece);
      this.currentPieceIndex++;
    }
    this.shuffle();
    console.log(this.pieces, this.pieces.length);
  }

  incrementEdgeIndex() {
    this.currentEdgeIndex++;
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
    if (pieceIndex < n) {
      top = new Edge("top", this.currentEdgeIndex, true);
      this.incrementEdgeIndex();
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
    this.incrementEdgeIndex();
    let left;
    if (pieceIndex % n == 0) {
      left = new Edge("left", this.currentEdgeIndex, true);
      this.incrementEdgeIndex();
    } else {
      const leftIndex = this.pieces[pieceIndex - 1].right.shapeId;
      left = new Edge("left", leftIndex, false);
    }

    let isRightOutsideEdge = false;
    if ((pieceIndex + 1) % n == 0) isRightOutsideEdge = true;

    const right = new Edge("right", this.currentEdgeIndex, isRightOutsideEdge);
    this.incrementEdgeIndex();

    return new PuzzlePiece(top, bottom, left, right);
  }
}

const jiggy = new Jigsaw(3);
