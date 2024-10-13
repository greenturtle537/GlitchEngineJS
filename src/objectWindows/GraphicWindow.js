import {CanvasWindow} from "./CanvasWindow.js";

class GraphicWindow {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    
    constructor(width, height, x, y) {
        this.ctx = CanvasWindow;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    clearScreen() {
        this.ctx.fillStyle("black");
        this.ctx.fillRect(this, 0, 0, this.width, this.height);
        this.ctx.blitBuffer();
    }

    getPos() {
        return { x: this.x, y: this.y };
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

}

export {GraphicWindow}