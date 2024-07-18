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
        if (!tile) break;

        const piece = board[tile.x - 1][tile.y - 1];

        if (piece) {
          if (piece.color !== this.color && piece.id != pieceIds.King)
            walkableTiles.push(tile);
          else break;
        } else {
          walkableTiles.push(tile);
        }
      }
    }
    return walkableTiles;
  }
}

Bishop.prototype.id = pieceIds.Bishop;
Bishop.prototype.idString = "bishop";

export default Bishop;
