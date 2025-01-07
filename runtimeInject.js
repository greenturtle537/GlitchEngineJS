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
        background-color: lime;
        z-index: 2; /* Ensure it is behind the #white-text */
    }

    #spinner {
        width: 300px; /* Adjust to match the button size */
        height: 300px; /* Adjust to match the button size */
        background-color: #3498db; /* Solid background */
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

    #spinner b {
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
        <div id="spinner">
            <b>GlitchEngineMK1</b>
        </div>
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

export { runtimeInject }; //Export the runtimeInject class for use in the GlitchEngineJS runtime