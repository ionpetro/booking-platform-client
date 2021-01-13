import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const ATMOSPHERE_COLOR = 0xea5b27;
const LIGHTING_COLOR = 0xffffff;
const SCENE_BACKGROUND_COLOR = '#0F1A3A';
const AMBIENT_LIGHTING_INTENSITY = 1.2;
const DIRECTIONAL_LIGHTING_INTENSITY = 0.5;
const VERTEX_SHADER_SCRIPT_ID = 'vertexShader';
const FRAGMENT_SHADER_SCRIPT_ID = 'fragmentShader';
const SCRIPT_TYPE = 'x-shader/x-vertex';
const VERTEX_SCRIPT = `
      uniform vec3 viewVector;
      uniform float c;
      uniform float p;
      varying float intensity;
      void main()
      {
        vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormel = normalize( normalMatrix * viewVector );
          intensity = pow( c - dot(vNormal, vNormel), p );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `;
const FRAGMENT_SCRIPT = `
      uniform vec3 glowColor;
      varying float intensity;
      void main()
      {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4( glow, 1.0 );
      }
    `;

const updateAnnotationOpacity = (camera, sprite, marsMesh, spriteBehindObject) => {
  const meshDistance = camera.position.distanceTo(marsMesh.position);
  const spriteDistance = camera.position.distanceTo(sprite.position);

  spriteBehindObject = spriteDistance > meshDistance;
  sprite.material.opacity = spriteBehindObject ? 0.25 : 1;

  return spriteBehindObject;
};

const updateScreenPosition = (renderer, camera, annotation, spriteBehindObject) => {
  const vector = new THREE.Vector3(150, 32, 32);
  const canvas = renderer.domElement;

  vector.project(camera);

  vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
  vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));

  annotation.style.top = `${vector.y}px`;
  annotation.style.left = `${vector.x}px`;
  annotation.style.opacity = spriteBehindObject ? 0.25 : 1;
};

const resizeRendererToDisplaySize = renderer => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;

  needResize && renderer.setSize(width, height, false);

  return needResize;
};

const update = (moonGlow, camera) => {
  moonGlow.material.uniforms.viewVector.value = new THREE.Vector3().subVectors(
    camera.position,
    moonGlow.position
  );
};

const createSceneBackground = () => new THREE.Color(SCENE_BACKGROUND_COLOR);

const createCircleSprite = () => {
  const sprite = new THREE.Sprite();
  sprite.position.set(150, 32, 32);
  sprite.scale.set(0.1, 0.1, 0.1);

  return sprite;
};

const createPivot = marsMesh => {
  const pivot = new THREE.Group();
  pivot.add(marsMesh);

  return pivot;
};

const createAtmosphereMaterial = camera =>
  new THREE.ShaderMaterial({
    uniforms: {
      c: {type: 'f', value: 0.42},
      p: {type: 'f', value: 8},
      glowColor: {type: 'c', value: new THREE.Color(ATMOSPHERE_COLOR)},
      viewVector: {type: 'v3', value: camera.position}
    },
    vertexShader: document.getElementById(VERTEX_SHADER_SCRIPT_ID).textContent,
    fragmentShader: document.getElementById(FRAGMENT_SHADER_SCRIPT_ID).textContent,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  });

const createMoonglow = (atmosphere, geometry) => {
  const moonGlow = new THREE.Mesh(geometry, atmosphere);

  moonGlow.position.set(0, 0, 0);
  moonGlow.scale.multiplyScalar(1.3);

  return moonGlow;
};

const createMarsMesh = (geometry, material) => {
  const marsMesh = new THREE.Mesh(geometry, material);
  marsMesh.position.set(0, 0, 0);

  material.map = new THREE.TextureLoader().load('./../models3D/marsmap1k.jpeg');
  material.bumpMap = new THREE.TextureLoader().load('./../models3D/marsbump1k.jpeg');
  material.bumpScale = 0.5;

  return marsMesh;
};

const createDirectionalLight = () => {
  const light = new THREE.DirectionalLight(LIGHTING_COLOR, DIRECTIONAL_LIGHTING_INTENSITY);
  light.position.set(-5, 3, 5);

  return light;
};

const createAmbientLight = () => new THREE.AmbientLight(LIGHTING_COLOR, AMBIENT_LIGHTING_INTENSITY);

const createOrbitControls = (camera, canvas) => {
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.minDistance = 350;
  controls.maxDistance = 500;
  controls.update();

  return controls;
};

const createPerspectiveCamera = () => {
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
  camera.position.x = 750;
  camera.position.y = 500;
  camera.position.z = 1250;

  return camera;
};

export {
  createAmbientLight,
  createAtmosphereMaterial,
  createCircleSprite,
  createDirectionalLight,
  createMarsMesh,
  createMoonglow,
  createOrbitControls,
  createPerspectiveCamera,
  createPivot,
  createSceneBackground,
  FRAGMENT_SCRIPT,
  FRAGMENT_SHADER_SCRIPT_ID,
  resizeRendererToDisplaySize,
  SCRIPT_TYPE,
  update,
  updateAnnotationOpacity,
  updateScreenPosition,
  VERTEX_SCRIPT,
  VERTEX_SHADER_SCRIPT_ID
};
