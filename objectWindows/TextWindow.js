import { GraphicWindow } from './GraphicWindow.js';

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
        const fontMap = 
    ` ☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`; 
        //fontMap is for reference only. These characters will not translate through file systems properly.
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

export { TextWindow };