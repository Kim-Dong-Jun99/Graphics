
let gl;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    let triangles = [
        vec2(-0.3, 0.6),
        vec2(0.0, 0.9),
        vec2(0.3,0.6),
        vec2(-0.3, 0.3),
        vec2(0.0, 0.6),
        vec2(0.3,0.3),
        vec2(-0.3,0.0),
        vec2(0.0, 0.3),
        vec2(0.3, 0.0)
    ]

    let rectangle = [
        vec2(-0.2,-0.5),
        vec2(-0.2, 0.0),
        vec2(0.2, 0.0),
        vec2(-0.2,-0.5),
        vec2(0.2,0.0),
        vec2(0.2,-0.5)
    ]

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let vPosition = gl.getAttribLocation( program, "vPosition" );
    let color = gl.getUniformLocation(program, "color");

    let triangleId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, triangleId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(triangles), gl.STATIC_DRAW);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    gl.uniform4fv(color,[0,1,0,1]);
    gl.drawArrays(gl.TRIANGLES, 0, 9);

    let rectangleId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(rectangle), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.uniform4fv(color, [0.5882, 0.2941, 0, 1]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
};