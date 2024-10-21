class runtimeInject {
    static css = `
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

export { runtimeInject }; //Export the runtimeInject class for use in the GlitchEngineJS runtime