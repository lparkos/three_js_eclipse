// Listen to window size
window.addEventListener( 'resize', onWindowResize, false );
// Resize the window

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// Get the DOM element to attach to
const container = document.querySelector('#container');

// Set window properties
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Renderer Settings
const renderer = new THREE.WebGLRenderer();

// Settings for DatGui
let settings = {
    posX: 200,
    posY: 200,
    posZ: 200,
    spreadX: 400,
    spreadY: 300,
    spreadZ: 400,
    rotation: .095,
    speed: .0001,
    color: "#960200",
    density: 1,
    decay: 2,
    distance: 0.9,
};

// Camera Settings
const VIEW_ANGLE = 35;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 50;
const FAR = 20000;

// Camera Setup
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
const scene = new THREE.Scene();
scene.add(camera);

// // Flying controls
// // Set controls
// controls = new THREE.FlyControls( camera );
// controls.movementSpeed = 1000;
// controls.domElement = container;
// controls.rollSpeed = Math.PI / 24;
// controls.autoForward = false;
// controls.dragToLook = false;

// Sphere
const RADIUS = 20;
const SEGMENTS = 20;
const RINGS = 40;
const spheres = [];

// Creating a group of spheres
for ( var i = 0; i < 40 ; i++ ) {

  let spreadX = THREE.Math.randFloatSpread(settings.spreadX);
  let spreadY = THREE.Math.randFloatSpread(settings.spreadY);
  let spreadZ = THREE.Math.randFloatSpread(settings.spreadZ);

  // Sphere material settings
  let sphereMaterial = new THREE.MeshLambertMaterial({ color: "#CDEAC0" });
  // Wireframe properties
  sphereMaterial.wireframe = true;
  sphereMaterial.wireframeLinecap = "butt";
  sphereMaterial.wireframeLinewidth = 50;

  let sphere = new THREE.Mesh(new THREE.SphereGeometry(RADIUS,SEGMENTS,RINGS),sphereMaterial);
  spheres.push( sphere );
  scene.add( sphere );

  // Position each sphere
  sphere.position.x = spreadX;
  sphere.position.y = spreadY;
  sphere.position.z = spreadZ;

}

// Pointlight Settings
const COLOR = "#EFE9AE";
const INTENSITY = settings.intensity;
const DISTANCE = settings.distance;
const DECAY = settings.decay;

// Setting up Pointlight
const pointLight = new THREE.PointLight(COLOR, INTENSITY, DISTANCE, DECAY);
pointLight.position.set( 100, 10, 10 );
pointLight.castShadow = true;
scene.add(pointLight);

// Renderer settings
let bgcolor = settings.color;
renderer.setSize(WIDTH, HEIGHT);
container.appendChild(renderer.domElement);
renderer.setClearColor(bgcolor, 1);

// Render
var render = function() {
  requestAnimationFrame(render);
  var timer = Date.now() * settings.speed;

  for ( var i = 0 ; i < 10 ; i++ ){
    var sphere = spheres[i];
    sphere.position.x += settings.spreadX;
    sphere.position.y += settings.spreadY;
    sphere.position.z += settings.spreadZ;
  }

  camera.position.x = Math.cos(timer) * settings.posX;
  camera.position.y = Math.sin(timer) * settings.posY;
  camera.position.z = Math.sin(timer) * settings.posZ;
  renderer.setClearColor(settings.color, 1);
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();
  renderer.render(scene, camera);

// controls.movementSpeed = 0.33;
// controls.update();
};
render();

// DAT.GUI Related Stuff
var gui = new dat.GUI();
gui.add(settings, 'posZ', -1000, 1000).name("Camera Z");
gui.add(settings, 'posX', -1000, 1000).name("Camera X");
gui.add(settings, 'posY', -1000, 1000).name("Camera Y");
gui.add(settings, 'rotation', -1000, 1000).name("Rotate");
gui.addColor(settings, 'color').name("Color");
gui.add(pointLight.position, 'x', 0, 1000).name("PointLight");
