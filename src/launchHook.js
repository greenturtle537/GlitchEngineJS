import { CanvasWindow, TextWindow } from "../GlitchEngine.js";

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

export { LaunchHook };