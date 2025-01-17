class runtimeInject {
    static css = `
    body {
        background-color: black;
        width: 100vw; 
        height: 100vh;
        margin: 0;
        padding: 0;
    }

    button {
        width: 200px;
        height: 200px;
        border-radius: 100%;
        background-color: #ffffff;
        color: #000000;
        font-size: 48px;
        font-weight: bold;
    }
    
    #play-button {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
    }

    #play-button.hidden {
        display: none;
    }
    
    img {
        display: none;
    }

    #white-text {
        position: absolute;
        top: 0;
        left: 0;
        color: white;
        z-index: 3;
    }

    #black-box {
        display: none;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: black;
        z-index: 2; /* Ensure it is behind the #white-text */
    }

    b {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        margin: 0;
        color: #ffffff;
        font-size: 32px;
    }

    .hidden {
        display: none;
    }

    canvas {
        display: none;
    }

    .pixelCon {
        position: absolute;
        width: 120%;  height: 120%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        z-index: 1;
    }

    .pixel {
        background: lime;
        width: 10%;
        padding-top: 10%;
        float: left;
        opacity: 0.0;
        animation: blink 5s infinite;
    }

    @keyframes blink {
        0%    {opacity: 0.0;}
        25%   {opacity: 0.0;}
        50%   {opacity: 0.5;}
        100%  {opacity: 0.0;}
    }
    `;
    static html = `
    <div id="black-box">
        <b>GlitchEngineMK1</b>
        <div class="pixelCon">
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
        </div>
    </div>
    <button id="play-button">Play</button>
    `;
    static inject() {
        const style = document.createElement('style');
        style.textContent = this.css;
        document.head.appendChild(style);

        document.body.insertAdjacentHTML('afterbegin', this.html);

        var pix = document.getElementsByClassName("pixel");
        for (var i = 0; i < pix.length; i++) {
            pix[i].style.animationDelay = Math.ceil(Math.random()*3000)+"ms";
        }
    }
}

function createElementNS( name ) {

	return document.createElementNS( 'http://www.w3.org/1999/xhtml', name );

}

function createCanvasElement() {

    const canvas = createElementNS('canvas');
    //canvas.style.display = 'block';
    canvas.style.backgroundColor = '#000000';
    canvas.style.imageRendering = 'pixelated';
    canvas.style.objectFit = 'contain';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.margin = '0';
    return canvas;

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


class TextWindow extends GraphicWindow {
    width = 100;
    height = 100;
    x = 0;
    y = 0;
    rows = 10;
    cols = 10;
    editable = false;
    text = "Hello World";
    keyRules = null;
    keyRulesParameters = {};

    static fonts = [];
    static baseFontURI = "data:image/png;base64,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";
    static baseFont;

    static assetsLoaded = 0;

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

    /* Example call:
    /  const textWindow = new TextWindow({
    /      width: 100,
    /      height: 100,
    /      x: 0,
    /      y: 0
    /      rows: 10,
    /      cols: 10,
    /      editable: false,
    /      text: "Hello World",
    /      keyRules: function()=>{}
    /      keyRulesParameters: {}
    /  });
    */

    constructor(obj) {
        super(
            {
                width: obj.width,
                height: obj.height,
                x: obj.x,
                y: obj.y
            }
        );

        this.rows = obj.rows;
        this.cols = obj.cols;
        this.editable = obj.editable;
        this.rawText = obj.text
        this.text = this.rowSeperate(obj.text);
        console.log(obj.text);
        if (obj.text != "") {
            for(var i = 0; i < this.text.length; i++) {
                this.drawText(this.text[i], obj.x, obj.y + (i * 16));
            }
        }
        if (obj.editable[0] === true) {
            this.typingOn = true;
        }
        if (obj.keyRules && typeof obj.keyRules === 'function') {
            this.initKeyControl(obj.keyRules, obj.keyRulesParameters);
        }

        for (let i = 0; i < TextWindow.colors.length; i++) {
            TextWindow.fonts.push([]);
        }
    }

    initKeyControl(keyRules, keyRulesParameters) {
        keyRules(this, keyRulesParameters);
    }
    
    rowSeperate(text) {
        let rows = [];
        rows = text.split("\n");
        return rows;
    }

    drawText(text, x, y, color=[0,0], center=false) {
        const fontWidth = 8;
        const fontHeight = 16;
        const fontCodeMap = [
            32,9786,9787,9829,9830,9827,9824,8226,9688,9675,9689,9794,9792,9834,9835,9788,
            9658,9668,8597,8252,182,167,9644,8616,8593,8595,8594,8592,8735,8596,9650,9660,
            32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,
            58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,
            84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,
            108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,8962,
            199, 252, 233, 226, 228, 224, 229, 231, 234, 235, 232, 239, 238, 236, 196, 197,
            201, 230, 198, 244, 246, 242, 251, 249, 255, 214, 220, 162, 163, 165, 8359, 402,
            225, 237, 243, 250, 241, 209, 170, 186, 191, 8976, 172, 189, 188, 161, 171, 187,
            9617, 9618, 9619, 9474, 9508, 9569, 9570, 9558, 9557, 9571, 9553, 9559, 9565, 
            9564, 9563, 9488, 9492, 9524, 9516, 9500, 9472, 9532, 9566, 9567, 9562, 9556, 
            9577, 9574, 9568, 9552, 9580, 9575, 9576, 9572, 9573, 9561, 9560, 9554, 9555, 
            9579, 9578, 9496, 9484, 9608, 9604, 9612, 9616, 9600, 593, 976, 7462, 7464, 8721,
            417, 181, 7451, 632, 1012, 8486, 7839, 8734, 8709, 8712, 8745, 8801, 177, 8805,
            8804, 8992, 8993, 247, 8776, 176, 8729, 183, 8730, 8319, 178, 9632, 32
        ]; 
        //This is the IBM Code Page 437 character set. 
        // For proper charmapping, see the wikipedia page check the fontmap variable in a text editor with proper unicode support.
        for (let i = 0; i < text.length; i++) {
            const charIndex = fontCodeMap.indexOf(text.charCodeAt(i));
            const sx = charIndex * fontWidth;
            const sy = 0;
            let xPos = x + (i * fontWidth);
            if (center) {
                const textWidth = text.length * fontWidth;
                xPos = (this.width - textWidth) / 2 + (i * fontWidth);
            }
            this.ctx.drawImage(this, TextWindow.fonts[color[0]][color[1]], sx, sy, fontWidth, fontHeight, xPos, y, fontWidth, fontHeight);
        }
        this.ctx.blitBuffer();
    }

    static initFont() {
        let font = new Image();
        font.src = TextWindow.baseFontURI;
        font.onload = function() {
            TextWindow.assetsLoaded++;
        }
        return font;
    }

    static setAssetsLoaded(assetsLoaded) {
        TextWindow.assetsLoaded = assetsLoaded;
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
        TextWindow.fonts.push([]);
        TextWindow.fonts[0].push(font);
        for (let j = 0; j < TextWindow.colors.length; j++) {
            TextWindow.fonts.push([]);
            for (let i = 0; i < TextWindow.colors.length; i++) {
                let arrayRef = TextWindow.fonts[j];
                const colorCode = TextWindow.colors[i];
                const color = TextWindow.colorCodeConvert(colorCode);
                const bgcolorCode = TextWindow.colors[j];
                const bgcolor = TextWindow.colorCodeConvert(bgcolorCode);
                const convertedFont = TextWindow.convertWhitePixelsToColor(font, color, bgcolor);
                convertedFont.onload = function() {
                    TextWindow.assetsLoaded++;
                    //console.log(`${TextWindow.assetsLoaded}/256"`);
                }
                arrayRef.push(convertedFont);
            }
        }
    }
}


class LaunchHook {
    static async buttonHook(promisedFunction) {
        const viewFullScreen = document.getElementById("play-button");
        const box = document.getElementById('black-box');
        if (viewFullScreen) {
            viewFullScreen.addEventListener("click", function() {
                CanvasWindow.resizeCanvas();
                box.style.display = 'flex';
                TextWindow.initFont().onload=async function(){
                    TextWindow.fontLoader(this);
                    box.style.display = 'none';
                    CanvasWindow.canvas.style.display="block";
                    promisedFunction();
                } //Super readable, right?
                CanvasWindow.fullscreenSetup(viewFullScreen);
            });
        }
    }
}


runtimeInject.inject();
export { CanvasWindow, GraphicWindow, TextWindow, KeyBehaviour, LaunchHook, runtimeInject, createCanvasElement, createElementNS };