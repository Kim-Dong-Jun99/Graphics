<html>
<script id="vertex-shader" type="x-shader/x-vertex">
    attribute vec4 vPosition;
    attribute vec4 vNormal;

    varying vec3 N, L, E;
    varying float s, t;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec4 lightPosition;

    void
    main(){
    vec3 pos = (modelViewMatrix * vPosition).xyz;

    if (lightPosition.w == 0.0){
        L = normalize((modelViewMatrix*lightPosition).xyz);
    }else {
        L = normalize((modelViewMatrix*lightPosition).xyz);
    }
    }
</script>
</html>;