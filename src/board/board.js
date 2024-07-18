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

    this.selectedTile = null;

    this.initializeBoard();

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
    const selectedPiece =
      this.selectedTile &&
      this.chessBoard[this.selectedTile.x - 1][this.selectedTile.y - 1];
    const selectedPieceWalkableTiles =
      selectedPiece && selectedPiece.getWalkableTiles(this.chessBoard);

    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        this.drawTile(ctx, i, j, selectedPiece, selectedPieceWalkableTiles);
        this.drawCoordinates(ctx, i, j);
      }
    }
  }

  drawTile(ctx, i, j, selectedPiece, walkableTiles) {
    const isDark = (i + j) % 2 === 0;
    ctx.fillStyle = isDark
      ? gameSettings.darkTileColor
      : gameSettings.lightTileColor;

    if (selectedPiece && this.selectedTile.x == i && this.selectedTile.y == j) {
      ctx.fillStyle = isDark
        ? gameSettings.darkTileSelectedColor
        : gameSettings.lightTileSelectedColor;
    }

    ctx.fillRect(
      this.startX + (i - 1) * gameSettings.tileSize,
      this.startY + (j - 1) * gameSettings.tileSize,
      gameSettings.tileSize,
      gameSettings.tileSize
    );

    if (
      walkableTiles &&
      walkableTiles.some((tile) => tile.x === i && tile.y === j)
    ) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.arc(
        this.startX +
          (i - 1) * gameSettings.tileSize +
          gameSettings.tileSize / 2,
        this.startY +
          (j - 1) * gameSettings.tileSize +
          gameSettings.tileSize / 2,
        gameSettings.tileSize / 6,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.restore();
    }
  }

  drawCoordinates(ctx, i, j) {
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

  drawPieces(ctx) {
    for (const row of this.chessBoard) {
      for (const piece of row) {
        piece?.draw(ctx);
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
    const boardPosition = {
      x: position.x - 1,
      y: position.y - 1,
    };
    if (
      piece.previousPosition.x == position.x &&
      piece.previousPosition.y == position.y
    ) {
      piece.tilePosition = piece.previousPosition;
      return;
    }
    piece.tilePosition = position;
    this.chessBoard[boardPosition.x][boardPosition.y] = piece;
    this.chessBoard[piece.previousPosition.x - 1][
      piece.previousPosition.y - 1
    ] = null;
    this.currentTurn = this.currentTurn === "white" ? "black" : "white";
  }
}

export default Board;
