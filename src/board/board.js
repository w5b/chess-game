import King from "./pieces/objects/King.js";
import Queen from "./pieces/objects/Queen.js";
import Rook from "./pieces/objects/Rook.js";
import Bishop from "./pieces/objects/Bishop.js";
import Knight from "./pieces/objects/Knight.js";
import Pawn from "./pieces/objects/Pawn.js";

import gameSettings from "../gameSettings.js";
import pieceIds from "./pieces/pieceIds.js";
import Piece from "./pieces/objects/Piece.js";

class Board {
  constructor() {
    this.currentTurn = Math.random() < 0.5 ? "white" : "black";

    this.chessBoard = Array.from({ length: 8 }, () => Array(8).fill(null));

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
        ctx.fillStyle =
          (i + j) % 2 === 0
            ? gameSettings.darkTileColor
            : gameSettings.lightTileColor;
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
    for (let i = 0; i < this.chessBoard.length; i++) {
      for (let j = 0; j < this.chessBoard[i].length; j++) {
        const currentTile = this.chessBoard[i][j];
        if (currentTile != null) {
          currentTile.draw(ctx);
        }
      }
    }
  }

  initializePieces() {
    const colors = ["white", "black"];

    for (const color of colors) {
      this.initializePiece(new Rook(color, 1));
      this.initializePiece(new Rook(color, 2));
      this.initializePiece(new King(color));
      this.initializePiece(new Queen(color));
      this.initializePiece(new Bishop(color, 1));
      this.initializePiece(new Bishop(color, 2));
      this.initializePiece(new Knight(color, 1));
      this.initializePiece(new Knight(color, 2));

      for (let i = 1; i <= 8; i++) {
        this.initializePiece(new Pawn(color, i));
      }
    }
  }

  initializeBoard() {
    this.chessBoard = Array.from({ length: 8 }, () => Array(8).fill(null));
  }

  initializePiece(piece) {
    this.chessBoard[piece.tilePosition.x - 1][piece.tilePosition.y - 1] = piece;
  }

  movePiece(piece, position) {
    piece.tilePosition = position;
    this.chessBoard[position.x - 1][position.y - 1] = piece;
    this.chessBoard[piece.visualPosition.x - 1][piece.visualPosition.y - 1] =
      null;
    this.currentTurn = this.currentTurn === "white" ? "black" : "white";
  }
}

export default Board;
