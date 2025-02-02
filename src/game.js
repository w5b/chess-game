import Board from "./board/board.js";
import gameSettings, { calculateTileSize } from "./gameSettings.js";

class Game {
  constructor() {
    this.board = new Board();

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.setCanvasSize();

    window.onresize = this.onWindowResize.bind(this);
    window.onmousemove = this.onMouseMove.bind(this);
    window.onmousedown = this.onMouseDown.bind(this);
    window.onmouseup = this.onMouseUp.bind(this);

    this.hoveredPiece = null;
    this.draggingPiece = null;
  }

  setCanvasSize() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * devicePixelRatio;
    this.canvas.height = window.innerHeight * devicePixelRatio;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);

    this.board.setDimensions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.board.drawAndUpdate(this.ctx);

    if (gameSettings.DEBUG_MODE) {
      this.ctx.fillText(this.board.currentTurn, 50, 50);
    }
  }

  onWindowResize() {
    gameSettings.tileSize = calculateTileSize();
    gameSettings.boardSize = gameSettings.tileSize * 8;
    this.setCanvasSize();
  }

  isMouseInBoardBounds(e) {
    const boardDim = gameSettings.tileSize * 8;
    return (
      e.clientX > this.board.startX &&
      e.clientX < this.board.startX + boardDim &&
      e.clientY > this.board.startY &&
      e.clientY < this.board.startY + boardDim
    );
  }

  getCurrentPieceInTile(tileX, tileY) {
    if (tileX >= 1 && tileX <= 8 && tileY >= 1 && tileY <= 8) {
      return this.board.chessBoard[tileX - 1][tileY - 1];
    }
    return null;
  }

  mouseToBoardPosition(mouseX, mouseY) {
    const boundingClientRect = this.canvas.getBoundingClientRect();
    const clientX = mouseX - boundingClientRect.left;
    const clientY = mouseY - boundingClientRect.top;
    const relativeX = clientX - this.board.startX;
    const relativeY = clientY - this.board.startY;

    const tileX = Math.floor(relativeX / gameSettings.tileSize) + 1;
    const tileY = Math.floor(relativeY / gameSettings.tileSize) + 1;

    return {
      x: tileX,
      y: tileY,
    };
  }

  dragPiece(e) {
    if (this.draggingPiece) {
      const boundingClientRect = this.canvas.getBoundingClientRect();
      const clientX =
        e.clientX - boundingClientRect.left - gameSettings.tileSize / 2;
      const clientY =
        e.clientY - boundingClientRect.top - gameSettings.tileSize / 2;
      this.draggingPiece.visualPosition = { x: clientX, y: clientY };
    }
  }

  onMouseMove(e) {
    this.dragPiece(e);
  }

  onMouseDown(e) {
    if (this.isMouseInBoardBounds(e)) {
      const mouseBoardPosition = this.mouseToBoardPosition(
        e.clientX,
        e.clientY
      );
      const currentPiece = this.getCurrentPieceInTile(
        mouseBoardPosition.x,
        mouseBoardPosition.y
      );
      this.hoveredPiece = currentPiece;
      const selectedPiece =
        this.board.selectedTile &&
        this.board.chessBoard[this.board.selectedTile.x - 1][
          this.board.selectedTile.y - 1
        ];
      if (
        !selectedPiece ||
        (currentPiece && currentPiece.equal(selectedPiece)) ||
        (selectedPiece && selectedPiece.color != this.board.currentTurn) ||
        (currentPiece && currentPiece.color == this.board.currentTurn)
      ) {
        if (this.hoveredPiece) {
          this.draggingPiece = this.hoveredPiece;
          this.draggingPiece.isDragged = true;
          this.draggingPiece.previousPosition = this.draggingPiece.tilePosition;
          if (
            this.board.selectedTile &&
            this.board.selectedTile.x == this.hoveredPiece.tilePosition.x &&
            this.board.selectedTile.y == this.hoveredPiece.tilePosition.y
          ) {
            this.board.selectedTile = null;
          } else
            this.board.selectedTile = {
              x: this.hoveredPiece.tilePosition.x,
              y: this.hoveredPiece.tilePosition.y,
            };
          this.dragPiece(e);
        }
      }
    }
  }

  onMouseUp(e) {
    if (this.draggingPiece) {
      const mouseBoardPosition = this.mouseToBoardPosition(
        e.clientX,
        e.clientY
      );
      if (
        this.board.currentTurn === this.draggingPiece.color &&
        mouseBoardPosition.x >= 1 &&
        mouseBoardPosition.x <= 8 &&
        mouseBoardPosition.y >= 1 &&
        mouseBoardPosition.y <= 8 &&
        this.draggingPiece.canGoTo(mouseBoardPosition, this.board.chessBoard)
      ) {
        this.board.movePiece(this.draggingPiece, mouseBoardPosition);
      } else {
        this.draggingPiece.tilePosition = this.draggingPiece.previousPosition;
        this.draggingPiece.visualPosition =
          this.draggingPiece.getTranslatedPosition();
      }
      this.draggingPiece.isDragged = false;
      this.draggingPiece = null;
    } else {
      const selectedPiece =
        this.board.selectedTile &&
        this.board.chessBoard[this.board.selectedTile.x - 1][
          this.board.selectedTile.y - 1
        ];
      if (selectedPiece && selectedPiece.color == this.board.currentTurn) {
        const mouseBoardPosition = this.mouseToBoardPosition(
          e.clientX,
          e.clientY
        );
        if (selectedPiece.canGoTo(mouseBoardPosition, this.board.chessBoard))
          this.board.movePiece(selectedPiece, mouseBoardPosition);
      }
    }
  }
}

export default Game;
