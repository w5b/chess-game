import pieceIds from "../pieceIds.js";
import Piece from "./Piece.js";

class King extends Piece {
  constructor(color) {
    super();
    this.color = color;
    this.tilePosition = {
      x: 5,
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
    const directionsDiagonal = [
      this.direction.leftBackWards,
      this.direction.rightBackwards,
      this.direction.leftForwards,
      this.direction.rightForwards,
    ];

    for (let dir of directionsSide) {
      const tile = this.sideTile(1, dir);
      const walkableTilesCheck = this.simpleWalkCheck(tile, board);
      walkableTiles.push(...walkableTilesCheck);
    }

    for (let dir of directionsForward) {
      const tile = this.forwardTile(1, dir);
      const walkableTilesCheck = this.simpleWalkCheck(tile, board);
      walkableTiles.push(...walkableTilesCheck);
    }

    for (let dir of directionsDiagonal) {
      const tile = this.diagonalTile(1, dir);
      const walkableTilesCheck = this.simpleWalkCheck(tile, board);
      walkableTiles.push(...walkableTilesCheck);
    }
    return walkableTiles;
  }
}

King.prototype.id = pieceIds.King;
King.prototype.idString = "king";

export default King;
