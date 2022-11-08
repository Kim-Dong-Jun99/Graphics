"use strict";

let canvas, gl, program;

let NumVertices = 36;

let points = [];
let colors = [];

let vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0)
];


let vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(0.0, 1.0, 0.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0),
    vec4(0.0, 1.0, 1.0, 1.0)
];


let BASE_HEIGHT = 2.0;
let BASE_WIDTH = 5.0;
let LOWER_ARM_HEIGHT = 3.0;
let LOWER_ARM_WIDTH = 0.5;
let UPPER_ARM_HEIGHT = 3.0;
let UPPER_ARM_WIDTH = 0.5;
let LAST_ARM_HEIGHT = 3.0;
let LAST_ARM_WIDTH = 0.5;


let modelViewMatrix, projectionMatrix;


let Base = 0;
let LowerArm = 1;
let UpperArm = 2;
let LastArm = 3;


let theta = [0, 0, 0, 0];

let angle = 0;

let modelViewMatrixLoc;

let vBuffer, cBuffer;


function quad(a, b, c, d) {
    colors.push(vertexColors[a]);
    points.push(vertices[a]);
    colors.push(vertexColors[a]);
    points.push(vertices[b]);
    colors.push(vertexColors[a]);
    points.push(vertices[c]);
    colors.push(vertexColors[a]);
    points.push(vertices[a]);
    colors.push(vertexColors[a]);
    points.push(vertices[c]);
    colors.push(vertexColors[a]);
    points.push(vertices[d]);
}


function colorCube() {
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
}


function scale4(a, b, c) {
    let result = mat4();
    result[0][0] = a;
    result[1][1] = b;
    result[2][2] = c;
    return result;
}


window.onload = function init() {

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);


    program = initShaders(gl, "vertex-shader", "fragment-shader");

    gl.useProgram(program);

    colorCube();


    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    let vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    document.getElementById("slider1").onchange = function (event) {
        theta[0] = event.target.value;
    };
    document.getElementById("slider2").onchange = function (event) {
        theta[1] = event.target.value;
    };
    document.getElementById("slider3").onchange = function (event) {
        theta[2] = event.target.value;
    };
    document.getElementById("slider4").onchange = function (event) {
        theta[3] = event.target.value;
    };

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

    projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "projectionMatrix"), false, flatten(projectionMatrix));

    render();
}


function base() {
    let s = scale4(BASE_WIDTH, BASE_HEIGHT, BASE_WIDTH);
    let instanceMatrix = mult(translate(0.0, 0.5 * BASE_WIDTH, 0.0), s);
    let t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}


function lowerArm() {
    let s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
    let instanceMatrix = mult(translate(0.0, 0.5 * LOWER_ARM_HEIGHT, 0.0), s);
    let t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}


function upperArm() {
    let s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
    let instanceMatrix = mult(translate(0.0, 0.5 * UPPER_ARM_HEIGHT, 0.0), s);
    let t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}


function lastArm() {
    let s = scale4(LAST_ARM_WIDTH, LAST_ARM_HEIGHT, LAST_ARM_WIDTH);
    let instanceMatrix = mult(translate(0.0, 0.5 * LAST_ARM_HEIGHT, 0.0), s);
    let t = mult(modelViewMatrix, instanceMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
    gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}


let render = function () {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    modelViewMatrix = rotate(theta[Base], 0, 1, 0);
    base();

    modelViewMatrix = mult(modelViewMatrix, translate(0.0, BASE_HEIGHT, 0.0));
    modelViewMatrix = mult(modelViewMatrix, rotate(theta[LowerArm], 0, 0, 1));
    lowerArm();

    modelViewMatrix = mult(modelViewMatrix, translate(0.0, LOWER_ARM_HEIGHT, 0.0));
    modelViewMatrix = mult(modelViewMatrix, rotate(theta[UpperArm], 0, 0, 1));
    upperArm();

    modelViewMatrix = mult(modelViewMatrix, translate(0.0, UPPER_ARM_HEIGHT, 0.0));
    modelViewMatrix = mult(modelViewMatrix, rotate(theta[LastArm], 0, 0, 1));
    lastArm();

    requestAnimFrame(render);
}
