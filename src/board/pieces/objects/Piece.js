import gameSettings from "../../../gameSettings.js";

class Piece {
  constructor() {
    this.tilePosition = {
      x: 0,
      y: 0,
    };

    this.visualPosition = {
      x: 0,
      y: 0,
    };

    this.isDragged = false;
  }

  draw(ctx) {
    this.getCachedPieceImage(this.idString, this.color)
      .then((image) => {
        const position = this.isDragged
          ? {
              x: this.tilePosition.x - gameSettings.tileSize / 2,
              y: this.tilePosition.y - gameSettings.tileSize / 2,
            }
          : this.getTranslatedPosition();
        ctx.drawImage(
          image,
          position.x,
          position.y,
          gameSettings.tileSize,
          gameSettings.tileSize
        );
      })
      .catch((error) => {});
  }

  canGoTo(position, board) {
    return true;
  }
}

Piece.prototype.getTranslatedPosition = function () {
  const boardStartX = (window.innerWidth - gameSettings.boardSize) / 2;
  const boardStartY = (window.innerHeight - gameSettings.boardSize) / 2;

  const piecePositionX =
    boardStartX +
    this.tilePosition.x * gameSettings.tileSize -
    gameSettings.tileSize;
  const piecePositionY =
    boardStartY +
    this.tilePosition.y * gameSettings.tileSize -
    gameSettings.tileSize;

  return {
    x: piecePositionX,
    y: piecePositionY,
  };
};

Piece.prototype.translatePositionToChessPosition = function (
  position,
  shouldFlip = true
) {
  return {
    x: position.x,
    y: shouldFlip ? 8 - position.y + 1 : position.y,
  };
};

Piece.prototype.xPositionToLetter = function (xPosition) {
  return String.fromCharCode(xPosition + 96);
};

Piece.prototype.getTile = function (position, shouldFlip = true) {
  const chessPosition = this.translatePositionToChessPosition(
    position,
    shouldFlip
  );
  return this.xPositionToLetter(chessPosition.x) + chessPosition.y.toString();
};

Piece.prototype.getPieceAssetURI = function (pieceName, pieceColor) {
  return `../assets/${pieceColor[0]}_${pieceName.toLowerCase()}_1x.png`;
};

Piece.prototype.getCachedPieceImage = async function (pieceName, pieceColor) {
  const cachedImageStr = `${pieceColor[0]}${pieceName}`;
  if (this.piecesCachedImageList[cachedImageStr]) {
    return Promise.resolve(this.piecesCachedImageList[cachedImageStr]);
  }

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = this.getPieceAssetURI(pieceName, pieceColor);

    image.width = gameSettings.tileSize;
    image.height = gameSettings.tileSize;

    image.onload = () => {
      this.piecesCachedImageList[cachedImageStr] = image;
      resolve(image);
    };

    image.onerror = reject;
  });
};

Piece.prototype.idString = "piece";
Piece.prototype.id = 0;
Piece.prototype.piecesCachedImageList = [];

export default Piece;
