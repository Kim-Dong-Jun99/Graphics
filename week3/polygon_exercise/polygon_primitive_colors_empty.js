let gl;
let points;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // hexagon vertices
    let hexagonVertices = [
        vec2(-0.3,  0.6), //v0
        vec2(-0.4,  0.8), //v1
        vec2(-0.6,  0.8), //v2
        vec2(-0.7,  0.6), //v3
        vec2(-0.6,  0.4), //v4
        vec2(-0.4,  0.4), //v5
        vec2(-0.3,  0.6), //v6
    ];


    // triangle vertices
    let triangleVertices = [
        vec2(0.3,  0.4), //v0
        vec2(0.7,  0.4), //v1
        vec2(0.5,  0.8), //v2
    ];


    let colors = [
        vec4(1.0, 0.0, 0.0, 1.0), //v0
        vec4(0.0, 1.0, 0.0, 1.0), //v1
        vec4(0.0, 0.0, 1.0, 1.0)  //v2
    ];



    // strip vertices
    let stripVertices = [
        vec2(-0.5,  0.2), //v0
        vec2(-0.4,  0.0), //v1
        vec2(-0.3,  0.2), //v2
        vec2(-0.2,  0.0), //v3
        vec2(-0.1,  0.2), //v4
        vec2(0.0,  0.0), //v5
        vec2(0.1,  0.2), //v6
        vec2(0.2,  0.0), //v7
        vec2(0.3,  0.2), //v8
        vec2(0.4,  0.0), //v9
        vec2(0.5,  0.2), //v10
        // start second strip
        vec2(-0.5, -0.3), //v11
        vec2(-0.4, -0.5), //v12
        vec2(-0.3, -0.3), //v13
        vec2(-0.2, -0.5), //v14
        vec2(-0.1, -0.3), //v15
        vec2(0.0, -0.5), //v16
        vec2(0.1, -0.3), //v17
        vec2(0.2, -0.5), //v18
        vec2(0.3, -0.3), //v19
        vec2(0.4, -0.5), //v20
        vec2(0.5, -0.3)  //v21
    ];


    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    let vPosition = gl.getAttribLocation( program, "vPosition" );
    let vColor = gl.getAttribLocation(program, "vColor");

    // hexagon vertex buffer
    let hexagonbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, hexagonbufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(hexagonVertices), gl.STATIC_DRAW );

    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays( gl.LINE_STRIP, 0, 7 );

    // triangle vertex buffer
    let trianglebufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, trianglebufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(triangleVertices), gl.STATIC_DRAW );

    // triangle vertex color
    let triangleColorbufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, triangleColorbufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    gl.bindBuffer( gl.ARRAY_BUFFER, trianglebufferId );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer( gl.ARRAY_BUFFER, triangleColorbufferId );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray( vPosition );
    gl.enableVertexAttribArray( vColor );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    
    // strip
    let stripBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stripBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(stripVertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, stripBufferId);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    gl.disableVertexAttribArray(vColor);

    gl.vertexAttrib4f(vColor, 1.0, 1.0, 0.0, 1.0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 11);

    gl.vertexAttrib4f(vColor, 0.0, 0.0, 0.0, 1.0);
    dl.drawArrays(gl.LINE_STRIP, 0, 11);
    gl.drawArrays(gl.LINE_STRIP, 11, 11);

    


};
