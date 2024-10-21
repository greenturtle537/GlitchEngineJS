function createElementNS( name ) {

	return document.createElementNS( 'http://www.w3.org/1999/xhtml', name );

}

function createCanvasElement() {

    const canvas = createElementNS( 'canvas' );
    canvas.style.display = 'block';
    canvas.style.backgroundColor = '#000000';
    canvas.style.imageRendering = 'pixelated';
    canvas.style.objectFit = 'contain';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.margin = '0';
    return canvas;

}

export { createElementNS, createCanvasElement };