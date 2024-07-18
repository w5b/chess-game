import pieceIds from "../pieceIds.js";
import Piece from "./Piece.js";

class Knight extends Piece {
  constructor(color, type) {
    super();
    this.color = color;
    this.tilePosition = {
      x: type == 1 ? 2 : 7,
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
        const tile1 = this.knightTile(dir, 1);
        const tile2 = this.knightTile(dir, 2);
        const walkableTilesCheck1 = this.simpleWalkCheck(tile1, board);
        const walkableTilesCheck2 = this.simpleWalkCheck(tile2, board);

        if (walkableTilesCheck1.length != 0) {
          walkableTiles.push(...walkableTilesCheck1);
        }
        if (walkableTilesCheck2.length != 0) {
          walkableTiles.push(...walkableTilesCheck2);
        }

        if (walkableTilesCheck1.length == 0 || walkableTilesCheck2.length == 0)
          break;
      }
    }
    return walkableTiles;
  }
}

Knight.prototype.id = pieceIds.Knight;
Knight.prototype.idString = "knight";

export default Knight;
