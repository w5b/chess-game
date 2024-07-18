import pieceIds from "../pieceIds.js";
import Piece from "./Piece.js";

class Queen extends Piece {
  constructor(color) {
    super();
    this.color = color;
    this.tilePosition = {
      x: 4,
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

    for (let dir of directionsDiagonal) {
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

Queen.prototype.id = pieceIds.Queen;
Queen.prototype.idString = "queen";

export default Queen;
