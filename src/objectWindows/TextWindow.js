import { GraphicWindow } from './GraphicWindow.js';

class TextWindow extends GraphicWindow {

    static fonts = [];
    static baseFontURI = "data:image/png;base64,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" 
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

export { TextWindow };
