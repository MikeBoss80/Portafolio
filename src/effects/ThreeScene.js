export class ThreeScene {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.object = null;
    this.particles = null;
    this.mouse = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.animId = null;
    this.THREE = null;

    if (window.innerWidth < 768) return;

    const container = document.getElementById("threeContainer");
    if (!container) return;
    this.container = container;
    import("three")
      .then((THREE) => {
        this.THREE = THREE;
        this.init();
      })
      .catch(() => {
        console.warn("⚠️ Three.js no pudo cargarse");
      });
  }

  init() {
    const THREE = this.THREE;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x004687, 0.002);

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.prepend(this.renderer.domElement);

    this.createObject();
    this.createParticles();
    this.createLights();
    this.createFloor();
    this.setupMouseEvents();
    this.animate();

    window.addEventListener("resize", () => this.onResize());
  }

  createObject() {
    const THREE = this.THREE;
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 16);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x004687,
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1.0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
      emissive: 0x004687,
      emissiveIntensity: 0.1,
      wireframe: false,
    });

    this.object = new THREE.Mesh(geometry, material);
    this.scene.add(this.object);

    const wireframeGeo = new THREE.TorusKnotGeometry(1.25, 0.45, 64, 8);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x0066cc,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
    this.object.add(wireframe);

    const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 32, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0066cc,
      transparent: true,
      opacity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    this.object.add(ring);

    const ring2Geo = new THREE.TorusGeometry(1.6, 0.02, 32, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xcc2233,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 2;
    this.object.add(ring2);
  }

  createParticles() {
    const THREE = this.THREE;
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      const radius = 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      colors[i] = 0 + Math.random() * 0.2;
      colors[i + 1] = 0.3 + Math.random() * 0.4;
      colors[i + 2] = 0.6 + Math.random() * 0.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createLights() {
    const THREE = this.THREE;
    this.scene.add(new THREE.AmbientLight(0x404060));
    const main = new THREE.DirectionalLight(0x0066cc, 1);
    main.position.set(2, 3, 4);
    this.scene.add(main);
    const fill = new THREE.DirectionalLight(0xcc2233, 0.5);
    fill.position.set(-2, -1, 3);
    this.scene.add(fill);
    const back = new THREE.DirectionalLight(0x004687, 0.5);
    back.position.set(0, 0, -5);
    this.scene.add(back);
  }

  createFloor() {
    const THREE = this.THREE;
    const grid = new THREE.GridHelper(10, 20, 0x0066cc, 0x004687);
    grid.position.y = -2.5;
    grid.material.transparent = true;
    grid.material.opacity = 0.1;
    this.scene.add(grid);
  }

  setupMouseEvents() {
    this.container.addEventListener("mousemove", (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      this.targetRotation.x = (y - 0.5) * 0.5;
      this.targetRotation.y = (x - 0.5) * 0.5;
    });

    this.container.addEventListener("mouseleave", () => {
      this.targetRotation.x = 0;
      this.targetRotation.y = 0;
    });
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (this.object) {
      this.object.rotation.x +=
        (this.targetRotation.x - this.object.rotation.x) * 0.05;
      this.object.rotation.y +=
        (this.targetRotation.y - this.object.rotation.y) * 0.05;
      this.object.rotation.z += 0.005;
      this.object.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }

    if (this.particles) {
      this.particles.rotation.x += 0.0002;
      this.particles.rotation.y += 0.0005;
    }

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement?.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
