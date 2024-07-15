import Board from "./board/board.js";

class Game {
    constructor() {
        this.board = new Board();

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.setCanvasSize();

        window.onresize = this.onWindowResize.bind(this);
    }

    setCanvasSize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.scale(dpr, dpr);
    }

    draw() {
        this.board.draw(this.ctx);
    }

    onWindowResize() {
        this.setCanvasSize();
        this.draw();
    }
}

export default Game;
