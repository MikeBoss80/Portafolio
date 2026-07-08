# 🏗️ MANUAL DE CONSTRUCCIÓN - PORTAFOLIO DUAL 3D
## Guía Paso a Paso Completamente Funcional

**Duración total:** 9 semanas | **Dedicación:** 10-15 horas/semana  
**Dificultad:** Intermedia | **Requisitos:** Git + Node.js (opcional)

---

## 📋 ÍNDICE RÁPIDO

1. [Preparación del Proyecto](#fase-0-preparación)
2. [Arquitectura Base](#fase-1-arquitectura-base)
3. [Configuración de Temas](#fase-2-temas-dinámicos)
4. [Portal de Selección](#fase-3-portal-selector)
5. [Animaciones GSAP](#fase-4-animaciones-core)
6. [Realidad Alpha (Dev)](#fase-5-realidad-alpha)
7. [Realidad Beta (Data)](#fase-6-realidad-beta)
8. [Optimización](#fase-7-optimización)
9. [Deployment](#fase-8-deployment)

---

# 🚀 FASE 0: PREPARACIÓN (30 minutos)

## Paso 0.1: Crear estructura de carpetas

**Tiempo:** 5 minutos  
**Objetivo:** Carpetas del proyecto organizadas

### En tu terminal:

```bash
# Crear carpeta principal
mkdir Portafolio-Dual
cd Portafolio-Dual

# Crear subcarpetas
mkdir -p css js api assets/{images,models,shaders,audio,data}
mkdir -p assets/images/{projects,webp,icons}
mkdir -p scripts utils config docs

# Crear archivos principales
touch index.html
touch css/styles.css
touch js/main.js
touch api/send-contact.php
touch .gitignore
touch README.md
```

**Estructura resultante:**

```
Portafolio-Dual/
├── index.html
├── README.md
├── .gitignore
├── css/
│   ├── styles.css              (estilos globales)
│   ├── themes.css              (variables por tema)
│   ├── animations.css          (keyframes)
│   └── responsive.css          (mobile)
├── js/
│   ├── main.js                 (orquestador)
│   ├── portal-selector.js      (bifurcación)
│   ├── theme-manager.js        (temas)
│   ├── alpha-scene.js          (track dev)
│   └── beta-scene.js           (track data)
├── api/
│   └── send-contact.php        (backend)
├── assets/
│   ├── images/
│   │   ├── projects/
│   │   ├── webp/               (optimizadas)
│   │   └── icons/
│   ├── models/                 (3D files)
│   ├── shaders/                (GLSL)
│   ├── audio/                  (sonidos)
│   └── data/
│       ├── projects-alpha.json
│       ├── projects-beta.json
│       └── skills-data.json
├── scripts/
│   └── optimize-images.js
├── utils/
│   ├── validation.js
│   ├── animations.js
│   └── performance.js
└── config/
    └── config.js
```

**✅ Validación:** Ejecuta `ls -la` y verifica que todas las carpetas existan

---

## Paso 0.2: Inicializar Git (Opcional pero recomendado)

```bash
# Inicializar git
git init

# Crear .gitignore
cat > .gitignore << 'EOF'
node_modules/
*.log
.DS_Store
.env
/dist
/build
*.swp
.vscode/settings.json
EOF

# Primer commit
git add .
git commit -m "Initial commit: project structure"
```

**✅ Validación:** `git log` debe mostrar 1 commit

---

## Paso 0.3: Configurar package.json (Opcional)

```bash
npm init -y
```

**Contenido de `package.json` (editar manualmente):**

```json
{
  "name": "portafolio-dual-3d",
  "version": "1.0.0",
  "description": "Portafolio interactivo dual: Dev vs Data",
  "main": "index.html",
  "scripts": {
    "start": "python -m http.server 8000",
    "optimize-images": "node scripts/optimize-images.js",
    "lighthouse": "lighthouse index.html --output=html"
  },
  "keywords": ["portfolio", "3d", "interactive"],
  "author": "Miguel Angel Bolivar",
  "license": "MIT"
}
```

**✅ Validación:** `npm run` debe listar los scripts

---

---

# 📝 FASE 1: ARQUITECTURA BASE (2 semanas)

## Paso 1.1: Crear HTML Base

**Tiempo:** 1 hora  
**Archivo:** `index.html`

Copiar el contenido de `index_base.html` que recibiste y pegar en tu archivo local:

```bash
# Copiar desde los archivos entregados
# (O crear manualmente basándose en el contenido)
```

**Verificar que incluya:**
- ✅ Meta tags correctos
- ✅ Links a CDN (GSAP, Three.js, Chart.js)
- ✅ Estructura semántica
- ✅ Schema markup

**Abrir en navegador:**
```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node (si instalaste)
npx http-server

# Opción 3: PHP
php -S localhost:8000
```

Luego: `open http://localhost:8000`

**✅ Validación:** 
- Página carga sin errores en consola
- HTML se ve estructura pero sin estilos (normal en este punto)

---

## Paso 1.2: Crear CSS Base - Variables de Temas

**Tiempo:** 1.5 horas  
**Archivo:** `css/styles.css`

Crear el archivo con variables para ambos temas:

```css
/* ============================================
   1. VARIABLES GLOBALES
   ============================================ */

:root {
    /* TEMA ALPHA (Desarrollador) */
    --alpha-primary: #00FF9F;      /* Cyan brillante */
    --alpha-accent: #0066FF;       /* Azul eléctrico */
    --alpha-background: #0A0E27;   /* Negro profundo */
    --alpha-glow: #00FFFF;         /* Cyan glow */
    --alpha-danger: #FF0055;       /* Magenta punk */
    --alpha-success: #00FF00;      /* Verde neon */

    /* TEMA BETA (Datos) */
    --beta-primary: #FFB800;       /* Amber cálido */
    --beta-accent: #FF6B00;        /* Naranja eléctrico */
    --beta-background: #0D1B2A;    /* Azul oscuro */
    --beta-glow: #00D4FF;          /* Cyan datos */
    --beta-success: #4AFF00;       /* Verde datos */
    --beta-warning: #FFD700;       /* Oro */

    /* COLORES NEUTRALES */
    --text-primary: #FFFFFF;
    --text-secondary: #CBD5E1;
    --text-muted: #94A3B8;
    --bg-overlay: rgba(0, 0, 0, 0.8);

    /* ESPACIADO */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 3rem;
    --spacing-xl: 4rem;

    /* TRANSICIONES */
    --transition-fast: 0.15s ease-in-out;
    --transition-base: 0.3s ease-in-out;
    --transition-slow: 0.6s ease-in-out;

    /* SOMBRAS */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.4);
    --shadow-glow-alpha: 0 0 20px rgba(0, 255, 159, 0.5);
    --shadow-glow-beta: 0 0 20px rgba(255, 184, 0, 0.5);

    /* Z-INDEX */
    --z-base: 1;
    --z-dropdown: 100;
    --z-modal: 1000;
    --z-loading: 10000;
}

/* ============================================
   2. RESET & BASE STYLES
   ============================================ */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--alpha-background);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    transition: background-color var(--transition-base);
}

/* ============================================
   3. TIPOGRAFÍA
   ============================================ */

h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
}

h1 { font-size: 3rem; }
h2 { font-size: 2.25rem; }
h3 { font-size: 1.875rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

p {
    margin-bottom: 1rem;
    color: var(--text-secondary);
}

a {
    color: inherit;
    text-decoration: none;
    transition: color var(--transition-fast);
}

/* ============================================
   4. CONTENEDOR PRINCIPAL
   ============================================ */

.main-content {
    width: 100%;
    min-height: 100vh;
    position: relative;
    z-index: var(--z-base);
}

.section-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

/* ============================================
   5. SECCIONES
   ============================================ */

section {
    padding: var(--spacing-xl) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    font-size: 2.5rem;
    letter-spacing: 1px;
}

.section-description {
    text-align: center;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 2rem;
    font-size: 1.1rem;
}

/* ============================================
   6. RESPONSIVE BASICS
   ============================================ */

@media (max-width: 768px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    .section-container {
        padding: var(--spacing-md);
    }
}

@media (max-width: 480px) {
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.25rem; }
}
```

**✅ Validación:**
- Abrir DevTools (F12)
- En Console, ejecutar: `getComputedStyle(document.documentElement).getPropertyValue('--alpha-primary')`
- Debe retornar: `#00FF9F`

---

## Paso 1.3: Crear archivo de configuración

**Tiempo:** 30 minutos  
**Archivo:** `config/config.js`

```javascript
/**
 * CONFIGURACIÓN GLOBAL DEL PORTAFOLIO
 * Centraliza todos los valores para fácil customización
 */

const PORTFOLIO_CONFIG = {
    // Información personal
    author: {
        name: 'Miguel Ángel Bolívar',
        title: 'Full Stack Developer | Data Analyst',
        description: 'Desarrollador y analista de datos apasionado por resolver problemas complejos',
        email: 'tu-email@example.com',
        phone: '+57-XXX-XXX-XXXX'
    },

    // URLs y links
    social: {
        github: 'https://github.com/MikeBoss80',
        linkedin: 'https://linkedin.com/in/miguel-bolivar',
        twitter: 'https://twitter.com/tuhandle',
        email: 'mailto:tu-email@example.com'
    },

    // API endpoints
    api: {
        contactForm: '/api/send-contact.php',
        projectsAlpha: '/assets/data/projects-alpha.json',
        projectsBeta: '/assets/data/projects-beta.json',
        skillsData: '/assets/data/skills-data.json'
    },

    // Configuración de animaciones
    animations: {
        portalOpenDuration: 1.5,      // segundos
        sceneLoadDuration: 2.0,
        sectionRevealDuration: 0.6,
        particleCount: 150,
        scrollTriggerOffset: 100       // px
    },

    // Temas
    themes: {
        alpha: {
            name: 'REALIDAD ALPHA',
            type: 'developer',
            colors: {
                primary: '#00FF9F',
                accent: '#0066FF',
                background: '#0A0E27',
                glow: '#00FFFF',
                danger: '#FF0055'
            }
        },
        beta: {
            name: 'REALIDAD BETA',
            type: 'analyst',
            colors: {
                primary: '#FFB800',
                accent: '#FF6B00',
                background: '#0D1B2A',
                glow: '#00D4FF',
                success: '#4AFF00'
            }
        }
    },

    // Contenido dinámico (luego cargar desde JSON)
    projects: {
        alpha: [
            {
                id: 1,
                title: 'E-commerce Platform',
                tech: ['Node.js', 'React', 'MongoDB'],
                image: 'project-1.jpg',
                description: 'Plataforma de e-commerce escalable',
                link: 'https://github.com/...'
            },
            // ... más proyectos
        ],
        beta: [
            {
                id: 1,
                title: 'Customer Churn Analysis',
                tech: ['Python', 'Pandas', 'ML'],
                accuracy: 89.2,
                description: 'Modelo predictivo de churn',
                link: 'https://github.com/...'
            },
            // ... más proyectos
        ]
    },

    // Performance
    performance: {
        lazyLoadOffset: 200,           // px antes de viewport
        debounceDelay: 250,            // ms
        throttleDelay: 16              // ms (60fps)
    }
};

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_CONFIG;
}
```

**✅ Validación:**
- En Console: `PORTFOLIO_CONFIG.author.name` debe retornar el nombre

---

## Paso 1.4: Crear estructura JSON de datos

**Tiempo:** 1 hora  
**Archivos:** 
- `assets/data/projects-alpha.json`
- `assets/data/projects-beta.json`
- `assets/data/skills-data.json`

### `assets/data/projects-alpha.json`

```json
{
  "title": "Developer Projects",
  "projects": [
    {
      "id": 1,
      "title": "E-commerce Platform",
      "category": "backend",
      "technologies": ["Node.js", "Express", "MongoDB", "React"],
      "description": "Plataforma de e-commerce escalable con carrito de compras, pagos y administración de inventario",
      "imageUrl": "assets/images/projects/project-1.jpg",
      "githubLink": "https://github.com/MikeBoss80/ecommerce-platform",
      "liveLink": "https://demo-ecommerce.example.com",
      "year": 2023,
      "highlights": [
        "API REST con 15+ endpoints",
        "Autenticación JWT",
        "Integración Stripe"
      ]
    },
    {
      "id": 2,
      "title": "Real-time Chat Application",
      "category": "fullstack",
      "technologies": ["Node.js", "WebSockets", "Redis", "React"],
      "description": "Aplicación de chat en tiempo real con salas privadas y públicas",
      "imageUrl": "assets/images/projects/project-2.jpg",
      "githubLink": "https://github.com/MikeBoss80/realtime-chat",
      "liveLink": "https://chat-app.example.com",
      "year": 2024,
      "highlights": [
        "WebSockets escalables",
        "Caching con Redis",
        "100+ usuarios simultáneos"
      ]
    },
    {
      "id": 3,
      "title": "Cloud Analytics Dashboard",
      "category": "backend",
      "technologies": ["Python", "FastAPI", "PostgreSQL", "AWS"],
      "description": "Dashboard de análisis deployado en AWS con auto-scaling",
      "imageUrl": "assets/images/projects/project-3.jpg",
      "githubLink": "https://github.com/MikeBoss80/analytics-dashboard",
      "liveLink": "https://analytics.example.com",
      "year": 2024,
      "highlights": [
        "Procesamiento de 1M+ eventos/día",
        "Auto-scaling con Lambda",
        "Alertas en tiempo real"
      ]
    }
  ],
  "skills": [
    {
      "category": "Backend",
      "items": [
        { "name": "Node.js", "proficiency": 95 },
        { "name": "Python", "proficiency": 88 },
        { "name": "Go", "proficiency": 82 }
      ]
    },
    {
      "category": "Bases de Datos",
      "items": [
        { "name": "MongoDB", "proficiency": 92 },
        { "name": "PostgreSQL", "proficiency": 90 },
        { "name": "Redis", "proficiency": 87 }
      ]
    },
    {
      "category": "Cloud & DevOps",
      "items": [
        { "name": "AWS", "proficiency": 85 },
        { "name": "Docker", "proficiency": 88 },
        { "name": "CI/CD", "proficiency": 85 }
      ]
    }
  ]
}
```

### `assets/data/projects-beta.json`

```json
{
  "title": "Data Analysis Projects",
  "projects": [
    {
      "id": 1,
      "title": "Customer Churn Prediction",
      "category": "machine-learning",
      "technologies": ["Python", "Scikit-learn", "Pandas", "SQL"],
      "description": "Modelo predictivo de churn con 89.2% de accuracy",
      "imageUrl": "assets/images/projects/data-1.jpg",
      "githubLink": "https://github.com/MikeBoss80/churn-prediction",
      "year": 2024,
      "metrics": {
        "accuracy": 89.2,
        "precision": 87.5,
        "recall": 88.9
      },
      "highlights": [
        "Random Forest + Gradient Boosting",
        "Feature engineering avanzado",
        "API para predicciones"
      ]
    },
    {
      "id": 2,
      "title": "Sales Forecast Analytics",
      "category": "analytics",
      "technologies": ["Python", "Time Series", "Tableau", "SQL"],
      "description": "Sistema de pronóstico de ventas con ARIMA",
      "imageUrl": "assets/images/projects/data-2.jpg",
      "githubLink": "https://github.com/MikeBoss80/sales-forecast",
      "year": 2024,
      "metrics": {
        "mape": 4.2,
        "dataPoints": "50000+",
        "accuracy": 94.8
      },
      "highlights": [
        "Análisis de series temporales",
        "Visualizaciones interactivas",
        "Pronósticos 12 meses"
      ]
    }
  ],
  "skills": [
    {
      "category": "Data Analysis",
      "items": [
        { "name": "Python", "proficiency": 95 },
        { "name": "SQL", "proficiency": 92 },
        { "name": "R", "proficiency": 85 }
      ]
    },
    {
      "category": "Machine Learning",
      "items": [
        { "name": "Scikit-learn", "proficiency": 90 },
        { "name": "TensorFlow", "proficiency": 82 },
        { "name": "XGBoost", "proficiency": 88 }
      ]
    },
    {
      "category": "Visualization",
      "items": [
        { "name": "Tableau", "proficiency": 88 },
        { "name": "Power BI", "proficiency": 85 },
        { "name": "Matplotlib", "proficiency": 87 }
      ]
    }
  ]
}
```

**✅ Validación:**
- Validar JSON: `npx jsonlint assets/data/projects-alpha.json`
- O pegar en https://jsonlint.com

---

---

# 🎨 FASE 2: TEMAS DINÁMICOS (1 semana)

## Paso 2.1: Crear Theme Manager

**Tiempo:** 1.5 horas  
**Archivo:** `js/theme-manager.js`

```javascript
/**
 * THEME MANAGER
 * Gestiona cambio dinámico entre temas Alpha y Beta
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'alpha';
        this.isTransitioning = false;
        this.themes = PORTFOLIO_CONFIG.themes;
        this.init();
    }

    init() {
        // Establecer tema inicial
        this.applyTheme('alpha');
        
        // Escuchar cambios
        document.addEventListener('theme-change', (e) => {
            this.switchTheme(e.detail.theme);
        });
    }

    /**
     * Aplicar tema sin animación (inicio)
     */
    applyTheme(themeName) {
        if (!this.themes[themeName]) {
            console.error(`Tema ${themeName} no existe`);
            return;
        }

        const theme = this.themes[themeName];
        const root = document.documentElement;

        // Establecer variables CSS
        Object.entries(theme.colors).forEach(([key, value]) => {
            const varName = `--${themeName}-${key}`;
            root.style.setProperty(varName, value);
        });

        // Establecer tema en HTML
        root.dataset.theme = themeName;
        this.currentTheme = themeName;

        // Guardar preferencia
        localStorage.setItem('preferred-theme', themeName);
    }

    /**
     * Cambiar tema con animación
     */
    async switchTheme(themeName) {
        if (this.isTransitioning || !this.themes[themeName]) return;
        
        this.isTransitioning = true;

        // Animación de transición
        await this.animateThemeTransition(themeName);

        this.isTransitioning = false;
    }

    /**
     * Animar transición de tema
     */
    animateThemeTransition(themeName) {
        return new Promise(resolve => {
            const theme = this.themes[themeName];
            const root = document.documentElement;

            // Usar GSAP si está disponible
            if (typeof gsap !== 'undefined') {
                gsap.to(root, {
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        // Cambiar colores durante la animación
                        Object.entries(theme.colors).forEach(([key, value]) => {
                            const varName = `--${themeName}-${key}`;
                            root.style.setProperty(varName, value);
                        });
                    },
                    onComplete: () => {
                        this.applyTheme(themeName);
                        resolve();
                    }
                });
            } else {
                // Fallback sin GSAP
                this.applyTheme(themeName);
                resolve();
            }
        });
    }

    /**
     * Obtener tema actual
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Obtener config del tema actual
     */
    getCurrentConfig() {
        return this.themes[this.currentTheme];
    }

    /**
     * Restaurar preferencia guardada
     */
    restorePreference() {
        const saved = localStorage.getItem('preferred-theme');
        if (saved && this.themes[saved]) {
            this.applyTheme(saved);
        }
    }
}

// Crear instancia global
const themeManager = new ThemeManager();
```

**✅ Validación:**
- En Console: `themeManager.getCurrentTheme()` → "alpha"
- En Console: `themeManager.switchTheme('beta')` → tema cambia

---

## Paso 2.2: Agregar CSS por tema

**Tiempo:** 1.5 horas  
**Archivo:** `css/themes.css` (nuevo)

```css
/* ============================================
   ESTILOS ESPECÍFICOS POR TEMA
   ============================================ */

/* ============================================
   TEMA ALPHA (DESARROLLADOR)
   ============================================ */

[data-theme="alpha"] {
    /* Variables locales */
    --primary: var(--alpha-primary);
    --accent: var(--alpha-accent);
    --background: var(--alpha-background);
    --glow: var(--alpha-glow);
    --danger: var(--alpha-danger);
}

[data-theme="alpha"] body {
    background-color: var(--alpha-background);
}

[data-theme="alpha"] .section-title {
    color: var(--alpha-primary);
    text-shadow: 0 0 20px var(--alpha-primary);
}

[data-theme="alpha"] .hero-section {
    background: linear-gradient(135deg, var(--alpha-background), #1a1f4d);
    border-bottom: 2px solid var(--alpha-glow);
}

[data-theme="alpha"] a:hover {
    color: var(--alpha-primary);
    text-shadow: 0 0 10px var(--alpha-primary);
}

[data-theme="alpha"] button {
    border-color: var(--alpha-primary);
    color: var(--alpha-primary);
}

[data-theme="alpha"] button:hover {
    background-color: var(--alpha-primary);
    color: var(--alpha-background);
    box-shadow: var(--shadow-glow-alpha);
}

/* ============================================
   TEMA BETA (ANALISTA DE DATOS)
   ============================================ */

[data-theme="beta"] {
    /* Variables locales */
    --primary: var(--beta-primary);
    --accent: var(--beta-accent);
    --background: var(--beta-background);
    --glow: var(--beta-glow);
    --success: var(--beta-success);
}

[data-theme="beta"] body {
    background-color: var(--beta-background);
}

[data-theme="beta"] .section-title {
    color: var(--beta-primary);
    text-shadow: 0 0 20px var(--beta-primary);
}

[data-theme="beta"] .hero-section {
    background: linear-gradient(135deg, var(--beta-background), #0a2540);
    border-bottom: 2px solid var(--beta-primary);
}

[data-theme="beta"] a:hover {
    color: var(--beta-primary);
    text-shadow: 0 0 10px var(--beta-primary);
}

[data-theme="beta"] button {
    border-color: var(--beta-primary);
    color: var(--beta-primary);
}

[data-theme="beta"] button:hover {
    background-color: var(--beta-primary);
    color: var(--beta-background);
    box-shadow: var(--shadow-glow-beta);
}

/* ============================================
   TRANSICIONES SUAVES ENTRE TEMAS
   ============================================ */

body,
.section-title,
button,
a {
    transition: background-color var(--transition-base),
                color var(--transition-base),
                text-shadow var(--transition-base),
                box-shadow var(--transition-base),
                border-color var(--transition-base);
}
```

**En `index.html`, agregar después de `styles.css`:**

```html
<link rel="stylesheet" href="css/themes.css">
```

**✅ Validación:**
- Cambiar tema y verificar que colores cambien suavemente

---

---

# 🎭 FASE 3: PORTAL SELECTOR (1.5 semanas)

## Paso 3.1: Crear Portal Selector HTML

**Tiempo:** 1 hora  
**Ubicación:** Agregar a `index.html` después de `<body>` (antes de main)

```html
<!-- ========================================
     PORTAL SELECTOR (Selección de Realidad)
     ======================================== -->
<div id="portal-selector" class="portal-selector">
    <div class="portal-background">
        <canvas id="portal-canvas"></canvas>
        <div class="portal-glow"></div>
    </div>

    <div class="portal-content">
        <!-- Header -->
        <div class="portal-header">
            <h1 class="portal-title">🌌 MIGUEL ÁNGEL BOLÍVAR 🌌</h1>
            <p class="portal-subtitle">Viajero Interdimensional de Tecnología</p>
            <p class="portal-description">Elige tu realidad. Ambas son fascinantes.</p>
        </div>

        <!-- Opciones de Realidades -->
        <div class="portal-choices">
            
            <!-- REALIDAD ALPHA -->
            <div class="portal-card portal-alpha" data-portal="alpha">
                <div class="portal-card-content">
                    <div class="portal-icon">💻</div>
                    
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
            </div>

            <!-- REALIDAD BETA -->
            <div class="portal-card portal-beta" data-portal="beta">
                <div class="portal-card-content">
                    <div class="portal-icon">📊</div>
                    
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
            </div>

        </div>

        <!-- Footer -->
        <div class="portal-footer">
            <p>Puedes cambiar de realidad en cualquier momento</p>
            <div class="portal-indicator">
                <span class="indicator-dot alpha-dot"></span>
                <span class="indicator-dot beta-dot"></span>
            </div>
        </div>
    </div>
</div>
```

**✅ Validación:** Elemento aparece en página (sin estilos aún)

---

## Paso 3.2: Crear CSS del Portal

**Tiempo:** 2 horas  
**Archivo:** `css/portal.css` (nuevo)

```css
/* ============================================
   PORTAL SELECTOR STYLES
   ============================================ */

.portal-selector {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: var(--alpha-background);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    opacity: 1;
    transition: opacity 0.8s ease-out;
}

.portal-selector.hidden {
    opacity: 0;
    pointer-events: none;
}

/* Background */
.portal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

#portal-canvas {
    width: 100%;
    height: 100%;
    display: block;
}

.portal-glow {
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 255, 159, 0.1) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(60px);
    animation: portalPulse 4s ease-in-out infinite;
    pointer-events: none;
}

@keyframes portalPulse {
    0%, 100% { 
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.5;
    }
    50% { 
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0.8;
    }
}

/* Content */
.portal-content {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 1200px;
    width: 100%;
    padding: 3rem;
}

.portal-header {
    margin-bottom: 3rem;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out 0.3s forwards;
}

.portal-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--alpha-primary), var(--alpha-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 2px;
}

.portal-subtitle {
    font-size: 1.25rem;
    color: #cbd5e1;
    margin-bottom: 0.5rem;
}

.portal-description {
    font-size: 1rem;
    color: #94a3b8;
}

/* Cards */
.portal-choices {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin: 3rem 0;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out 0.5s forwards;
}

.portal-card {
    position: relative;
    padding: 3rem;
    border-radius: 1rem;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: all var(--transition-base);
    overflow: hidden;
}

.portal-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
}

.portal-card:hover::before {
    left: 100%;
}

.portal-card.portal-alpha {
    border-color: var(--alpha-primary);
    box-shadow: 0 0 20px rgba(0, 255, 159, 0.2);
}

.portal-card.portal-alpha:hover {
    box-shadow: 0 0 40px rgba(0, 255, 159, 0.4),
                inset 0 0 20px rgba(0, 255, 159, 0.1);
    background: rgba(0, 255, 159, 0.05);
    transform: translateY(-10px);
}

.portal-card.portal-beta {
    border-color: var(--beta-primary);
    box-shadow: 0 0 20px rgba(255, 184, 0, 0.2);
}

.portal-card.portal-beta:hover {
    box-shadow: 0 0 40px rgba(255, 184, 0, 0.4),
                inset 0 0 20px rgba(255, 184, 0, 0.1);
    background: rgba(255, 184, 0, 0.05);
    transform: translateY(-10px);
}

.portal-card-content {
    position: relative;
    z-index: 2;
}

.portal-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: inline-block;
    animation: floatIcon 3s ease-in-out infinite;
}

@keyframes floatIcon {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.portal-card h2 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
}

.portal-role {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.portal-card.portal-alpha .portal-role {
    color: var(--alpha-primary);
}

.portal-card.portal-beta .portal-role {
    color: var(--beta-primary);
}

.portal-subtitle-card {
    font-size: 0.9rem;
    color: #94a3b8;
    margin-bottom: 2rem;
}

/* Features */
.portal-features {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2rem;
}

.feature-tag {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    border: 1px solid;
}

.portal-card.portal-alpha .feature-tag {
    border-color: var(--alpha-primary);
    color: var(--alpha-primary);
    background: rgba(0, 255, 159, 0.1);
}

.portal-card.portal-beta .feature-tag {
    border-color: var(--beta-primary);
    color: var(--beta-primary);
    background: rgba(255, 184, 0, 0.1);
}

/* Buttons */
.portal-button {
    display: inline-block;
    padding: 1rem 2.5rem;
    border: 2px solid;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    background: transparent;
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;
}

.portal-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: left 0.3s ease;
    z-index: -1;
}

.alpha-button {
    border-color: var(--alpha-primary);
    color: var(--alpha-primary);
}

.alpha-button::before {
    background: var(--alpha-primary);
}

.alpha-button:hover {
    color: var(--alpha-background);
    box-shadow: 0 0 20px var(--alpha-primary);
}

.beta-button {
    border-color: var(--beta-primary);
    color: var(--beta-primary);
}

.beta-button::before {
    background: var(--beta-primary);
}

.beta-button:hover {
    color: var(--beta-background);
    box-shadow: 0 0 20px var(--beta-primary);
}

.button-arrow {
    display: inline-block;
    margin-left: 0.5rem;
    animation: arrowMove 0.6s ease-in-out infinite;
}

@keyframes arrowMove {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
}

/* Footer */
.portal-footer {
    margin-top: 3rem;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out 0.7s forwards;
}

.portal-indicator {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
}

.indicator-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
}

.alpha-dot {
    background: var(--alpha-primary);
}

.beta-dot {
    background: var(--beta-primary);
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 1; }
}

/* Animaciones*/
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .portal-choices {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .portal-title {
        font-size: 2.5rem;
    }

    .portal-card {
        padding: 2rem;
    }
}
```

**Agregar a `index.html` después de `themes.css`:**

```html
<link rel="stylesheet" href="css/portal.css">
```

**✅ Validación:** Portal aparece con estilos

---

## Paso 3.3: Crear JavaScript del Portal

**Tiempo:** 2 horas  
**Archivo:** `js/portal-selector.js`

```javascript
/**
 * PORTAL SELECTOR
 * Lógica para seleccionar y transicionar entre realidades
 */

class PortalSelector {
    constructor() {
        this.selectedPortal = null;
        this.isTransitioning = false;
        this.portalElement = document.getElementById('portal-selector');
        this.init();
    }

    init() {
        if (!this.portalElement) {
            console.error('Portal selector element not found');
            return;
        }

        this.setupEventListeners();
        this.drawBackgroundAnimation();
    }

    /**
     * Setup event listeners para buttons
     */
    setupEventListeners() {
        document.querySelectorAll('.portal-card').forEach(card => {
            card.addEventListener('click', () => {
                const portal = card.dataset.portal;
                this.selectPortal(portal);
            });

            // Hover effects
            card.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    /**
     * Animar fondo del portal (Canvas)
     */
    drawBackgroundAnimation() {
        const canvas = document.getElementById('portal-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Adjust canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let time = 0;
        const animate = () => {
            time += 0.01;

            // Clear
            ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw subtle moving lines
            ctx.strokeStyle = 'rgba(0, 255, 159, 0.1)';
            ctx.lineWidth = 1;

            for (let i = 0; i < 5; i++) {
                const y = (time * 20 + i * 80) % canvas.height;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            requestAnimationFrame(animate);
        };

        animate();
    }

    /**
     * Seleccionar un portal
     */
    async selectPortal(portalName) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.selectedPortal = portalName;

        // Cambiar tema
        await themeManager.switchTheme(portalName);

        // Animar transición
        this.animatePortalWarp(portalName);

        // Cargar escena después de la animación
        setTimeout(() => {
            this.hidePortal();
            this.loadRealityScene(portalName);
        }, 1500);
    }

    /**
     * Animar "warping" al portal
     */
    animatePortalWarp(portalName) {
        const card = document.querySelector(`[data-portal="${portalName}"]`);
        
        if (typeof gsap !== 'undefined') {
            gsap.timeline()
                .to(card, {
                    scale: 1.2,
                    filter: 'brightness(1.5)',
                    duration: 0.3
                })
                .to(this.portalElement, {
                    opacity: 0,
                    backdropFilter: 'blur(10px)',
                    duration: 0.8
                }, '+=0.3');
        } else {
            this.portalElement.style.opacity = '0';
        }
    }

    /**
     * Ocultar portal selector
     */
    hidePortal() {
        this.portalElement.classList.add('hidden');
        this.portalElement.style.pointerEvents = 'none';
    }

    /**
     * Mostrar portal selector de nuevo
     */
    showPortal() {
        this.portalElement.classList.remove('hidden');
        this.portalElement.style.pointerEvents = 'auto';
        this.portalElement.style.opacity = '1';
        this.isTransitioning = false;
    }

    /**
     * Cargar escena de realidad
     */
    loadRealityScene(portalName) {
        const loadingScreen = this.createLoadingScreen(portalName);
        document.body.appendChild(loadingScreen);

        // Simular carga
        setTimeout(() => {
            this.hideLoadingScreen(loadingScreen);
            // Aquí se cargaría el contenido real
            console.log(`Realidad ${portalName} cargada`);
        }, 2500);
    }

    /**
     * Crear loading screen
     */
    createLoadingScreen(portalName) {
        const screen = document.createElement('div');
        screen.className = `loading-screen loading-${portalName}`;
        screen.innerHTML = `
            <div class="loading-content">
                <div class="loading-text">
                    <p class="loading-title">Inicializando ${PORTFOLIO_CONFIG.themes[portalName].name}</p>
                </div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <div class="loading-percentage">
                    <span class="percentage-number">0</span>%
                </div>
            </div>
        `;

        // Animar barra
        if (typeof gsap !== 'undefined') {
            gsap.to(screen.querySelector('.loading-progress'), {
                width: '100%',
                duration: 2.3,
                ease: 'power2.inOut'
            });

            gsap.to(screen.querySelector('.percentage-number'), {
                textContent: 100,
                duration: 2.3,
                snap: { textContent: 1 },
                ease: 'power2.inOut'
            });
        }

        return screen;
    }

    /**
     * Ocultar loading screen
     */
    hideLoadingScreen(screen) {
        if (typeof gsap !== 'undefined') {
            gsap.to(screen, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    screen.remove();
                }
            });
        } else {
            screen.remove();
        }
    }
}

// Instanciar cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.portalSelector = new PortalSelector();
});
```

**Agregar a `index.html` antes de `</body>`:**

```html
<script src="js/theme-manager.js"></script>
<script src="js/portal-selector.js"></script>
```

**✅ Validación:** 
- Click en botón cambia tema y oculta portal
- Loading screen aparece
- Consola muestra mensajes

---

---

# ⚡ FASE 4: ANIMACIONES CORE CON GSAP (2 semanas)

## Paso 4.1: Setup GSAP y plugins

Ya está incluido en CDN en `index.html`. Crear archivo de helpers:

**Tiempo:** 1 hora  
**Archivo:** `js/animation-helpers.js`

```javascript
/**
 * ANIMATION HELPERS
 * Funciones reutilizables para GSAP
 */

// Registrar plugins
gsap.registerPlugin(ScrollTrigger);

class AnimationHelpers {
    /**
     * Animar entrada de elemento
     */
    static fadeInUp(element, delay = 0) {
        return gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
            delay
        });
    }

    /**
     * Animar salida de elemento
     */
    static fadeOutDown(element, delay = 0) {
        return gsap.to(element, {
            opacity: 0,
            y: -30,
            duration: 0.6,
            ease: 'power2.in',
            delay
        });
    }

    /**
     * Efecto glitch en texto
     */
    static glitchText(element, duration = 0.4) {
        return gsap.to(element, {
            x: () => gsap.utils.random(-2, 2),
            y: () => gsap.utils.random(-2, 2),
            duration: 0.05,
            repeat: duration / 0.05,
            yoyo: true
        });
    }

    /**
     * Efecto glow en elemento
     */
    static glowEffect(element, color = '#00FF9F', duration = 2) {
        return gsap.to(element, {
            boxShadow: [
                `0 0 10px ${color}`,
                `0 0 20px ${color}`,
                `0 0 10px ${color}`
            ],
            duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    /**
     * Animar números (contador)
     */
    static animateCounter(element, target, duration = 2) {
        const obj = { value: 0 };
        
        gsap.to(obj, {
            value: target,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
                element.textContent = Math.floor(obj.value);
            }
        });
    }

    /**
     * Efecto hover lift (3D)
     */
    static hoverLift(element) {
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                y: -10,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                y: 0,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    /**
     * Scroll trigger básico
     */
    static scrollReveal(selector) {
        gsap.utils.toArray(selector).forEach(element => {
            gsap.from(element, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                    once: false
                }
            });
        });
    }

    /**
     * Animar altura de barra de progreso
     */
    static animateProgressBar(element, target, duration = 1) {
        return gsap.to(element, {
            width: `${target}%`,
            duration,
            ease: 'power2.inOut'
        });
    }

    /**
     * Timeline coordinada de múltiples elementos
     */
    static staggerFadeIn(elements, delay = 0) {
        const tl = gsap.timeline();
        
        gsap.utils.toArray(elements).forEach((element, index) => {
            tl.from(element, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: 'power2.out'
            }, delay + index * 0.1);
        });

        return tl;
    }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationHelpers;
}
```

**Agregar a `index.html`:**

```html
<script src="js/animation-helpers.js"></script>
```

**✅ Validación:** En Console: `AnimationHelpers.fadeInUp(document.body)` debe animar

---

## Paso 4.2: CSS para animaciones GSAP

**Tiempo:** 1 hora  
**Archivo:** `css/animations.css` (nuevo)

```css
/* ============================================
   ANIMACIONES Y EFECTOS VISUALES
   ============================================ */

/* ============================================
   KEYFRAMES BASE
   ============================================ */

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes glow {
    0%, 100% { text-shadow: 0 0 10px currentColor; }
    50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* ============================================
   EFECTO GLITCH AVANZADO
   ============================================ */

.glitch-text {
    position: relative;
}

.glitch-text::before,
.glitch-text::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.glitch-text::before {
    animation: glitch-before 0.3s infinite;
    color: #FF0055;
    z-index: -1;
}

.glitch-text::after {
    animation: glitch-after 0.3s infinite;
    color: #00FFFF;
    z-index: -2;
}

@keyframes glitch-before {
    0% { 
        clip-path: inset(0 0 65% 0);
        transform: translate(-2px, -2px);
    }
    20% { 
        clip-path: inset(10% 0 50% 0);
        transform: translate(2px, 2px);
    }
    40% { 
        clip-path: inset(40% 0 10% 0);
        transform: translate(-2px, 2px);
    }
    60% { 
        clip-path: inset(60% 0 20% 0);
        transform: translate(2px, -2px);
    }
    80% { 
        clip-path: inset(80% 0 0% 0);
        transform: translate(-2px, -2px);
    }
    100% { 
        clip-path: inset(0 0 65% 0);
        transform: translate(0, 0);
    }
}

@keyframes glitch-after {
    0% { 
        clip-path: inset(35% 0 0% 0);
        transform: translate(2px, 2px);
    }
    20% { 
        clip-path: inset(50% 0 10% 0);
        transform: translate(-2px, -2px);
    }
    40% { 
        clip-path: inset(10% 0 40% 0);
        transform: translate(2px, -2px);
    }
    60% { 
        clip-path: inset(20% 0 60% 0);
        transform: translate(-2px, 2px);
    }
    80% { 
        clip-path: inset(0% 0 80% 0);
        transform: translate(2px, 2px);
    }
    100% { 
        clip-path: inset(35% 0 0% 0);
        transform: translate(0, 0);
    }
}

/* ============================================
   EFECTO CÓDIGO FLUYENTE
   ============================================ */

.code-matrix {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.8;
}

.code-line {
    animation: typingLine 0.5s ease-out forwards;
    opacity: 0;
}

@keyframes typingLine {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* ============================================
   LOADING SCREEN
   ============================================ */

.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(5px);
}

.loading-screen.loading-alpha {
    background: linear-gradient(135deg, rgba(10, 14, 39, 0.95), rgba(0, 102, 255, 0.1));
}

.loading-screen.loading-beta {
    background: linear-gradient(135deg, rgba(13, 27, 42, 0.95), rgba(255, 184, 0, 0.1));
}

.loading-content {
    text-align: center;
    z-index: 2;
}

.loading-title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 600;
}

.loading-bar {
    width: 300px;
    height: 3px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.loading-progress {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    width: 0%;
}

.loading-percentage {
    font-size: 1rem;
    font-weight: 600;
}

/* ============================================
   EFECTOS DE HOVER
   ============================================ */

.hover-lift {
    transition: all var(--transition-base);
}

.hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.hover-glow {
    transition: all var(--transition-base);
}

[data-theme="alpha"] .hover-glow:hover {
    text-shadow: 0 0 20px var(--alpha-primary);
    color: var(--alpha-primary);
}

[data-theme="beta"] .hover-glow:hover {
    text-shadow: 0 0 20px var(--beta-primary);
    color: var(--beta-primary);
}

/* ============================================
   SCROLL REVEAL
   ============================================ */

.scroll-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out;
}

.scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
}
```

**Agregar a `index.html`:**

```html
<link rel="stylesheet" href="css/animations.css">
```

---

---

# 🎨 FASE 5: REALIDAD ALPHA - DEV TRACK (3 semanas)

*(Por brevedad, compilar las secciones principales. El archivo es muy largo)*

## Paso 5.1: Crear archivo `js/alpha-scene.js`

**Estructura recomendada:**

```javascript
class AlphaRealityScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.init();
    }

    init() {
        // Three.js scene setup
        this.setupThreeScene();
        
        // Hero section
        this.createHeroSection();
        
        // Stack Tower
        this.createStackTower();
        
        // Projects grid
        this.createProjectsGrid();
        
        // Scroll animations
        this.setupScrollAnimations();
    }

    setupThreeScene() {
        // Canvas setup
        // Scene, Camera, Renderer setup
        // Lighting setup
        // Animation loop
    }

    createHeroSection() {
        // Code matrix animation
        // Título con glow
    }

    createStackTower() {
        // Three.js cubes rotantes
        // Interactividad con mouse
    }

    createProjectsGrid() {
        // Grid de proyectos
        // Hover effects
        // Glitch text
    }

    setupScrollAnimations() {
        // Scroll triggers
        // Reveal animations
    }
}
```

*Ver archivo `arquitectura_tecnica_portafolio.js` recibido para implementación completa*

---

---

# 📊 FASE 6: REALIDAD BETA - DATA TRACK (3 semanas)

## Paso 6.1: Crear archivo `js/beta-scene.js`

**Estructura:**

```javascript
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

    createHeroSection() {
        // Hero con datos animados
        // Contadores
    }

    createSkillsConstellation() {
        // Gráfico de burbujas Canvas
        // Interactividad
    }

    createAnalyticsDashboard() {
        // KPI cards
        // Charts con Chart.js
    }

    setupDataVisualizations() {
        // D3.js o Plotly
    }
}
```

*Ver archivo `arquitectura_tecnica_portafolio.js` recibido para implementación completa*

---

---

# 🚀 FASE 7: OPTIMIZACIÓN (1.5 semanas)

## Paso 7.1: Optimizar imágenes

```bash
# Crear script optimize-images.js
npm install --save-dev imagemin imagemin-webp imagemin-mozjpeg

# Ejecutar
npm run optimize-images
```

## Paso 7.2: Lighthouse testing

```bash
npm install -g @lhci/cli

lighthouse http://localhost:8000 --output=html
```

**Target:** Score > 90 en todas las métricas

---

---

# 🌐 FASE 8: DEPLOYMENT (1 semana)

## Paso 8.1: GitHub Pages (Gratis)

```bash
# Renombrar repo a MikeBoss80.github.io
# Push código
# Listo en https://MikeBoss80.github.io
```

## Paso 8.2: Netlify (Opcional)

```bash
# Conectar repo
# Drag & drop build folder
# Automático
```

## Paso 8.3: Backend PHP

```bash
# Subir api/send-contact.php a tu servidor
# Configurar email
# Testear formulario
```

---

---

# ✅ CHECKLIST FINAL

### Semana 1-2
- [ ] Estructura de carpetas
- [ ] HTML base + Meta tags
- [ ] CSS variables globales
- [ ] Configuración inicial

### Semana 3-4
- [ ] Theme Manager funcional
- [ ] Portal Selector completo
- [ ] GSAP setup
- [ ] Animaciones base

### Semana 5-6
- [ ] Alpha Scene (3D + Animaciones)
- [ ] Projects Grid
- [ ] Code animations
- [ ] Scroll triggers

### Semana 7-8
- [ ] Beta Scene (Data)
- [ ] Charts y gráficos
- [ ] Dashboard
- [ ] Interactividad

### Semana 9
- [ ] Optimización Lighthouse
- [ ] Testing cross-browser
- [ ] Backend PHP
- [ ] Deploy en producción

---

**¿Preguntas en algún paso? Avísame.** 🚀
