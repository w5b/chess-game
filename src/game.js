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
        const devicePixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * devicePixelRatio;
        this.canvas.height = window.innerHeight * devicePixelRatio;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
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
