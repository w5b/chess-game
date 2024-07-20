import Game from "./game.js";
import gameSettings from "./gameSettings.js";

function gameLoop(game) {
  game.draw();
  requestAnimationFrame(() => gameLoop(game));
}

function createResetBoardButton() {
  const button = document.createElement("button");
  button.innerText = "Reset Board";
  button.onclick = function () {
    window.game && window.game.board.initializeBoard();
  };
  button.style.position = "absolute";
  button.style.zIndex = 999;
  button.style.userSelect = "none";
  document.body.insertBefore(button, document.body.firstChild);
}

function main() {
  let game;
  if (gameSettings.DEBUG_MODE) {
    game = window.game = new Game();
    createResetBoardButton();
  } else {
    game = new Game();
  }
  requestAnimationFrame(() => gameLoop(game));
}

main();
