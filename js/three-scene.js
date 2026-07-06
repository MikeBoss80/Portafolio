// ==============================================
// THREE.JS 3D SCENE FOR HERO
// ==============================================
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.object = null;
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        const container = document.querySelector('.hero-background');
        if (!container) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x004687, 0.002);

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.z = 5;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.prepend(this.renderer.domElement);

        // Create scene objects
        this.createObject();
        this.createParticles();
        this.createLights();
        this.createFloor();

        // Mouse events
        this.setupMouseEvents();

        // Start animation
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());
    }

    createObject() {
        // Main 3D object - Torus Knot
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
            wireframe: false
        });

        this.object = new THREE.Mesh(geometry, material);
        this.scene.add(this.object);

        // Wireframe overlay
        const wireframeGeo = new THREE.TorusKnotGeometry(1.25, 0.45, 64, 8);
        const wireframeMat = new THREE.MeshBasicMaterial({
            color: 0x0066CC,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
        this.object.add(wireframe);

        // Glow ring
        const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 32, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x0066CC,
            transparent: true,
            opacity: 0.3
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        this.object.add(ring);

        // Second ring
        const ring2Geo = new THREE.TorusGeometry(1.6, 0.02, 32, 64);
        const ring2Mat = new THREE.MeshBasicMaterial({
            color: 0xCC2233,
            transparent: true,
            opacity: 0.2
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.y = Math.PI / 2;
        this.object.add(ring2);
    }

    createParticles() {
        const count = 1000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            const radius = 8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);

            // Color gradient
            colors[i] = 0 + Math.random() * 0.2;
            colors[i + 1] = 0.3 + Math.random() * 0.4;
            colors[i + 2] = 0.6 + Math.random() * 0.4;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);

        // Main light
        const mainLight = new THREE.DirectionalLight(0x0066CC, 1);
        mainLight.position.set(2, 3, 4);
        this.scene.add(mainLight);

        // Fill light
        const fillLight = new THREE.DirectionalLight(0xCC2233, 0.5);
        fillLight.position.set(-2, -1, 3);
        this.scene.add(fillLight);

        // Back light
        const backLight = new THREE.DirectionalLight(0x004687, 0.5);
        backLight.position.set(0, 0, -5);
        this.scene.add(backLight);
    }

    createFloor() {
        // Subtle grid floor
        const gridHelper = new THREE.GridHelper(10, 20, 0x0066CC, 0x004687);
        gridHelper.position.y = -2.5;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.1;
        this.scene.add(gridHelper);
    }

    setupMouseEvents() {
        const container = this.renderer.domElement.parentElement;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            this.targetRotation.x = (y - 0.5) * 0.5;
            this.targetRotation.y = (x - 0.5) * 0.5;
        });

        container.addEventListener('mouseleave', () => {
            this.targetRotation.x = 0;
            this.targetRotation.y = 0;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Smooth rotation
        if (this.object) {
            this.object.rotation.x += (this.targetRotation.x - this.object.rotation.x) * 0.05;
            this.object.rotation.y += (this.targetRotation.y - this.object.rotation.y) * 0.05;
            this.object.rotation.z += 0.005;

            // Floating animation
            this.object.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        }

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.x += 0.0002;
            this.particles.rotation.y += 0.0005;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        const container = this.renderer.domElement.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}

// Initialize Three.js scene
document.addEventListener('DOMContentLoaded', () => {
    const threeScene = new ThreeScene();
});
