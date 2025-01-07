# GlitchEngineJS MK1
First implementation of the GlitchEngineJS.

# Install from-source
To use the bleeding edge implementation of GlitchEngineJS, add this submodule to your repository and load from the GlitchEngine.js script as seen in our demo. It should look something like `<script src="GE.js" type="module"></script>`.

# Install stable release
**WE RECOMMEND** that non-developers use our CDN version / stable release. Do not attempt to clone this repository, but rather make sure to load our script from our website. It should look something like `<script src="http://files.glitchtech.top/GE.js" type="module"></script>`. You can also select your specific version from our releases tree under `https://files.glitchtech.top/GlitchEngineJS/releases/`

We'll update GlitchEngineJS every so often, but our web release *will* be minimized, so you'll have to refer to our GitHub for changes. Please note that nothing is guaranteed to stay in or out of this repository at this time, as our engine is undergoing heavy construction. We assess that it is currently in it's **DEMO** stage.

# Using the Engine
To call GlitchNetJS in your code, simply create a CanvasWindow object of your required dimensions and include the correct entry point to your program.
`import {CanvasWindow} from 'https://files.glitchtech.top/GE.js';`
`const canvasWindow = new CanvasWindow(640, 480, main);` (Where main is the entry point to your program i.e. `function main() {};`)


As of 1/6/2025, GlitchEngine is working on version 0.0.2