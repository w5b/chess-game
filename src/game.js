import Board from "./board/board.js";
import gameSettings from "./gameSettings.js";

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
    this.board.draw(this.ctx);

    if (gameSettings.DEBUG_MODE) {
      this.ctx.fillText(this.board.currentTurn, 50, 50);
    }
  }

  onWindowResize() {
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

  onMouseMove(e) {
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

      if (this.draggingPiece) {
        const boundingClientRect = this.canvas.getBoundingClientRect();
        const clientX = e.clientX - boundingClientRect.left;
        const clientY = e.clientY - boundingClientRect.top;
        this.draggingPiece.tilePosition = { x: clientX, y: clientY };
      }
    }
  }

  onMouseDown(e) {
    if (this.hoveredPiece) {
      this.draggingPiece = this.hoveredPiece;
      this.draggingPiece.isDragged = true;
      this.draggingPiece.visualPosition = this.draggingPiece.tilePosition;
      const boundingClientRect = this.canvas.getBoundingClientRect();
      const clientX = e.clientX - boundingClientRect.left;
      const clientY = e.clientY - boundingClientRect.top;
      this.draggingPiece.tilePosition = { x: clientX, y: clientY };
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
        this.draggingPiece.tilePosition = this.draggingPiece.visualPosition;
      }
      this.draggingPiece.isDragged = false;
      this.draggingPiece = null;
    }
  }
}

export default Game;
