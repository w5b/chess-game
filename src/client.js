import Game from "./game.js";
import gameSettings from "./gameSettings.js";

function gameLoop(game) {
  game.draw();
  requestAnimationFrame(() => gameLoop(game));
}

function main() {
  let game;
  gameSettings.DEBUG_MODE
    ? (game = window.game = new Game())
    : (game = new Game());
  requestAnimationFrame(() => gameLoop(game));
}

main();
