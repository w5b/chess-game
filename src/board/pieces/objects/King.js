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

  canGoTo(position, board) {
    return true;
  }
}

King.prototype.id = pieceIds.King;
King.prototype.idString = "king";

export default King;
