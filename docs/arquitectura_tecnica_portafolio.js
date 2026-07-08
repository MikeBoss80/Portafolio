/**
 * ARQUITECTURA TÉCNICA - PORTAFOLIO DUAL INTERACTIVO
 * Incluye: Portal de selección, animaciones 3D, efectos y transiciones
 * Stack: HTML5 + CSS3 + JavaScript ES6+ + GSAP + Three.js
 */

// ========================================
// 1. CONFIGURACIÓN GLOBAL
// ========================================

const PORTAL_CONFIG = {
    // Realidad Alpha (Desarrollador Back-end)
    alpha: {
        name: 'REALIDAD ALPHA',
        title: 'Desarrollador Full Stack',
        subtitle: 'Backend Architecture & Cloud Infrastructure',
        colors: {
            primary: '#00FF9F',      // Cyan neón
            accent: '#0066FF',       // Blue eléctrico
            background: '#0A0E27',   // Negro profundo
            glow: '#00FFFF',         // Cyan glow
            danger: '#FF0055'        // Magenta
        },
        duration: 0.8,
        icon: '💻',
        audioTrack: 'alpha-ambient.mp3', // Opcional
        shaderType: 'matrix-rain'
    },
    
    // Realidad Beta (Analista de Datos)
    beta: {
        name: 'REALIDAD BETA',
        title: 'Data Analyst & Data Scientist',
        subtitle: 'Data Visualization & Predictive Analytics',
        colors: {
            primary: '#FFB800',      // Amber
            accent: '#FF6B00',       // Orange eléctrico
            background: '#0D1B2A',   // Azul oscuro
            glow: '#00D4FF',         // Cyan datos
            success: '#4AFF00'       // Verde datos
        },
        duration: 0.8,
        icon: '📊',
        audioTrack: 'beta-ambient.mp3',
        shaderType: 'data-stream'
    },

    // Configuración global
    transitions: {
        portalOpen: 1.5,     // segundos
        sceneLoad: 2.0,
        sectionReveal: 0.6,
        particleCount: 150
    }
};

// ========================================
// 2. SISTEMA DE TEMAS DINÁMICOS
// ========================================

class ThemeManager {
    constructor() {
        this.currentTheme = null;
        this.isTransitioning = false;
    }

    /**
     * Cambiar tema dinámicamente
     * @param {'alpha'|'beta'} themeName
     */
    async switchTheme(themeName) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        const themeConfig = PORTAL_CONFIG[themeName];

        // Animar transición de colores
        const root = document.documentElement;
        const colorKeys = Object.keys(themeConfig.colors);

        gsap.timeline()
            .to(root, {
                '--primary-color': themeConfig.colors.primary,
                '--accent-color': themeConfig.colors.accent,
                '--bg-primary': themeConfig.colors.background,
                duration: 0.8,
                ease: 'power2.inOut'
            })
            .to('.page-background', {
                backgroundColor: themeConfig.colors.background,
                duration: 0.8,
                ease: 'power2.inOut'
            }, 0);

        // Establecer variables CSS
        for (const [key, value] of Object.entries(themeConfig.colors)) {
            const cssVar = `--${themeName}-${key}`;
            root.style.setProperty(cssVar, value);
        }

        this.currentTheme = themeName;
        
        // Esperar a que termine la transición
        await new Promise(resolve => setTimeout(resolve, 800));
        this.isTransitioning = false;
    }

    /**
     * Obtener config actual
     */
    getCurrentConfig() {
        return PORTAL_CONFIG[this.currentTheme];
    }
}

const themeManager = new ThemeManager();

// ========================================
// 3. PORTAL DE SELECCIÓN (Landing Dual)
// ========================================

class PortalSelector {
    constructor() {
        this.selectedPortal = null;
        this.init();
    }

    init() {
        this.createPortalUI();
        this.setupEventListeners();
        this.animateEntrance();
    }

    /**
     * Crear UI del portal de selección
     */
    createPortalUI() {
        const portalContainer = document.createElement('div');
        portalContainer.className = 'portal-selector';
        portalContainer.innerHTML = `
            <div class="portal-background">
                <canvas id="portal-canvas"></canvas>
                <div class="portal-glow"></div>
            </div>

            <div class="portal-content">
                <div class="portal-header" data-aos="fade-up" data-aos-delay="300">
                    <h1 class="portal-title">🌌 MIGUEL ÁNGEL BOLÍVAR 🌌</h1>
                    <p class="portal-subtitle">Viajero Interdimensional de Tecnología</p>
                    <p class="portal-description">Elige tu realidad. Ambas son fascinantes.</p>
                </div>

                <div class="portal-choices">
                    <!-- REALIDAD ALPHA -->
                    <div class="portal-card portal-alpha" data-portal="alpha">
                        <div class="portal-card-content">
                            <div class="portal-icon alpha-icon">💻</div>
                            <h2>REALIDAD ALPHA</h2>
                            <p class="portal-role">Desarrollador Full Stack</p>
                            <p class="portal-subtitle-card">Backend Architecture & Cloud</p>
                            
                            <div class="portal-features">
                                <span class="feature-tag">Node.js</span>
                                <span class="feature-tag">APIs REST</span>
                                <span class="feature-tag">Databases</span>
                                <span class="feature-tag">Cloud</span>
                            </div>
                            
                            <div class="portal-cta">
                                <button class="portal-button alpha-button">
                                    ENTRAR A REALIDAD ALPHA
                                    <span class="button-arrow">→ →</span>
                                </button>
                            </div>
                        </div>
                        <div class="portal-card-overlay"></div>
                    </div>

                    <!-- REALIDAD BETA -->
                    <div class="portal-card portal-beta" data-portal="beta">
                        <div class="portal-card-content">
                            <div class="portal-icon beta-icon">📊</div>
                            <h2>REALIDAD BETA</h2>
                            <p class="portal-role">Data Analyst & Data Scientist</p>
                            <p class="portal-subtitle-card">Data Viz & Predictive Models</p>
                            
                            <div class="portal-features">
                                <span class="feature-tag">Python</span>
                                <span class="feature-tag">SQL</span>
                                <span class="feature-tag">Machine Learning</span>
                                <span class="feature-tag">Analytics</span>
                            </div>
                            
                            <div class="portal-cta">
                                <button class="portal-button beta-button">
                                    ENTRAR A REALIDAD BETA
                                    <span class="button-arrow">→ →</span>
                                </button>
                            </div>
                        </div>
                        <div class="portal-card-overlay"></div>
                    </div>
                </div>

                <div class="portal-footer">
                    <p>Puedes cambiar de realidad en cualquier momento</p>
                    <div class="portal-indicator">
                        <span class="indicator-dot alpha-dot"></span>
                        <span class="indicator-dot beta-dot"></span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(portalContainer);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        document.querySelectorAll('.portal-card').forEach(card => {
            card.addEventListener('click', () => {
                const portal = card.dataset.portal;
                this.selectPortal(portal);
            });

            // Hover effect
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    /**
     * Animación de entrada
     */
    animateEntrance() {
        const timeline = gsap.timeline();

        timeline
            .to('.portal-title', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            })
            .to('.portal-cards', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            }, '-=0.4');
    }

    /**
     * Seleccionar portal y transicionar
     * @param {'alpha'|'beta'} portalName
     */
    async selectPortal(portalName) {
        this.selectedPortal = portalName;
        const config = PORTAL_CONFIG[portalName];

        // Cambiar tema
        await themeManager.switchTheme(portalName);

        // Animación de "warping"
        this.animatePortalWarp(portalName);

        // Transicionar a la experiencia
        setTimeout(() => {
            this.loadRealityScene(portalName);
        }, 1500);
    }

    /**
     * Efecto de warping al entrar al portal
     */
    animatePortalWarp(portalName) {
        const card = document.querySelector(`[data-portal="${portalName}"]`);
        
        gsap.timeline()
            .to(card, {
                scale: 1.2,
                filter: 'brightness(1.5)',
                duration: 0.3
            })
            .to('.portal-selector', {
                opacity: 0,
                backdropFilter: 'blur(10px)',
                duration: 0.8
            }, '+=0.3')
            .to('.portal-selector', {
                pointerEvents: 'none',
                duration: 0.1
            });
    }

    /**
     * Cargar la escena de la realidad elegida
     */
    loadRealityScene(portalName) {
        // Crear screen de carga
        const loadingScreen = this.createLoadingScreen(portalName);
        document.body.appendChild(loadingScreen);

        // Simular carga (en producción, cargar assets reales)
        setTimeout(() => {
            this.hideLoadingScreen(loadingScreen);
            this.renderRealityContent(portalName);
        }, 2500);
    }

    /**
     * Crear screen de carga cinematográfica
     */
    createLoadingScreen(portalName) {
        const screen = document.createElement('div');
        screen.className = `loading-screen loading-${portalName}`;
        screen.innerHTML = `
            <div class="loading-content">
                <div class="loading-text">
                    <p class="loading-title">Inicializando ${PORTAL_CONFIG[portalName].name}</p>
                </div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <div class="loading-percentage">
                    <span class="percentage-number">0</span>%
                </div>
            </div>
            <div class="loading-particles"></div>
        `;

        // Animar barra de progreso
        gsap.to('.loading-progress', {
            width: '100%',
            duration: 2.3,
            ease: 'power2.inOut'
        });

        // Animar números
        gsap.to('.percentage-number', {
            textContent: 100,
            duration: 2.3,
            snap: { textContent: 1 },
            ease: 'power2.inOut'
        });

        return screen;
    }

    /**
     * Ocultar loading screen
     */
    hideLoadingScreen(screen) {
        gsap.to(screen, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                screen.remove();
            }
        });
    }

    /**
     * Renderizar contenido de la realidad elegida
     */
    renderRealityContent(portalName) {
        const container = document.querySelector('.main-content');
        
        if (portalName === 'alpha') {
            new AlphaRealityScene();
        } else {
            new BetaRealityScene();
        }

        // Fade in del contenido
        gsap.from(container, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out'
        });
    }
}

// ========================================
// 4. ESCENA REALIDAD ALPHA (DEV TRACK)
// ========================================

class AlphaRealityScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.init();
    }

    init() {
        this.setupThreeScene();
        this.createHeroSection();
        this.createStackTower();
        this.createProjectsGrid();
        this.setupScrollAnimations();
    }

    /**
     * Setup Three.js scene
     */
    setupThreeScene() {
        // Canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'alpha-canvas';
        canvas.className = 'scene-canvas alpha-canvas';
        document.body.appendChild(canvas);

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0A0E27);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00FF9F, 1);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Start animation loop
        this.animate();
    }

    /**
     * Crear Hero Section con código fluyente
     */
    createHeroSection() {
        const heroContent = document.querySelector('.hero-content');
        
        // Crear matriz de código animada
        const codeMatrix = this.createCodeMatrix();
        heroContent.appendChild(codeMatrix);

        // Animar entrada del hero
        gsap.from(heroContent, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        });
    }

    /**
     * Crear matriz de código visual
     */
    createCodeMatrix() {
        const matrix = document.createElement('div');
        matrix.className = 'code-matrix';
        matrix.innerHTML = `
            <div class="code-line" style="animation-delay: 0.1s;">
                function buildFuture() {
            </div>
            <div class="code-line" style="animation-delay: 0.2s;">
                const skills = ['Node', 'React'];
            </div>
            <div class="code-line" style="animation-delay: 0.3s;">
                const passion = ∞;
            </div>
            <div class="code-line" style="animation-delay: 0.4s;">
                return skills.map(amplify);
            </div>
            <div class="code-line" style="animation-delay: 0.5s;">
                }
            </div>
        `;

        return matrix;
    }

    /**
     * Crear Stack Tower (Bloques 3D rotantes)
     */
    createStackTower() {
        const technologies = [
            { name: 'Node.js', color: '#68A063' },
            { name: 'React', color: '#61DAFB' },
            { name: 'MongoDB', color: '#13AA52' },
            { name: 'AWS', color: '#FF9900' }
        ];

        const group = new THREE.Group();

        technologies.forEach((tech, index) => {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshStandardMaterial({
                color: tech.color,
                emissive: tech.color,
                emissiveIntensity: 0.3,
                metalness: 0.7,
                roughness: 0.2
            });

            const cube = new THREE.Mesh(geometry, material);
            cube.position.y = (index - technologies.length / 2) * 1.5;
            cube.userData = { tech: tech.name };

            // Rotación continua
            gsap.to(cube.rotation, {
                x: Math.PI * 2,
                y: Math.PI * 2,
                duration: 8,
                repeat: -1,
                ease: 'none'
            });

            group.add(cube);
        });

        group.position.x = 5;
        this.scene.add(group);
    }

    /**
     * Crear grid de proyectos con efectos
     */
    createProjectsGrid() {
        const projectsSection = document.querySelector('.projects-section');
        
        const projects = [
            { title: 'E-commerce Platform', tech: 'Node + React', image: 'project-1.jpg' },
            { title: 'API Analytics', tech: 'Go + PostgreSQL', image: 'project-2.jpg' },
            { title: 'Real-time Chat', tech: 'WebSockets + Redis', image: 'project-3.jpg' }
        ];

        projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsSection.appendChild(projectCard);
        });
    }

    /**
     * Crear tarjeta de proyecto individual
     */
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card alpha-card';
        card.innerHTML = `
            <div class="project-image" style="background-image: url(${project.image})"></div>
            <div class="project-overlay">
                <h3>${project.title}</h3>
                <p>${project.tech}</p>
                <button class="project-cta">Ver Detalles</button>
            </div>
        `;

        // Hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 40px rgba(0, 255, 159, 0.3)',
                duration: 0.3
            });

            // Glitch effect en el título
            this.applyGlitchEffect(card.querySelector('h3'));
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                duration: 0.3
            });

            this.removeGlitchEffect(card.querySelector('h3'));
        });

        return card;
    }

    /**
     * Aplicar efecto glitch al texto
     */
    applyGlitchEffect(element) {
        element.classList.add('glitch-active');
        
        // Cambiar texto aleatoriamente
        const originalText = element.textContent;
        const glitchInterval = setInterval(() => {
            const glitched = originalText
                .split('')
                .map((char, i) => Math.random() > 0.8 ? '█' : char)
                .join('');
            element.textContent = glitched;
        }, 50);

        element.dataset.glitchInterval = glitchInterval;
    }

    /**
     * Remover efecto glitch
     */
    removeGlitchEffect(element) {
        element.classList.remove('glitch-active');
        clearInterval(element.dataset.glitchInterval);
        // Restaurar texto original
        element.textContent = element.dataset.originalText;
    }

    /**
     * Setup animaciones al scroll
     */
    setupScrollAnimations() {
        const cards = document.querySelectorAll('.alpha-card');
        
        cards.forEach((card, index) => {
            ScrollTrigger.create({
                trigger: card,
                start: 'top 80%',
                onEnter: () => {
                    gsap.from(card, {
                        opacity: 0,
                        y: 50,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    /**
     * Animation loop
     */
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Handle window resize
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// ========================================
// 5. ESCENA REALIDAD BETA (DATA TRACK)
// ========================================

class BetaRealityScene {
    constructor() {
        this.init();
    }

    init() {
        this.createHeroSection();
        this.createSkillsConstellation();
        this.createAnalyticsDashboard();
        this.setupDataVisualizations();
    }

    /**
     * Hero section con animación de datos
     */
    createHeroSection() {
        const heroContent = document.querySelector('.hero-content');
        
        heroContent.innerHTML = `
            <div class="data-hero">
                <h1 class="data-title">📊 Insights Architect</h1>
                <p class="data-subtitle">Transformando datos en decisiones</p>
                
                <div class="live-stats">
                    <div class="stat-card">
                        <span class="stat-label">Proyectos Completados</span>
                        <span class="stat-value" data-target="47">0</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Accuracy Promedio</span>
                        <span class="stat-value" data-target="89.2">0</span>
                        <span class="stat-unit">%</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">ROI Generado</span>
                        <span class="stat-value" data-target="2.4">0</span>
                        <span class="stat-unit">M$</span>
                    </div>
                </div>
            </div>
        `;

        // Animar números
        this.animateCounters();
    }

    /**
     * Animar contadores de estadísticas
     */
    animateCounters() {
        document.querySelectorAll('.stat-value').forEach(element => {
            const target = parseFloat(element.dataset.target);
            
            gsap.to(element, {
                textContent: target,
                duration: 2,
                ease: 'power2.inOut',
                snap: { textContent: 0.1 },
                onUpdate: function() {
                    // Cambiar color basado en progreso
                    const percent = this.progress();
                    if (percent < 0.5) {
                        element.style.color = '#4AFF00'; // Verde
                    } else {
                        element.style.color = '#FFB800'; // Amber
                    }
                }
            });
        });
    }

    /**
     * Crear constelación de skills (gráfico de burbujas)
     */
    createSkillsConstellation() {
        const skillsContainer = document.querySelector('.skills-section');
        
        const skills = [
            { name: 'Python', proficiency: 95, x: 20, y: 30 },
            { name: 'SQL', proficiency: 90, x: 70, y: 25 },
            { name: 'R', proficiency: 85, x: 15, y: 70 },
            { name: 'Tableau', proficiency: 88, x: 75, y: 70 },
            { name: 'Excel', proficiency: 92, x: 45, y: 50 },
            { name: 'ML/AI', proficiency: 87, x: 60, y: 80 }
        ];

        // Crear canvas para visualización
        const canvas = document.createElement('canvas');
        canvas.className = 'skills-constellation-canvas';
        skillsContainer.appendChild(canvas);

        // Dibujar constelación
        this.drawConstellation(canvas, skills);
    }

    /**
     * Dibujar constelación de skills
     */
    drawConstellation(canvas, skills) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Dibujar conexiones
        ctx.strokeStyle = 'rgba(0, 255, 159, 0.2)';
        ctx.lineWidth = 1;
        
        skills.forEach((skill, i) => {
            skills.slice(i + 1).forEach(other => {
                const x1 = (skill.x / 100) * canvas.width;
                const y1 = (skill.y / 100) * canvas.height;
                const x2 = (other.x / 100) * canvas.width;
                const y2 = (other.y / 100) * canvas.height;
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            });
        });

        // Dibujar nodos
        skills.forEach(skill => {
            const x = (skill.x / 100) * canvas.width;
            const y = (skill.y / 100) * canvas.height;
            const radius = (skill.proficiency / 100) * 30;

            // Círculo exterior
            ctx.fillStyle = `rgba(255, 184, 0, 0.1)`;
            ctx.beginPath();
            ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
            ctx.fill();

            // Círculo principal
            ctx.fillStyle = '#FFB800';
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            // Etiqueta
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(skill.name, x, y);
        });
    }

    /**
     * Crear dashboard de analytics
     */
    createAnalyticsDashboard() {
        const dashboardContainer = document.querySelector('.dashboard-section');
        
        dashboardContainer.innerHTML = `
            <div class="dashboard">
                <div class="kpi-grid">
                    <div class="kpi-card">
                        <h3>Conversión</h3>
                        <div class="kpi-value" data-value="3.2">0%</div>
                        <div class="kpi-trend up">↗ +0.4%</div>
                    </div>
                    <div class="kpi-card">
                        <h3>Churn Rate</h3>
                        <div class="kpi-value" data-value="8.1">0%</div>
                        <div class="kpi-trend down">↘ -0.2%</div>
                    </div>
                    <div class="kpi-card">
                        <h3>LTV</h3>
                        <div class="kpi-value">$<span data-value="890">0</span></div>
                        <div class="kpi-trend up">↗ +$12</div>
                    </div>
                </div>

                <div class="chart-container">
                    <canvas id="trends-chart"></canvas>
                </div>
            </div>
        `;

        this.drawTrendsChart();
    }

    /**
     * Dibujar gráfico de tendencias
     */
    drawTrendsChart() {
        const ctx = document.getElementById('trends-chart').getContext('2d');
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Conversión',
                    data: [2.1, 2.3, 2.8, 3.0, 3.1, 3.2],
                    borderColor: '#FFB800',
                    backgroundColor: 'rgba(255, 184, 0, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }

    /**
     * Setup visualizaciones de datos
     */
    setupDataVisualizations() {
        // Implementar D3.js para gráficos avanzados
        // o Plotly.js para dashboards interactivos
    }
}

// ========================================
// 6. INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Cargar GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Inicializar aplicación
    const portalSelector = new PortalSelector();

    // Monitorear performance
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        });
    }
});

// ========================================
// 7. UTILIDADES Y HELPERS
// ========================================

/**
 * Lazy loading de imágenes con efecto
 */
class LazyImageLoader {
    static init() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (!('IntersectionObserver' in window)) {
            images.forEach(img => img.src = img.dataset.src);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Fade in al cargar
                    gsap.from(img, {
                        opacity: 0,
                        duration: 0.5,
                        onStart: () => {
                            img.src = img.dataset.src;
                        }
                    });
                    
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        images.forEach(img => observer.observe(img));
    }
}

/**
 * Crear partículas interactivas
 */
class InteractiveParticles {
    constructor(canvasId, config) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.config = config || {};
        
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        this.init();
    }

    init() {
        // Crear partículas
        for (let i = 0; i < this.config.count || 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 2
            });
        }

        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Rebote en bordes
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Dibujar
            this.ctx.fillStyle = this.config.color || '#00FF9F';
            this.ctx.globalAlpha = 0.6;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
    }
}

// Export para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        PortalSelector,
        AlphaRealityScene,
        BetaRealityScene,
        LazyImageLoader,
        InteractiveParticles
    };
}
