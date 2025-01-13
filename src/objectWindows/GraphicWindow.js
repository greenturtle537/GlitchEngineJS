import {CanvasWindow} from "./CanvasWindow.js";

class GraphicWindow {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    
    /* Example call:
    /  const graphicWindow = new GraphicWindow({
    /      width: 100,
    /      height: 100,
    /      x: 0,
    /      y: 0
    /  });
    */
    constructor(object) {
        this.ctx = CanvasWindow;
        this.width = object.width;
        this.height = object.height;
        this.x = object.x;
        this.y = object.y;
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