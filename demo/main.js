import { CanvasWindow, TextWindow, KeyBehaviour } from '/GE.min.js';

window.assetsLoaded = 0;

var viewFullScreen = document.getElementById("play-button");
let typingOn, typingPositionX, typingPositionY, overflowNotPermitted;
let font, flag, menuPos;
let command = "";

let canvasWindow = new CanvasWindow(640, 480); //Basically not important unless we need to hack direct reference ¯\_(ツ)_/¯
let textWindow;

//To use fullscreen setup, just add a button and attach it likewise
if (viewFullScreen) {
    viewFullScreen.addEventListener("click", function() {
        CanvasWindow.fullscreenSetup(viewFullScreen);
        init();
    })
}

async function init() {
    //This is control for variable setup and asset loading
    flag = 0;
    menuPos = -1;

    font = new Image();
    font.src = "../assets/ib8xcp437.png";
    font.onload = async function() {
        console.log(font);
        TextWindow.fontLoader(font);
        assetsLoaded++;
        while (assetsLoaded < 15) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        main();
    }
}


function main() {
    CanvasWindow.resizeCanvas();
    flag = 1;
    console.log();
    textWindow = new TextWindow(640, 480, 0, 0, 0, 0, false, KeyBehaviour.getBehaviour("menu"));
    mainMenu();
}

//A game is only a moment in time, but a true adventure lingers in the heart—what separates the two is not the path you walk, but how deeply you choose to travel.

function introSeq() {
    textWindow.drawText("========================================", 320, 232, 0, true);
    textWindow.drawText("| A game is a moment, but an adventure |", 320, 240, 0, true);
    textWindow.drawText("| lingers. What matters is not the way |", 320, 248, 0, true);
    textWindow.drawText("| you walk, but the friends you made   |", 320, 256, 0, true);
    textWindow.drawText("| along the way.      - Greenturtle537 |", 320, 264, 0, true);
    textWindow.drawText("========================================", 320, 272, 0, true);
    textWindow.drawText("Press any key to continue...", 320, 8, 30, true);

    document.addEventListener("keydown", function(event) {
        // Handle key input here
        const key = event.key;
        if (key === "Enter") {
            setTimeout(function() {
                textWindow.clearScreen();
                textWindow.drawText("Darkness. . .", 0, 0);
                textWindow.drawText("--------------------------------------------------------------------------------", 0, 464);
                typingOn = true;
                typingPositionX = 0;
                typingPositionY = 472;
                overflowNotPermitted = true;
            }, 10); // Add a delay here for dramatic effect
        }
    });
}

function mainMenu() {
    //This is the main menu
    textWindow.drawText("Main Menu", 288, 8);
    textWindow.drawText("> Start", 0, 16);
    textWindow.drawText("Load", 16, 32, 9);
    textWindow.drawText(">", 0, 32, 0);
    textWindow.drawText("> Options", 0, 48);
    textWindow.drawText("> Exit", 0, 64);
}

function commandEval() {
    //Idk
}