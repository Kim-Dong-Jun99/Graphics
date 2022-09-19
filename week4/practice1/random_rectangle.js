var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  loading shader
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // load data into GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );

    // link shader variables with gpu
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer( vPosition, size, type, normalize, stride, offset);
    gl.enableVertexAttribArray( vPosition );

    // link shader variables with gpu
    var vResolution = gl.getUniformLocation(program, "vResolution");
    var fColor = gl.getUniformLocation(program, "fColor");

    // setting resolution
    gl.uniform2fv(vResolution, [gl.canvas.width, gl.canvas.height]);

    // draw 50 random rectangles in random colors
    for (var i = 0; i < 50; ++i) {
        // create random rectangle
        setRectangle(
            gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

        // set random color.
        gl.uniform4fv(fColor, [Math.random(), Math.random(), Math.random(), 1]);

        // draw rectangle
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }

};

// function for random number
function randomInt(range) {
    return Math.floor(Math.random() * range);
}

// create rectangle function
function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;



    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2]), gl.STATIC_DRAW);
}
