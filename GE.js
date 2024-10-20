class runtimeInject {
    static css = `
    canvas {
        background-color: #000000;
        image-rendering: pixelated;
        object-fit: contain;
        left: 0;
        top: 0;
        margin: 0;
    }

    body {
        background-color: #000000;
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
        z-index: 9999;
    }

    #black-box {
        display: none;
        width: 100vw;
        height: 100vh;
        background-color: black;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2; /* Ensure it is behind the #white-text */
    }

    #spinner {
        width: 300px; /* Adjust to match the button size */
        height: 300px; /* Adjust to match the button size */
        background-color: #fff; /* Solid background */
        position: absolute;
        top: 40%;
        left: 40%;
        transform: translate(-50%, -50%);
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 2s linear infinite;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #spinner p {
        margin: 0;
        color: #000;
        font-size: 32px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .hidden {
        display: none;
    }
    `;
    static html = `
    <div id="blit-canvas-container"></div>
    <div id="canvas-container"></div>
    <button id="play-button">Play</button>
    <div id="black-box">
        <div id="spinner">
            <p>Game is Loading!</p>
        </div>
    </div>
    `;
    static inject() {
        const style = document.createElement('style');
        style.textContent = this.css;
        document.head.appendChild(style);

        document.body.insertAdjacentHTML('afterbegin', this.html);
    }
}

//runtimeInject.inject(); //This will inject code during runtime, rely on GlitchEngineJS for injection during dev runtimes

function createElementNS( name ) {

	return document.createElementNS( 'http://www.w3.org/1999/xhtml', name );

}

function createCanvasElement() {

    const canvas = createElementNS( 'canvas' );
    canvas.style.display = 'block';
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
    static baseFontURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACAAAAAAICAIAAADieYhtAAAIq0lEQVR42u1d227rRgxk/v+j0wIFgsCSyLmt1k6lh8J1dFYyRfEyQ3K/6vr4/v5++ebr62v8/t/PPx9eVnv55vdSp386fonc5NWC+Pm/zzn+5Kszf/7aX+K3cE4F1fzS46Wvvjl+Rh4lLvCrR4l//xHHlSaf6nmj/6wQTt+LfhH/orsE2yhhI3/ktW1EemXEruTfnK/dT0QVhTd0NGKIkdEsZy/Pxng2om7MKagPL9c99WWjZEabkNKr1Pm9swBlC9pAwRldCRDRZyp+0F4u4Y2m/iF+cn8m7jL6SCxlxPZ6nI+4/ytpj5bkdAVEsTU/BZqy0Q4IeovkKex1QT9CrTP+r28fkCRF1kBnnT5yaNKfPuQ7lSQYTCLRNfJl9jWnQkdQ6xY9L1alNeP88/m/Dy//Pb7g4P1Q3/dQhiBVPFVMraOlnH7+vvS6q+V5w/lb9C34nrLrUxLTcDwW62Mhr3V2/jY/MvpT0+Uh0akQV+ARAvJXHFWL4HWpAIwNBqjji8qXkDeqxyZA4KlCBAASdI4RJ4KDgM7pJXA5Ak9CrgXeTPMBV3oB69QcPBs4HrWlz+IQSzRGwBQo1ushpUipKGpRNC+g/40cimG5+nd8TD4FoTn3s45FY9nBXv7mI8DB8atbAtdko17kHcQdRE8kgHJAfhd1/qnT2U4AjDI3Az42NhIAR8FIrs42g2Z50SX2ourvf/+OVzpVnjGu1vwX63HWPa/VdQ9agLQOqGVtbIoIEYiTeOjix11xrG10PU6JlYlyRvR81H8wWm6ComOkd4X+H1WxZ4YeAuAhAB4C4CEANAJAKKg6/kmo90VcMBKW3GA08BgJLwhbhJNQqJqGCS9KxMbCeueiAwFwZOOPImheM7DCV2CorqgF5CH1UcgVA4MUB9VUxIpXyI7YcY8pg7i/U3ZkvsOC4WBx5NFABwkAxAHgiRMe15oAWd3eNEAh/hrZi4OSPYumeeg4ATA+QRZraAxFivWkxHWFSb0khPJ7xBIAuF3qjT/ItgYJANxEpAgAAaCRy2PZn2bC+qyRHHMSsENlXB8MQEfnjpMxcrvhKM9Ggft6z7ECHSfg93bAaMGSg7aUR/mP1R6N/Kky5yKrTFLXBcviRkycLakZsYZGh9+Z0ELeOzyvEaqgHDu/SMIp25KK21NEoGxOb+4AQPJu5BVGnA7yKNl4Elzn0wmAK1PQy2HM+nusZrwuCq6p649jJGSAHoyO8PXH+3x/AmC0KqmYkMLTRsXA/WB5hC6F+2l5OhUX4XcuEwDjP6+VxLzv9/Fmi+UdAMKoByqH7PP/l++PkUSdFeOffo9XTFMdxKzcZExnzKXN+kct8AL1BFfF06WQ3NuPZpAOAERuWgs/hfKAL69joCmU7arRCcHCcIADd07a8yqmw2lRPM1iRjIBgIMRoF0CgUJKD+VXg5pD1VjXMXNjAUoklMeVVmvjALFmze6l2L4go8nqv3M+23ZTfGVQJNBkK55SZNJIDLB+x9d/jQBj2Roc06fik2xnm0ZXmEmj8yziBIzZUQciqmN8KxMqQX2QnwuSyoJB/mkZgemSBLn1zlpA64T4hJrfi2eLVEvfWO4zdgD05f+1rwMg5Wq1aOfpAKiV84dXU60bOwAiEEd9bAfAlTERCgSF+Hk8WQgwqIJUPA8FHQTCA+3tAGDxMXNkq1xhIxNLSQKgH5TcQEgaAm7OgHYIAGRNKvbSCACkA4DNaXvydhxZI7+rLIkX6QBgR0KlHP9I2FB0KzgbSgbOtnQAIHdiqgSVMFNgkPbSRaQa6ctjCZixMnFjBwA4n419XtSoomawW5E9m0iqU2RLoMkWU7P7ix95gUCiJqqYslem/guBrzO3zScAKM+1kQDAuZMt+p8dAecrPwtMOwnbiMmCKCdFMI95xD0dGMIoABzjpkjEvZ9TBECp7V9syG0mWb49yRaI+GO7wEZDX0S1sgPAMT5shX6FOgCE61L3U0xFHQ6hLl2n10OK1pLh4BUdAKkDjCoddC7yWFP6liUJ+u5k1k8583myBECkY1uwVH4HgBz0rpuuzBbmasSDNlocxPdoAqCwcX6FTYqsRFPSohFAY7KBzGnpsSpEgAi/ZBZfg2PWQQJGA5r9hOo0WESYldWAEThqpqSZ5pE0QACMsjPoR93OZheR5E0mAOK1kAi7ltUcIeYI7gHgvC8aAeD8luDeHlQxeFwODcTZZ0fCgOBdo8bBC8WD6TJqVXCsNkWAFVBm4bdOsykrRRThe2AUPPu14BFM/fO6ZwQQC4yaehvvNiivCsfMHsvuAEgRfm8L9I8chjYCCEfiQEZQrlhf9FzAzbTLGGUmk4J9cwClvc09f9AeAKnZ7lu2ecjGS6s7BiKdGTfstRC5royB3rz+uo4Thw+IEACLOgDYRJLFP4scVS2Q8XIzGR7P+ES4HACn9tZahB86S2UIAJC1O/Xi+ILyJn6pTYBHFLKhdhtWYNyPEdzruOzxl00YR3XBrN6/9K2Odf1x4Cj8N9kNL0IAgJ16iHdh2amatoVwdrSWZwpHWthSKAZoTPAKUKr8c7SrV6piVlb2RDI+moytRwOVtiaK3RyphBt5mfBggdTR759yvUs7AIQZ9MhIN2pw+QivCPhXap0iR/dUaAQKNW+NGrWHZ8XaBmhjgldk4QuVEoDeDXHByOARLYH0c+AtewwE94TAN1cLjgDKPhcKsKCUUPZT2oxjWW7B2fp+tg8GjVSLVWrI3s17ADwEwEMAPATAQwAUOVJSIwB6/+5XuOOjksdCLtyPIE2Z1CjmMZIMBidLd9a9AbhPHcln4Pza8rYl0YyCgD05Qw/GzYdvduSUtmmb0jzHHzg+msJ55Pwcz/Ecn+6/IhuK7IoynZt5q7vd8rz+Xtbh3+rjJf+qnkd2bkfwjufQDEI2TGU7APbuAfAQALKcI+s8BMDe9f8kAfBWybgmxvtDzY8DK/AJLv+rEPcf1cqLcfK5d3AAAAAASUVORK5CYII=" 
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
        TextWindow.fonts.push(font);
        for (let j = 0; j < TextWindow.colors.length; j++) {
            for (let i = 0; i < TextWindow.colors.length; i++) {
                const colorCode = TextWindow.colors[i];
                const color = TextWindow.colorCodeConvert(colorCode);
                const bgcolorCode = TextWindow.colors[j];
                const bgcolor = TextWindow.colorCodeConvert(bgcolorCode);
                const convertedFont = TextWindow.convertWhitePixelsToColor(font, color, bgcolor);
                convertedFont.onload = function() {
                    this.assetsLoaded++;
                }
                TextWindow.fonts.push(convertedFont);
            }
        }
    }
}


class LaunchHook {
    static viewFullScreen = document.getElementById("play-button");
    static spinner = document.getElementById('black-box');
    static showSpinner() {
        this.spinner.style.display = 'flex';
    }
    static hideSpinner() {
        this.spinner.style.display = 'none';
    }
    static buttonHook(callback) {
        if (this.viewFullScreen) {
            this.viewFullScreen.addEventListener("click", function() {
                if (typeof callback === 'function') {
                    callback();
                }
                CanvasWindow.fullscreenSetup(this.viewFullScreen);
            });
        }
    }   
    static async fontHook(callback) {
        console.log("Trying font hook");
        this.showSpinner();
        TextWindow.initFont().onload=async function(){TextWindow.fontLoader(this);callback();} //Super readable, right?
    }
}

export { CanvasWindow, GraphicWindow, TextWindow, KeyBehaviour, LaunchHook, createCanvasElement, createElementNS };
