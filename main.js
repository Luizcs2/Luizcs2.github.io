
	// import * as THREE from './build/three.module.js';
			import * as THREE from 'https://threejs.org/build/three.module.js'; 

			// import Stats from './jsm/libs/stats.module.js';
			// import { GUI } from './jsm/libs/dat.gui.module.js';
			// import { CinematicCamera } from './jsm/cameras/CinematicCamera.js';

			import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';
			import { GUI } from 'https://threejs.org/examples/jsm/libs/dat.gui.module.js';
			import { CinematicCamera } from 'https://threejs.org/examples/jsm/cameras/CinematicCamera.js';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus
const geometry = new THREE.TorusGeometry(0, 0, 0, 0);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



function addStar() {
  const geometry = new THREE.SphereGeometry(0.2, 4, 4);
  const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Celestial Bodies

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg'); // Corrected texture name

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 5;
moon.position.setX(0);

const uranusTexture = new THREE.TextureLoader().load('uranus.jpg');
const jupiterTexture = new THREE.TextureLoader().load('jupiter.jpg');
const marsTexture = new THREE.TextureLoader().load('mars.jpg');
const neptuneTexture = new THREE.TextureLoader().load('neptune.jpg');

// Uranus
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);

scene.add(uranus);

uranus.position.z = 30;
uranus.position.setX(-90);

// Jupiter
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);

scene.add(jupiter);

jupiter.position.z =55;
jupiter.position.setX(-25);

// Mars
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);

scene.add(mars);

mars.position.z = 75;
mars.position.setX(Math.PI/2);

// Neptune
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);

scene.add(neptune);

neptune.position.z = 20;
neptune.position.setX(-50);



// Earth
const earthTexture = new THREE.TextureLoader().load('earth.png'); // Corrected texture name
const earthAtmosphereTexture = new THREE.TextureLoader().load(''); // New texture

const earthAtmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(3.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthAtmosphereTexture,
    transparent: true,
    opacity: 0.5,
  })
);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);

scene.add(earthAtmosphere, earth);

earthAtmosphere.position.z = 40;
earthAtmosphere.position.setX(0);

earth.position.copy(earthAtmosphere.position);

// Saturn
const saturnTexture = new THREE.TextureLoader().load('saturn.jpg');
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);

scene.add(saturn);

saturn.position.z = -30;
saturn.position.setX(35);

// Saturn Ring
const saturnRingTexture = new THREE.TextureLoader().load('saturnring.png');
const saturnRing = new THREE.Mesh(
  new THREE.RingGeometry(2, 8, 32),
  new THREE.MeshBasicMaterial({
    map: saturnRingTexture,
    side: THREE.DoubleSide,
    transparent: true,
  })
);
saturnRing.rotation.x = 2;
saturn.add(saturnRing); // Make the ring a child of Saturn

// Rotate Saturn's ring
function animateSaturnRing() {
  saturnRing.rotation.x += 0.005; // Adjust the rotation speed as needed
}


// Sun
const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(40, 40, 40),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    emissive: 0xffff00,
    emissiveIntensity: 1,
  })
);

scene.add(sun);

sun.position.z =-120;
sun.position.setX(-30);

// Mercury
const mercuryTexture = new THREE.TextureLoader().load('mercury.jpg');
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
);

scene.add(mercury);

mercury.position.z = 0;
mercury.position.setX(-40);

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // Adjust the camera position based on the scroll position
  camera.position.z = 30 + t * -0.01;
  camera.position.x = -3 + t * -0.0002;
  camera.rotation.y = t * -0.0002;


  camera.updateProjectionMatrix();
}
document.body.onscroll = moveCamera;
moveCamera();


// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the celestial bodies
  moon.rotation.y += 0.005;
  earth.rotation.x += 0.005;
  uranus.rotation.y += 0.005;
  uranus.rotation.x += 0.005;
  jupiter.rotation.y += 0.005;
  mars.rotation.y += 0.005;
  mars.rotation.x += 0.005;
  neptune.rotation.x += 0.001;
  neptune.rotation.y += 0.005;
  saturnRing.rotation.z += 0.005;
  sun.rotation.x+=0.005;

  
  

  renderer.render(scene, camera);
}

animate();


