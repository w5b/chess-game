import pieceIds from "../pieceIds.js";
import Piece from "./Piece.js";

class Pawn extends Piece {
  constructor(color, xPosition) {
    super();
    this.color = color;
    this.tilePosition = {
      x: xPosition,
      y: this.color == "white" ? 7 : 2,
    };
  }

  getWalkableTiles(board) {
    const walkableTiles = [];
    const { forwards, backwards } = this.direction;
    const isWhite = this.color === "white";
    const forwardTile1 = this.forwardTile(1, isWhite ? forwards : backwards);
    const forwardTile2 = this.forwardTile(2, isWhite ? forwards : backwards);
    const startRow = isWhite ? 7 : 2;

    if (!forwardTile1 || !forwardTile2) return walkableTiles;

    if (!board[forwardTile1.x - 1][forwardTile1.y - 1]) {
      if (
        this.previousPosition.y === startRow &&
        !board[forwardTile2.x - 1][forwardTile2.y - 1]
      ) {
        walkableTiles.push(forwardTile1, forwardTile2);
      } else {
        walkableTiles.push(forwardTile1);
      }
    }
    return walkableTiles;
  }
}

Pawn.prototype.id = pieceIds.Pawn;
Pawn.prototype.idString = "pawn";

export default Pawn;
