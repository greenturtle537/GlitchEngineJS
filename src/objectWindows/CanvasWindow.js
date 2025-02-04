import { createElementNS, createCanvasElement } from "../utils.js";
import { LaunchHook } from "../LaunchHook.js";
class CanvasWindow {

    // static canvasContainer = document.getElementById('canvas-container');
    static canvas = createCanvasElement();
    static ctx = CanvasWindow.canvas.getContext('2d');
    // static blitCanvasContainer = document.getElementById('blit-canvas-container');
    static blitCanvas = createCanvasElement();
    static blitctx = CanvasWindow.blitCanvas.getContext('2d');
    static nearestX = 0;
    static nearestY = 0;
    static width = 640;
    static height = 400;

    constructor(width, height, promisedFunction) {
        
        LaunchHook.buttonHook(promisedFunction); //So as not to create strange canvas behaviour

        CanvasWindow.width = width;
        CanvasWindow.height = height;
        
        CanvasWindow.canvas.width = width+16;
        CanvasWindow.canvas.height = height+16;
        document.body.appendChild(CanvasWindow.canvas);

        CanvasWindow.blitctx.canvas.width = width;
        CanvasWindow.blitctx.canvas.height = height;

        CanvasWindow.canvas.addEventListener("mousedown", function(event) {
            const pos = this.getMousePos(CanvasWindow.canvas, event);
            this.nearestX = Math.floor(pos.x / 8) * 8;
            this.nearestY = Math.floor(pos.y / 8) * 8;
        });

        window.addEventListener('resize', function() {
            // Update canvas size
            CanvasWindow.resizeCanvas();
        });

        CanvasWindow.clearScreen();
    }

    static getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
      
        return {
            x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
            y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    }
    
    static blitBuffer() {
        //console.time("blitBuffer");
        this.ctx.drawImage(this.blitCanvas, 8, 8);
        //console.timeEnd("blitBuffer");  
    }

    static clearScreen() {
        this.ctx.fillStyle = "black";
        this.blitctx.fillRect(0, 0, this.blitCanvas.width, this.height);
        this.blitBuffer();
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(0, 0, this.canvas.width, 8);
        this.ctx.fillRect(0, 0, 8, this.canvas.height);
        this.ctx.fillRect(0, this.canvas.height-8, this.canvas.width, 8);
        this.ctx.fillRect(this.canvas.width-8, 0, 8, this.canvas.height);
    }

    static fillStyle(color) {
        this.blitctx.fillStyle = color;
    }

    static fillRect(graphicWindow, x, y, width, height) {
        this.blitctx.fillRect(x+graphicWindow.x, y+graphicWindow.y, width, height);
    }

    static drawImage(graphicWindow, image, x, y) {
        this.blitctx.drawImage(image, x+graphicWindow.x, y+graphicWindow.y);
    }

    static drawImage(graphicWindow, image, sx, sy, sw, sh, dx, dy, dw, dh) {
        this.blitctx.drawImage(image, sx, sy, sw, sh, dx+graphicWindow.x, dy+graphicWindow.y, dw, dh);
    }

    static resizeCanvas() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const aspectRatio = this.width / this.height;
    
        let newWidth = windowWidth;
        let newHeight = windowWidth / aspectRatio;
    
        if (newHeight > windowHeight) {
            newHeight = windowHeight;
            newWidth = windowHeight * aspectRatio;
        }
    
        this.canvas.style.width = `${newWidth}px`;
        this.canvas.style.height = `${newHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '50%';
        this.canvas.style.left = '50%';
        this.canvas.style.transform = 'translate(-50%, -50%)';
    }

    static oldResizeCanvas() {
        const sheet = document.styleSheets[0];
        const canvasRule = sheet.cssRules[0];
        let w = window.innerWidth;
        let h = window.innerHeight;
        let scalefactor = 1;
        let idealWidth = this.width;
        let idealHeight = this.height;
        if (w > h) {
            scalefactor = (h * idealWidth) / (w * idealHeight);
        } else {
            scalefactor = (w * idealWidth) / (h * idealHeight);
        }
        scalefactor = scalefactor * 100; // Fudge factor to remove scrollbars, trust me on this one.
        canvasRule.style.width = scalefactor.toString() + "%";
        canvasRule.style.height = scalefactor.toString() + "%";
        // Center the canvas to the window
        let marginRight = (w / 2) - ((w * scalefactor / 100) / 2);
        canvasRule.style.margin = `0px ${marginRight}px`;
        // Apply the same styles to the actual canvas element
        CanvasWindow.canvas.style.width = scalefactor.toString() + "%";
        CanvasWindow.canvas.style.height = scalefactor.toString() + "%";
        CanvasWindow.canvas.style.margin = `0px ${marginRight}px`;
    }  

    static fullscreenSetup(fullscreenController) {
        var docElm = document.documentElement;
        docElm.addEventListener("fullscreenchange", CanvasWindow.fullscreenchanged);
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        fullscreenController.classList.add("hidden");
    }

    static fullscreenchanged() {
        //console.log(`Entered Fullscreen`);
        CanvasWindow.resizeCanvas();
        CanvasWindow.orientationLock();
    }
    
    
    static orientationLock() {
        screen.orientation.lock("landscape-primary")
        .catch((error) => {
            console.log(`Error: ${error.message}, This device doesn't support rotation. Probably because it's a desktop.`);
        });
    }
}

export { CanvasWindow };