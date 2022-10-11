let gl;
let bufferId;
let colorBufferId;
let vPosition;
let vColor;
let vResolution;
let direction = true;
let theta = 0.0;
let thetaLoc;
let delay = 100;
let interValid;

let firstLeafColor = new Float32Array([
    0.5,1.0,0.5,1,
    0.5,1.0,0.5,1,
    0.5,1.0,0.5,1
])

let secondLeafColor = new Float32Array([
    0.0, 1.0, 0.0, 1,
    0.0, 1.0, 0.0, 1,
    0.0, 1.0, 0.0, 1
])

let woodColor = new Float32Array([
    0.5882, 0.2941, 0, 1,
    0.5882, 0.2941, 0, 1,
    0.5882, 0.2941, 0, 1,
    0.5882, 0.2941, 0, 1,
    0.5882, 0.2941, 0, 1,
    0.5882, 0.2941, 0, 1
])

let firstRoofColor = new Float32Array([
    1.0, 1.0, 0.0, 1,
    1.0, 1.0, 0.0, 1,
    1.0, 1.0, 0.0, 1
])

let firstHouseColor = new Float32Array([
    0.3882, 0.2941, 0.3, 1,
    0.2, 0.8, 0.8, 1,
    0.3882, 0.2941, 0.3, 1,
    0.2, 0.8, 0.8, 1,
    0.3882, 0.2941, 0.3, 1,
    0.2, 0.8, 0.8, 1
])

let secondRoofColor = new Float32Array([
    0.3, 1.0, 0.7, 1,
    0.3, 1.0, 0.7, 1,
    0.3, 1.0, 0.7, 1
])

let secondHouseColor = new Float32Array([
    0.2, 0.8, 0.8, 1,
    0.3882, 0.2941, 0.3, 1,
    0.2, 0.8, 0.8, 1,
    0.3882, 0.2941, 0.3, 1,
    0.2, 0.8, 0.8, 1,
    0.3882, 0.2941, 0.3, 1
])

let hexagonColor = new Float32Array([
    0.3, 1.0, 0.7, 1,
    0.3882, 0.2941, 0.3, 1,
    0.2, 0.8, 0.8, 1,
    1.0, 1.0, 0.0, 1,
    0.5882, 0.2941, 0, 1,
    0.0, 1.0, 0.0, 1,
])
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

    vPosition = gl.getAttribLocation( program, "vPosition" );
    vColor = gl.getAttribLocation(program, "vColor");

    bufferId = gl.createBuffer();


    vResolution = gl.getUniformLocation(program, "vResolution");
    thetaLoc = gl.getUniformLocation(program, "theta");

    colorBufferId = gl.createBuffer();


    gl.uniform2fv(vResolution, [gl.canvas.width, gl.canvas.height]);

    document.getElementById("Direction").onclick = function(){
        direction = !direction;
    };


    // gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
    interValid = setInterval(render, delay);
};



function setTriangles(x, y, width, height) {
    let x1 = x;
    let x2 = x + width;
    let y1 = y;
    let y2 = y - height;
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        (x1+x2)/2, y2]), gl.STATIC_DRAW);
    gl.vertexAttribPointer( vPosition,2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition );
}

function setColor(colors) {
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
}

function setHexColor(colors) {
    let hexColor = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, hexColor);

    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
}

function setRectangle(x, y, width, height) {
    let x1 = x;
    let x2 = x + width;
    let y1 = y;
    let y2 = y + height;
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2]), gl.STATIC_DRAW);
    gl.vertexAttribPointer( vPosition,2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition );
}


function setHexagon(x,y, width, height) {
    let hexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, hexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x,y,
        x+width,y,
        x+1.5*width,y+0.5*height,
        x+width,y+height,
        x,y+height,
        x-0.5*width,y+0.5*height
    ]), gl.STATIC_DRAW);
    gl.vertexAttribPointer( vPosition,2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition );
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(thetaLoc, 0.0);
    // draw 3 trees

    setTriangles( 60, 250, 80, 30);
    setColor( firstLeafColor);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    setTriangles( 50, 300, 100, 50);
    setColor( secondLeafColor);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    setRectangle( 75, 300, 50, 100);
    setColor( woodColor);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    setTriangles(110, 300, 80, 30);
    setColor( firstLeafColor);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    setTriangles( 100, 350, 100, 50);
    setColor( secondLeafColor);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    setRectangle( 125, 350, 50, 100);
    setColor( woodColor);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    setTriangles( 35, 350, 80, 30);
    setColor( firstLeafColor);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    setTriangles( 25, 400, 100, 50);
    setColor( secondLeafColor);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    setRectangle( 50, 400, 50, 100);
    setColor( woodColor);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // draw house
    setTriangles( 300, 200, 200, 100);
    setColor( firstRoofColor);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    setRectangle( 350, 200, 100, 100);
    setColor( firstHouseColor);
    gl.drawArrays(gl.TRIANGLES, 0, 6);


    setTriangles( 150, 100, 150, 100);
    setColor( secondRoofColor);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    setRectangle( 190, 100, 75, 100);
    setColor( secondHouseColor);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    setHexagon(250, 350, 100, 100);
    setHexColor(hexagonColor);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    theta += (direction ? 0.1 : -0.1);
    gl.uniform1f(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
}