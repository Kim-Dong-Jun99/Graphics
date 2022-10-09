
var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas"); // html에 오브젝트를 찾아서 연결

    gl = WebGLUtils.setupWebGL(canvas); // html에 있는 오브젝트에 랜더링 결과를 연결해 줄 것이다라는 코드
    if (!gl) {
        alert("WebGL isn't available");
    } // webgl을 사용할 수 없으면 에러 출력


    // var vertices = new Float32Array([vec2(-1, -1), vec2(0, 1), vec2(1, -1)]);
    // var vertices = [ vec2(-1,-1), vec2(0,1), vec2(1,-1)];
    // Configure WebGL
    // var vertices = new Float32Array([-1, -1, 0, 1, 1, -1]);
    // 점 3개가 매핑된다, -1,-1 0,1 1,-1, 버텍스의 위치 정보를 배열로 담아놓은 것이다.
    // 이걸 gpu로 보내줘야한다.그전에 세팅을 좀 해줘야한다.

    // vertex position
    var vertices = [
        vec2(-1.0, -1.0),
        vec2(-0.6, -1.0),
        vec2(-0.8, -0.6)
    ];
    var colors = [
        vec4(1.0, 0.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0)
    ]

    var secondVertices=[
        vec2(1.0, 1.0),
        vec2(0.8, 0.8),
        vec2(0.6, 1.0)
    ];

    var secondColors = [
        vec4(1.0, 0.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    ]


    gl.viewport(0, 0, canvas.width, canvas.height); // 그리기 위해서 캔버스를 연결해주었는데 캔버스에 결과를 다 그려도되는데, 일정 부분만 쓰고 싶을 수도, 대상하는 html 오브젝트에서 얼만큼 그리는데 사용할지 지정할 수 있다.
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // 배경색 지정해줌
    gl.clear(gl.COLOR_BUFFER_BIT);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader"); // html 안에 버택스 쉐이더랑 프라그멘트 쉐이더의 아이디이다.

    gl.useProgram(program);

    // Load the data into the GPU


    var bufferId = gl.createBuffer(); // malloc처럼 버퍼를 gpu에 만들어준다.
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); // 버퍼를 바인딩해주고,
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW); // 버퍼를 카피 해준다.

    var vPosition = gl.getAttribLocation(program, "vPosition"); // 버퍼랑 포지션이랑 매핑, 이 작업이 있어야 버퍼에서 데이터를 가져올 수 있다.
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition); // vposition이랑 연결까지 해주어야한다.


    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    render();

    // var secondBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(secondVertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // var secondColor = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(secondColors), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    render();

};


function render() {
    // 버텍스 데이터를 버퍼에 넣었는데, 그 데이터를 어떻게 그리냐를 랜더에서 한다.
    gl.drawArrays( gl.TRIANGLES, 0,  3); // 0번째부터 3번째까지 꼭짓점으로 삼각형을 그려라, 점 6개를 넘겨주고, 0,6으로 하면 삼각형 2개가 그려진다.
}
