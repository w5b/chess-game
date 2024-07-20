import gameSettings from "../../../gameSettings.js";
import pieceIds from "../pieceIds.js";

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

    this.previousPosition = {
      x: 0,
      y: 0,
    };

    this.isDragged = false;
  }

  draw(ctx) {
    this.getCachedPieceImage(this.idString, this.color)
      .then((image) => {
        ctx.drawImage(
          image,
          this.visualPosition.x,
          this.visualPosition.y,
          gameSettings.tileSize,
          gameSettings.tileSize
        );
      })
      .catch((error) => {});
  }

  update() {
    if (!this.isDragged) {
      const translatedPosition = this.getTranslatedPosition();
      const distanceX = translatedPosition.x - this.visualPosition.x;
      const distanceY = translatedPosition.y - this.visualPosition.y;
      const lerpFactor = 0.1;
      const speed = 1 - Math.exp(-lerpFactor);

      this.visualPosition.x += distanceX * speed;
      this.visualPosition.y += distanceY * speed;
    }
  }

  getWalkableTiles(board) {
    return [];
  }

  forwardTile(amount, direction) {
    const amountDirectionY =
      direction == this.direction.backwards ? amount : -amount;

    const newPosition = {
      x: this.previousPosition.x,
      y: this.previousPosition.y + amountDirectionY,
    };

    if (!this.isPositionInBoardsBounds(newPosition)) return null;

    return newPosition;
  }

  sideTile(amount, direction) {
    const amountDirectionX =
      direction === this.direction.left ? -amount : amount;

    const newPosition = {
      x: this.previousPosition.x + amountDirectionX,
      y: this.previousPosition.y,
    };

    if (!this.isPositionInBoardsBounds(newPosition)) return null;

    return newPosition;
  }

  diagonalTile(amount, direction) {
    const amountDirectionX =
      direction === this.direction.leftBackWards ||
      direction === this.direction.leftForwards
        ? amount
        : -amount;
    const amountDirectionY =
      direction === this.direction.leftForwards ||
      direction === this.direction.rightForwards
        ? -amount
        : amount;

    const newPosition = {
      x: this.previousPosition.x + amountDirectionX,
      y: this.previousPosition.y + amountDirectionY,
    };

    if (!this.isPositionInBoardsBounds(newPosition)) return null;

    return newPosition;
  }

  knightTile(direction, type) {
    const amountDirectionX =
      direction === this.direction.rightBackwards ||
      direction === this.direction.rightForwards
        ? type === 1
          ? 2
          : 1
        : type === 1
        ? -2
        : -1;

    const amountDirectionY =
      direction === this.direction.leftForwards ||
      direction === this.direction.rightForwards
        ? type === 1
          ? 1
          : 2
        : type === 1
        ? -1
        : -2;

    const newPosition = {
      x: this.previousPosition.x + amountDirectionX,
      y: this.previousPosition.y + amountDirectionY,
    };

    if (!this.isPositionInBoardsBounds(newPosition)) return null;

    return newPosition;
  }

  canGoTo(position, board) {
    for (const possiblePosition of this.getWalkableTiles(board)) {
      if (
        position.x == possiblePosition.x &&
        position.y == possiblePosition.y
      ) {
        return true;
      }
    }
    return false;
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

Piece.prototype.isPositionInBoardsBounds = function (position) {
  return (
    position.x >= 1 && position.x <= 8 && position.y >= 1 && position.y <= 8
  );
};

Piece.prototype.equal = function (otherPiece) {
  return (
    this.tilePosition.x == otherPiece.tilePosition.x &&
    this.tilePosition.y == otherPiece.tilePosition.y
  );
};

Piece.prototype.simpleWalkCheck = function (tile, board) {
  const walkableTiles = [];
  if (!tile) return [];
  const piece = board[tile.x - 1][tile.y - 1];

  if (piece) {
    if (piece.color != this.color) {
      if (piece.id == pieceIds.King) piece.setIsChecked(true);
      walkableTiles.push(tile);
    } else {
      return [];
    }
  } else {
    walkableTiles.push(tile);
  }
  return walkableTiles;
};

Piece.prototype.idString = "piece";
Piece.prototype.id = 0;
Piece.prototype.piecesCachedImageList = [];
Piece.prototype.direction = {
  backwards: 1,
  forwards: 2,
  left: 3,
  right: 4,
  rightBackwards: 5,
  rightForwards: 6,
  leftBackWards: 7,
  leftForwards: 8,
};

export default Piece;
