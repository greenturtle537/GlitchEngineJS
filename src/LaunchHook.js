import { CanvasWindow, TextWindow } from "../GlitchEngine.js";

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

export { LaunchHook };