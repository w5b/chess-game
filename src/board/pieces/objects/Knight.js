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
    return [];
  }
}

Knight.prototype.id = pieceIds.Knight;
Knight.prototype.idString = "knight";

export default Knight;
