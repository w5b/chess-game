import King from "./pieces/objects/King.js";
import Queen from "./pieces/objects/Queen.js";
import Rook from "./pieces/objects/Rook.js";

import gameSettings from "../gameSettings.js";
import pieceIds from "./pieces/pieceIds.js";
import Bishop from "./pieces/objects/Bishop.js";
import Knight from "./pieces/objects/Knight.js";
import Pawn from "./pieces/objects/Pawn.js";

class Board {
    constructor() {
        this.pieces = {
            black: {},
            white: {},
        }

        this.initializePieces();
    }

    draw(ctx) {
        this.drawBoard(ctx);
        this.drawPieces(ctx);
    }

    drawBoard(ctx) {
    
        const startX = (window.innerWidth - gameSettings.boardSize) / 2;
        const startY = (window.innerHeight - gameSettings.boardSize) / 2;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    ctx.fillStyle = "#81935c";
                } else {
                    ctx.fillStyle = "#ecebd2";
                }
                ctx.fillRect(startX + i * gameSettings.tileSize, startY + j * gameSettings.tileSize, gameSettings.tileSize, gameSettings.tileSize);
            }
        }
    }

    drawPieces(ctx) {
        for (const color in this.pieces) {
            for (const pieces in this.pieces[color]) {
                for (const piece of this.pieces[color][pieces]) {
                    piece.draw(ctx);
                }
            }
        }
    }

    initializePieces() {
        for (const color in this.pieces) {
            this.initializePiece(color, pieceIds.Rook, new Rook(color, 1));
            this.initializePiece(color, pieceIds.Rook, new Rook(color, 2));

            this.initializePiece(color, pieceIds.King, new King(color));
            this.initializePiece(color, pieceIds.Queen, new Queen(color));

            this.initializePiece(color, pieceIds.Bishop, new Bishop(color, 1));
            this.initializePiece(color, pieceIds.Bishop, new Bishop(color, 2));

            this.initializePiece(color, pieceIds.Knight, new Knight(color, 1));
            this.initializePiece(color, pieceIds.Knight, new Knight(color, 2));

            for (let i = 1; i<= 8; i++) {
                this.initializePiece(color, pieceIds.Pawn, new Pawn(color, i));
            }
        }
    }

    initializePiece(color, id, object) {
        if (this.pieces[color][id]) {
            this.pieces[color][id].push(object);
            return;
        }

        this.pieces[color][id] = [];
        this.pieces[color][id].push(object);
    }
}

export default Board;
