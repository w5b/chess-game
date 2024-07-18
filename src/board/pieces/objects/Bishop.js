import pieceIds from "../pieceIds.js";
import Piece from "./Piece.js";

class Bishop extends Piece {
  constructor(color, type) {
    super();
    this.color = color;
    this.tilePosition = {
      x: type == 1 ? 3 : 6,
      y: this.color == "white" ? 8 : 1,
    };
  }

  getWalkableTiles(board) {
    const walkableTiles = [];
    const directions = [
      this.direction.leftBackWards,
      this.direction.rightBackwards,
      this.direction.leftForwards,
      this.direction.rightForwards,
    ];

    for (let dir of directions) {
      for (let i = 1; i <= 8; i++) {
        const tile = this.diagonalTile(i, dir);
        const walkableTilesCheck = this.simpleWalkCheck(tile, board);
        if (walkableTilesCheck.length == 0) break;
        walkableTiles.push(...walkableTilesCheck);
      }
    }
    return walkableTiles;
  }
}

Bishop.prototype.id = pieceIds.Bishop;
Bishop.prototype.idString = "bishop";

export default Bishop;
