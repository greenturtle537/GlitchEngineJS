class CanvasWindow {

    static canvasContainer = document.getElementById('canvas-container');
    static canvas = document.createElement('canvas');
    static ctx = CanvasWindow.canvas.getContext('2d');
    static blitCanvasContainer = document.getElementById('blit-canvas-container');
    static blitCanvas = document.createElement('canvas');
    static blitctx = CanvasWindow.blitCanvas.getContext('2d');
    static nearestX = 0;
    static nearestY = 0;
    static width = 640;
    static height = 400;

    constructor(width, height) {        

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

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
            scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
      
        return {
            x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
            y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
    }
    
    static blitBuffer() {
        console.time("blitBuffer");
        this.ctx.drawImage(this.blitCanvas, 8, 8);
        console.timeEnd("blitBuffer");  
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
        scalefactor = scalefactor * 98; // Fudge factor to remove scrollbars, trust me on this one.
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
        console.log(`Entered Fullscreen`);
        CanvasWindow.resizeCanvas();
        CanvasWindow.orientationLock();
    }
    
    
    static orientationLock() {
        screen.orientation.lock("landscape-primary")
        .catch((error) => {
            //console.log(`Error: ${error.message}`);
            console.log("This device doesn't support rotation. Probably because it's a desktop.");
        });
    }
}


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


class TextWindow extends GraphicWindow {

    static fonts = [];

    static colors = [
        // index 0 == white
        "#000000", // black 1
        "#0000AA", // dark blue 2
        "#00AA00", // dark green 3
        "#00AAAA", // dark cyan 4
        "#AA0000", // dark red 5
        "#AA00AA", // dark magenta 6
        "#AA5500", // dark yellow 7
        "#AAAAAA", // light gray 8
        "#555555", // dark gray 9
        "#5555FF", // blue 10
        "#55FF55", // green 11
        "#55FFFF", // cyan 12
        "#FF5555", // red 13
        "#FF55FF", // magenta 14
        "#FFFF55", // yellow 15
        "#FFFFFF"  // white 16
    ]; //Picking colors is dark magic now

    constructor(width, height, x, y, rows, cols, editable = false, keyRules = () => {}, text = "") {
        super(width, height, x, y);

        this.rows = rows;
        this.cols = cols;
        this.editable = editable;
        this.text = this.rowSeperate(text);
        if (text !== "") {
            this.drawText(this.text, x, y);
        }
        if (editable[0] === true) {
            this.typingOn = true;
        }
        if (keyRules && typeof keyRules === 'function') {
            console.log(keyRules);
            this.initKeyControl(keyRules);
        }

        //TextWindow.fonts = fonts;
    }

    initKeyControl(keyRules) {
        keyRules(this);
    }
    
    rowSeperate(text) {
        const rows = text.split("\n");
        return rows;
    }

    drawText(text, x, y, color=0, center=false) {
        const fontWidth = 8;
        const fontHeight = 8;
        
        const fontCodeMap = [
            32,9786,9787,9829,9830,9827,9824,8226,9688,9675,9689,9794,9792,9834,9835,9788,
            9658,9668,8597,8252,182,167,9644,8616,8593,8595,8594,8592,8735,8596,9650,9660,
            32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,
            58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,
            84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,
            108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126
        ]; //This is the IBM Code Page 437 character set. For proper charmapping, see the wikipedia page check the fontmap variable in a text editor with proper unicode support.
        //129 more characters to add, but this is good enough for demo
        for (let i = 0; i < text.length; i++) {
            const charIndex = fontCodeMap.indexOf(text.charCodeAt(i));
            const sx = charIndex * fontWidth;
            const sy = 0;
            let xPos = x + (i * fontWidth);
            if (center) {
                const textWidth = text.length * fontWidth;
                xPos = (this.width - textWidth) / 2 + (i * fontWidth);
            }
            this.ctx.drawImage(this, TextWindow.fonts[color], sx, sy, fontWidth, fontHeight, xPos, y, fontWidth, fontHeight);
        }
        this.ctx.blitBuffer();
    }

    static colorCodeConvert(colorCode) {
        const red = parseInt(colorCode.substr(1, 2), 16);
        const green = parseInt(colorCode.substr(3, 2), 16);
        const blue = parseInt(colorCode.substr(5, 2), 16);
        return { red, green, blue };
    }

    static convertWhitePixelsToColor(image, color, bgcolor = { red: 0, green: 0, blue: 0 }) {
        const canvas = document.createElement('canvas');
        canvas.style.display = "none";
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            if (red === 255 && green === 255 && blue === 255) {
                data[i] = color.red;
                data[i + 1] = color.green;
                data[i + 2] = color.blue;
            } else if (red === 0 && green === 0 && blue === 0) {
                data[i] = bgcolor.red;
                data[i + 1] = bgcolor.green;
                data[i + 2] = bgcolor.blue
            } 
        }
        ctx.putImageData(imageData, 0, 0);
        const output = new Image();
        output.src = canvas.toDataURL();
        return output;
    }

    static fontLoader(font) { 
        TextWindow.fonts.push(font);
        for (let j = 0; j < TextWindow.colors.length; j++) {
            for (let i = 0; i < TextWindow.colors.length; i++) {
                const colorCode = TextWindow.colors[i];
                const color = TextWindow.colorCodeConvert(colorCode);
                const bgcolorCode = TextWindow.colors[j];
                const bgcolor = TextWindow.colorCodeConvert(bgcolorCode);
                const convertedFont = TextWindow.convertWhitePixelsToColor(font, color, bgcolor);
                convertedFont.onload = function() {
                    assetsLoaded++;
                }
                TextWindow.fonts.push(convertedFont);
            }
        }
    }
}

class KeyBehaviour {
    static menuBehaviour = (textWindow=null) => {
        let menuPos = 0;
        let typingOn = false;
        let overflowNotPermitted = true;
        let typingPositionX = 0;
        let typingPositionY = 0;
        let command = "";
        let flag = 1;
        
        console.log("KeyListener Loaded");
        document.addEventListener("keydown", function(event) {
            const key = event.key;

            if (flag === 1) {
                if  ((key === "w" || key === "s") && (menuPos != -1 && menuPos != 4)) {
                    textWindow.drawText(">", 0, 0+(16*(menuPos+1)), 0);
                    console.log("drawn");
                }
                if ( key === "w" && menuPos != 0) {
                    menuPos--;
                    textWindow.drawText(">", 0, 0+(16*(menuPos+1)), 15);
                } else if (key === "s" && menuPos != 3) {
                    menuPos++;
                    textWindow.drawText(">", 0, 0+(16*(menuPos+1)), 15);
                } else if (key === "Enter") {
                    if (menuPos === 0) {
                        // Start
                        textWindow.drawText("An Error Occured", 272, 0, 12);
                        flag++;
                        textWindow.clearScreen();
                        introSeq();
                    } else if (menuPos === 1) {
                        // Load
                    } else if (menuPos === 2) {
                        // Options
                        textWindow.drawText("An Error Occured", 272, 0, 12);
                    } else if (menuPos === 3) {
                        // Exit
                        textWindow.drawText("An Error Occured", 272, 0, 12);
                    }
                }
            } else if (flag === 2) {
                if (typingOn && overflowNotPermitted) {
                    if (key.length === 1 && typingPositionX < 640) {
                        textWindow.drawText(key, typingPositionX, typingPositionY);
                        typingPositionX += 8;
                        command += key;
                    } else if (key === "Backspace" && typingPositionX > 0) {
                        typingPositionX -= 8;
                        textWindow.drawText(" ", typingPositionX, typingPositionY);
                        command = command.slice(0, -1);
                    } else if (key === "Enter") {
                        textWindow.drawText("                                                                                ", 0, typingPositionY);
                        typingPositionX = 0;
                        //evalCommand(command);
                    }
                } else if (typingOn && !overflowNotPermitted) {
                    if (key.length === 1) {
                        // Handle single character input here
                        if (typingOn) {
                        textWindow.drawText(key, typingPositionX, typingPositionY);
                        typingPositionX += 8;
                        if (typingPositionX >= 632) {
                            typingPositionX = 0;
                            typingPositionY += 8;
                        }
                        }
                    }
                }
            }
        });
    }

    static getBehaviour(behaviourName, ...args) {
        if (behaviourName === 'menu') {
            return KeyBehaviour.menuBehaviour;
        }
        // Add other behaviours as needed
        return null;
    }
}

export { CanvasWindow, GraphicWindow, TextWindow, KeyBehaviour };