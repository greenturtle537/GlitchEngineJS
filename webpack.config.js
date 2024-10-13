// This file is for creating the webpack of the GlitchEngineJS project.
const path = require('path');

module.exports = {
  entry: './GlitchEngine.js', // Your main JavaScript file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'GE.js', // The name of the output file
  },
};