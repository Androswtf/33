import * as THREE from 'three';
import { Loader } from 'three';

window.onload = () => {

let w = innerWidth,
    h = innerHeight;

const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 2000);
camera.position.set(0,0,0);
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});;

renderer.setSize(w,h);

let canvas = renderer.domElement;
document.body.appendChild(canvas);

let light = new THREE.PointLight(0xffffff,1)
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.position.set(0,5,-3);

scene.add(light);

light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(0,0,-1);
scene.add(light);

let geom = new THREE.BoxGeometry(1,1,1,1);
let material = new THREE.MeshPhongMaterial({
    specular: 0xffffff,
});
let cube = new THREE.Mesh(geom, material);

cube.position.set(0,0,-3);

scene.add(cube);

let text = new THREE.TextureLoader();

text.load('/normal.jpg', function(text) {
    cube.material = new THREE.MeshPhongMaterial({
        ...cube.material,
        normalMap: text,
        normalScale: new THREE.Vector2(2,2)
    })
});

text.load('/base.jpg', function(text) {
    cube.material = new THREE.MeshPhongMaterial({
        ...cube.material,
        map: text,
    });
});

text.load('/ao.jpg', function(text) {
    cube.material = new THREE.MeshPhongMaterial({
        ...cube.material,
        aoMap: text
    });
});


renderer.setClearColor(0xffffff);
camera.position.set(0,0,-1);

let mouseIsDown = false;
let mobileLastPosition = {
    x: null,
    y: null
}

canvas.addEventListener('mousedown', (e) => {
    mouseIsDown = true;
});

canvas.addEventListener('mouseup', (e) => {
    mouseIsDown = false;
});

canvas.addEventListener('mousemove', (e) => {

    if(mouseIsDown) {
        let deltaX = e.movementX * 0.01;
        let deltaY = e.movementY * 0.01;

        cube.rotateY(deltaX);
        cube.rotateX(deltaY);
    }
});

function loop() {
    if(!mouseIsDown) cube.rotateY(0.01);

    renderer.clear();
    renderer.render(scene, camera);

    requestAnimationFrame(loop);
}

loop();

}


