import gameSettings from "../../../gameSettings.js";

class Piece {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
  }

  draw(ctx) {
    this.getCachedPieceImage(this.idString, this.color)
      .then((image) => {
        const position = this.getTranslatedPosition();
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
}

Piece.prototype.getTranslatedPosition = function () {
  const boardStartX = (window.innerWidth - gameSettings.boardSize) / 2;
  const boardStartY = (window.innerHeight - gameSettings.boardSize) / 2;

  const piecePositionX =
    boardStartX +
    this.position.x * gameSettings.tileSize -
    gameSettings.tileSize;
  const piecePositionY =
    boardStartY +
    this.position.y * gameSettings.tileSize -
    gameSettings.tileSize;

  return {
    x: piecePositionX,
    y: piecePositionY,
  };
};

Piece.prototype.translatePositionToChessPosition = function (position) {
  return {
    x: position.x,
    y: 8 - position.y + 1,
  };
};

Piece.prototype.xPositionToLetter = function (xPosition) {
  return String.fromCharCode(xPosition + 96);
};

Piece.prototype.getTile = function (position) {
  const chessPosition = this.translatePositionToChessPosition(position);
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
