# GlitchEngineJSMK1
First implementation of the GlitchEngineJS.

# Install from-source
To use the bleeding edge implementation of GlitchEngineJS, add this submodule to your repository and load from the GlitchEngine.js script as seen in our demo. It should look something like `<script src="GlitchEngine.js" type="module"></script>`.

# Install stable release
**WE RECOMMENED** that non-developers use our CDN version / stable release. Do not attempt to clone this repository, but rather make sure to load our script from our website. It should look something like `<script src="http://files.glitchtech.top/GE.js" type="module"></script>`. You can also select your specific version from our releases tree under `https://files.glitchtech.top/GlitchEngineJS/releases/`

We'll update GlitchEngineJS every so often, but our web release *will* be minimized, so you'll have to refer to our GitHub for changes. Please note that nothing is guaranteed to stay in or out of this repository at this time, as our engine is undergoing heavy construction. We assess that it is currently in it's **DEMO** stage.

# Other instructions
If you'd like to generate and serve your own flavor of GlitchEngine, you can use NPM to get `webpack`, the tool we use for producing our minimized releases, like so `npm install webpack webpack-cli --save-dev`. Then run `npx webpack` (assuming you have the `webpack.config.js`) and are in the root project folder. The resulting file can be found at `dist/GE.js`.