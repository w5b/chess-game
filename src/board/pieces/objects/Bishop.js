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

  canGoTo(position, board) {
    return true;
  }
}

Bishop.prototype.id = pieceIds.Bishop;
Bishop.prototype.idString = "bishop";

export default Bishop;
