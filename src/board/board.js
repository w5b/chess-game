import King from "./pieces/objects/King.js";
import Queen from "./pieces/objects/Queen.js";
import Rook from "./pieces/objects/Rook.js";

import gameSettings from "../gameSettings.js";
import pieceIds from "./pieces/pieceIds.js";
import Bishop from "./pieces/objects/Bishop.js";
import Knight from "./pieces/objects/Knight.js";
import Pawn from "./pieces/objects/Pawn.js";
import Piece from "./pieces/objects/Piece.js";

class Board {
  constructor() {
    this.pieces = {
      black: {},
      white: {},
    };

    this.currentTurn = Math.random() < 0.5 ? "white" : "black";

    this.initializePieces();
  }

  draw(ctx) {
    this.drawBoard(ctx);
    this.drawPieces(ctx);
  }

  setDimensions() {
    this.startX = (window.innerWidth - gameSettings.boardSize) / 2;
    this.startY = (window.innerHeight - gameSettings.boardSize) / 2;
  }

  drawBoard(ctx) {
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillStyle = gameSettings.darkTileColor;
        } else {
          ctx.fillStyle = gameSettings.lightTileColor;
        }
        ctx.fillRect(
          this.startX + (i - 1) * gameSettings.tileSize,
          this.startY + (j - 1) * gameSettings.tileSize,
          gameSettings.tileSize,
          gameSettings.tileSize
        );

        if (i === 1 || j === 8) {
          const fontSize = 12;
          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle =
            ctx.fillStyle === gameSettings.darkTileColor
              ? gameSettings.lightTileColor
              : gameSettings.darkTileColor;
          let textX = this.startX + (i - 1) * gameSettings.tileSize;
          let textY = this.startY + (j - 1) * gameSettings.tileSize + fontSize;
          let text = j.toString();
          if (j === 8) {
            textX += gameSettings.tileSize / 2 + fontSize;
            textY += gameSettings.tileSize - fontSize * 1.5;
            text = Piece.prototype.xPositionToLetter(i);
          }
          ctx.fillText(text, textX, textY);
        }
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

      for (let i = 1; i <= 8; i++) {
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

  MovePiece(piece, position) {
    piece.position = position;
    this.currentTurn = this.currentTurn == "white" ? "black" : "white";
  }
}

export default Board;
