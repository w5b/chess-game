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

  getWalkableTiles(board) {}
}

Rook.prototype.id = pieceIds.Rook;
Rook.prototype.idString = "rook";

export default Rook;
