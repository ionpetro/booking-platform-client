import * as THREE from 'three';
import * as BookUtils from './BookUtils';

export default {
  props: ['crater', 'craterDescription'],
  beforeMount() {
    const vertexShader = document.createElement('script');
    const fragmentShader = document.createElement('script');
    vertexShader.id = BookUtils.VERTEX_SHADER_SCRIPT_ID;
    vertexShader.type = BookUtils.SCRIPT_TYPE;
    fragmentShader.id = BookUtils.FRAGMENT_SHADER_SCRIPT_ID;
    fragmentShader.type = BookUtils.SCRIPT_TYPE;
    vertexShader.innerHTML = BookUtils.VERTEX_SCRIPT;
    fragmentShader.innerHTML = BookUtils.FRAGMENT_SCRIPT;
    document.head.appendChild(vertexShader);
    document.head.appendChild(fragmentShader);
  },
  mounted() {
    this.renderMarsScene();
  },
  destroyed() {
    document.head.removeChild(document.getElementById(BookUtils.VERTEX_SHADER_SCRIPT_ID));
    document.head.removeChild(document.getElementById(BookUtils.FRAGMENT_SHADER_SCRIPT_ID));
  },
  data() {
    return {
      display: false
    };
  },
  methods: {
    back() {
      this.$router.push('/units');
    },
    hide() {
      this.display = false;
    },
    show() {
      this.display = true;
    },
    renderMarsScene() {
      const canvas = document.querySelector('#planet-canvas');
      const renderer = new THREE.WebGLRenderer({canvas});
      const annotation = document.querySelector('.book-ref__planet__annotation');
      const camera = BookUtils.createPerspectiveCamera();
      const controls = BookUtils.createOrbitControls(camera, canvas);
      const scene = new THREE.Scene();
      scene.background = BookUtils.createSceneBackground();
      const ambientLight = BookUtils.createAmbientLight();
      scene.add(ambientLight);
      const directionalLight = BookUtils.createDirectionalLight();
      scene.add(directionalLight);
      const geometry = new THREE.SphereGeometry(150, 32, 32);
      const material = new THREE.MeshPhongMaterial();
      const marsMesh = BookUtils.createMarsMesh(geometry, material);
      scene.add(marsMesh);
      const atmosphereMaterial = BookUtils.createAtmosphereMaterial(camera);
      const moonGlow = BookUtils.createMoonglow(atmosphereMaterial.clone(), geometry.clone());
      scene.add(moonGlow);
      const pivot = BookUtils.createPivot(marsMesh);
      scene.add(pivot);
      const sprite = BookUtils.createCircleSprite(scene);
      scene.add(sprite);

      const render = () => {
        controls.update();

        if (!this.display) {
          pivot.rotation.y += 0.003;
        } else {
          pivot.rotation.y = 0;
        }

        const spriteBehindObject = BookUtils.updateAnnotationOpacity(camera, sprite, marsMesh);
        BookUtils.updateScreenPosition(renderer, camera, annotation, spriteBehindObject);

        camera.lookAt(scene.position);

        if (BookUtils.resizeRendererToDisplaySize(renderer)) {
          const rendererElement = renderer.domElement;
          camera.aspect = rendererElement.clientWidth / rendererElement.clientHeight;
          camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        BookUtils.update(moonGlow, camera);
      };

      requestAnimationFrame(render);
    }
  }
};
