import { GraphicWindow } from './GraphicWindow.js';

class TextWindow extends GraphicWindow {

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
                    TextWindow.assetsLoaded++;
                    //console.log(`${TextWindow.assetsLoaded}/256"`);
                }
                TextWindow.fonts.push(convertedFont);
            }
        }
    }
}

export { TextWindow };
