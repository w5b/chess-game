import Game from "./game.js";

const DEBUG_MODE = true;

function gameLoop(game) {
    game.draw();
    requestAnimationFrame(() => gameLoop(game));
}

function main() {
    let game;
    DEBUG_MODE ? game = window.game = new Game() : game = new Game();
    requestAnimationFrame(() => gameLoop(game));
}

main();
