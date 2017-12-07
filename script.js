    // Set the scene size.
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    // Get the DOM element to attach to
    const container = document.querySelector('#container');

    // Options for GUI and settings
    var options = {
      velx: 0.4,
      vely: 0.5,
      camera: {
        speed: 0.0001
      },
      stop: function() {
      },
      reset: function() {
      }
    };

    // Set Renderer Style
    const renderer = new THREE.WebGLRenderer();

    // Camera Settings
    const VIEW_ANGLE = 45;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;

    //Set Camera
    const camera = new THREE.PerspectiveCamera(
          VIEW_ANGLE,
          ASPECT,
          NEAR,
          FAR
      );
    const scene = new THREE.Scene();

    // Add the camera to the scene.
    scene.add(camera);

    // Start the renderer.
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);

    // New PointLight
    const pointLight = new THREE.PointLight(0xFFFFFF);
    // Positionint
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    scene.add(pointLight);

    // Material
    const sphereMaterial =
      new THREE.MeshLambertMaterial(
        {
          color: "#EFE9AE"
        });
    // Shape
    const RADIUS = 20;
    const SEGMENTS = 105;
    const RINGS = 100;
    // Mesh
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),
      sphereMaterial
    );

    sphere.position.z = 0;
    sphere.position.y = 10;
    sphere.rotation.x += options.velx;
    sphere.rotation.y += options.vely;

    scene.add(sphere);


  // Render
  var render = function() {
    requestAnimationFrame(render);
    var timer = Date.now() * options.camera.speed;
    camera.position.x = Math.cos(timer) * 100;
    camera.position.z = Math.sin(timer) * 100;
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
    sphere.rotation.x += options.velx;
    sphere.rotation.y += options.vely;

    renderer.render(scene, camera);
  };

  render();

  // DAT.GUI Related Stuff
  var gui = new dat.GUI();
  gui.add(camera.position, 'y', 0, 100).listen();
  gui.add(camera.position, 'x', 0, 100).listen();
  gui.addColor(sphereMaterial, 'color').listen();
  gui.add(pointLight.position, 'x', 0, 100).listen();
  gui.add(pointLight.position, 'y', 0, 100).listen();
  gui.add(pointLight.position, 'z', 0, 100).listen();
  gui.add(sphere.rotation, 'x', 0, 100).listen();
  gui.add(sphere.rotation, 'y', 0, 100).listen()
