var canvReference = document.getElementById("cubes");

var renderer = new THREE.WebGLRenderer({
    antialias:true,
    canvas: canvReference
}); 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 10, 5000);
camera.position.set(0, 0, 15);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
{
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-2, 2, 4);
    scene.add(light);
}

const boxWidth = 3;
const boxHeight = 3;
const boxDepth = 3;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

const cubes = [
    makeInstance(geometry, 0xaa8844, 0),
    makeInstance(geometry, 0xaa8844, 0),
    makeInstance(geometry, 0xaa8844, 0),
    makeInstance(geometry, 0xaa8844, 0),
    makeInstance(geometry, 0xaa8844, 0),
    makeInstance(geometry, 0xaa8844, 0),
    makeInstance(geometry, 0xaa8844, 0),
    makeInstance(geometry, 0xaa8844, 0),
    makeInstance(geometry, 0xaa8844, 0),
    makeInstance(geometry, 0x0f0f0f, 0),
];

function render(time) {
    time *= 0.0005;  // convert time to seconds

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
});

requestAnimationFrame(render);
