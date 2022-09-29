
let gl;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.3, 0.8, 0.3, 1.0 );
    gl.clear(gl.COLOR_BUFFER_BIT);

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);


    let vPosition = gl.getAttribLocation( program, "vPosition" );
    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer( vPosition, size, type, normalize, stride, offset);
    gl.enableVertexAttribArray( vPosition );

    let vResolution = gl.getUniformLocation(program, "vResolution");
    let color = gl.getUniformLocation(program, "color");

    gl.uniform2fv(vResolution, [gl.canvas.width, gl.canvas.height]);

    // draw 3 trees
    gl.uniform4fv(color, [0.5, 1.0, 0.5, 1]);
    setTriangles(gl, 60, 250, 80, 30);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    setTriangles(gl, 50, 300, 100, 50);
    gl.uniform4fv(color,[0.0, 1.0, 0.0, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    setRectangle(gl, 75, 300, 50, 100);
    gl.uniform4fv(color,[0.5882, 0.2941, 0, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.uniform4fv(color, [0.5, 1.0, 0.5, 1]);
    setTriangles(gl, 110, 300, 80, 30);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    setTriangles(gl, 100, 350, 100, 50);
    gl.uniform4fv(color,[0.0, 1.0, 0.0, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    setRectangle(gl, 125, 350, 50, 100);
    gl.uniform4fv(color,[0.5882, 0.2941, 0, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);


    gl.uniform4fv(color, [0.5, 1.0, 0.5, 1]);
    setTriangles(gl, 35, 350, 80, 30);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    setTriangles(gl, 25, 400, 100, 50);
    gl.uniform4fv(color,[0.0, 1.0, 0.0, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    setRectangle(gl, 50, 400, 50, 100);
    gl.uniform4fv(color,[0.5882, 0.2941, 0, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // draw house
    setTriangles(gl, 300, 200, 200, 100);
    gl.uniform4fv(color,[1.0, 1.0, 0.0, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    setRectangle(gl, 350, 200, 100, 100);
    gl.uniform4fv(color,[0.3882, 0.2941, 0.3, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.uniform4fv(color,[0.5, 0.5, 1.0, 1]);
    setHexagon(gl, 375, 225, 50, 50);
    gl.drawArrays(gl.LINE_STRIP, 0, 7);

    setTriangles(gl, 150, 100, 150, 100);
    gl.uniform4fv(color,[0.3, 1.0, 0.7, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    setRectangle(gl, 190, 100, 75, 100);
    gl.uniform4fv(color,[0.2, 0.8, 0.8, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.uniform4fv(color,[0.5, 0.5, 1.0, 1]);
    setHexagon(gl, 212, 130,30,30);
    gl.drawArrays(gl.LINE_STRIP, 0, 7);
};



function setTriangles(gl, x, y, width, height) {
    let x1 = x;
    let x2 = x + width;
    let y1 = y;
    let y2 = y - height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        (x1+x2)/2, y2]), gl.STATIC_DRAW);
}

function setRectangle(gl, x, y, width, height) {
    let x1 = x;
    let x2 = x + width;
    let y1 = y;
    let y2 = y + height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2]), gl.STATIC_DRAW);
}

function setHexagon(gl,x,y, width, height) {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x,y,
        x+width,y,
        x+width*1.5,y+height*0.5,
        x+width,y+height,
        x,y+height,
        x-width*0.5,y+height*0.5,
        x,y
    ]), gl.STATIC_DRAW);
}