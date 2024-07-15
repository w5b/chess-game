import pieceIds from "../pieceIds.js";
import Piece from "./Piece.js";


class Queen extends Piece {
    constructor(color) {
        super();
        this.color = color;
        this.position = {
            x: 4,
            y: this.color == "white" ? 8 : 1
        }
    }
}

Queen.prototype.id = pieceIds.Queen;
Queen.prototype.idString = "queen"

export default Queen;