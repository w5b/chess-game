import pieceIds from "../pieceIds.js";
import Piece from "./Piece.js";

class Pawn extends Piece {
  constructor(color, xPosition) {
    super();
    this.color = color;
    this.position = {
      x: xPosition,
      y: this.color == "white" ? 7 : 2,
    };
  }
}

Pawn.prototype.id = pieceIds.Pawn;
Pawn.prototype.idString = "pawn";

export default Pawn;
