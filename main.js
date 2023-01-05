import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, pointLight;
// geometry
let sphere, star;
function init(){
  
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerHeight / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize( window.innerWidth, window.innerHeight);
  camera.position.setZ(15);
  
  // create sphere geometry
  sphere = new THREE.Mesh( new 
    THREE.SphereGeometry(4, 32, 16), 
    new THREE.MeshBasicMaterial( {
      color: 0xff6347,
      //wireframe: true,
      transparent: true,
      opacity: .2
      }
    )
  );
  scene.add( sphere );

  pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5,5,5);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  controls = new OrbitControls(camera, renderer.domElement);
  // to disable zoom
  controls.enableZoom = false;

  // to disable rotation
  // controls.enableRotate = false;

  // to disable pan
  controls.enablePan = false;
  Array(250).fill().forEach(add_star);
  renderer.render(scene, camera);
   
}

function add_nodes() {
  
}
function add_star() {
  // create star geometry
  star = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 24, 24),
    new THREE.MeshStandardMaterial( {
     color: 0xffffff
    })
  );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += .01;
  sphere.rotation.x += .01;
  controls.update();
  renderer.render(scene, camera);
}

const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
if (gl) {
  console.log("Yay! WebGL is supported!");
  init();
  animate();
} else {
  // WebGL is not supported
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}