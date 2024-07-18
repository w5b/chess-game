import pieceIds from "../pieceIds.js";
import Piece from "./Piece.js";

class Rook extends Piece {
  constructor(color, type) {
    super();
    this.color = color;
    this.tilePosition = {
      x: type == 1 ? 1 : 8,
      y: this.color == "white" ? 8 : 1,
    };
  }

  getWalkableTiles(board) {
    const walkableTiles = [];
    const directionsSide = [this.direction.left, this.direction.right];
    const directionsForward = [
      this.direction.forwards,
      this.direction.backwards,
    ];

    for (let dir of directionsSide) {
      for (let i = 1; i <= 8; i++) {
        const tile = this.sideTile(i, dir);
        const walkableTilesCheck = this.simpleWalkCheck(tile, board);
        if (walkableTilesCheck.length == 0) break;
        walkableTiles.push(...walkableTilesCheck);
      }
    }

    for (let dir of directionsForward) {
      for (let i = 1; i <= 8; i++) {
        const tile = this.forwardTile(i, dir);
        const walkableTilesCheck = this.simpleWalkCheck(tile, board);
        if (walkableTilesCheck.length == 0) break;
        walkableTiles.push(...walkableTilesCheck);
      }
    }
    return walkableTiles;
  }
}

Rook.prototype.id = pieceIds.Rook;
Rook.prototype.idString = "rook";

export default Rook;
