
window.onload = function init()
{
    const canvas = document.getElementById( "gl-canvas" );
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(canvas.width,canvas.height);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75,canvas.width / canvas.height,0.1, 1000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    hlight = new THREE.AmbientLight (0x000000,50);
    scene.add(hlight);
    light = new THREE.PointLight(0xc4c4c4,10);
    light.position.set(0,3000,5000);
    scene.add(light);

    light2 = new THREE.PointLight(0xc4c4c4,10);
    light2.position.set(5000,1000,0);
    scene.add(light2);

    light3 = new THREE.PointLight(0xc4c4c4,10);
    light3.position.set(0,1000,-5000);
    scene.add(light3);

    light4 = new THREE.PointLight(0xc4c4c4,10);
    light4.position.set(-5000,3000,5000);
    scene.add(light4);


    const loader = new THREE.GLTFLoader();
    loader.load('./model/scene.gltf', function(gltf){
        simpson = gltf.scene.children[0];
        simpson.scale.set(0.5,0.5,0.5);
        scene.add(gltf.scene);
        animate(1);
    }, undefined, function (error) {
        console.error(error);
    });

    function animate(time) {
        time *= 0.001;  // convert time to seconds
        scene.rotation.x = time;
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }

}


