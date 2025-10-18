# 🚀 Portafolio Profesional de Desarrollador

Un portafolio moderno y completamente responsivo construido con las mejores prácticas de desarrollo web.

## ✨ Características

### 🎨 Diseño y UX
- **Diseño Responsivo**: Optimizado para todos los dispositivos (mobile-first)
- **Modo Oscuro/Claro**: Cambio de tema con persistencia en localStorage
- **Animaciones Suaves**: Transiciones CSS3 y animaciones con AOS
- **Tipografía Moderna**: Google Fonts (Inter + JetBrains Mono)
- **Gradientes Modernos**: Paleta de colores profesional

### 🔧 Funcionalidades
- **Navegación Intuitiva**: Menú sticky con highlight de sección activa
- **Smooth Scrolling**: Navegación suave entre secciones
- **Filtrado de Proyectos**: Sistema de filtros por categoría
- **Formulario de Contacto**: Validación en tiempo real y notificaciones
- **Barras de Progreso**: Animación de skills al hacer scroll
- **Contadores Dinámicos**: Estadísticas animadas
- **Botón Back to Top**: Con animación de aparición

### 🎯 Secciones
1. **Hero**: Presentación principal con elementos flotantes animados
2. **Sobre Mí**: Información personal con estadísticas
3. **Habilidades**: Categorías organizadas con barras de progreso
4. **Proyectos**: Galería filtrable con overlays interactivos
5. **Contacto**: Formulario funcional con validación

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **HTML5**: Estructura semántica y accesibilidad
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Clases, async/await, módulos

### Librerías y Frameworks
- **AOS (Animate On Scroll)**: Animaciones basadas en scroll
- **Font Awesome**: Iconografía profesional
- **Google Fonts**: Tipografía web optimizada

### Características Técnicas
- **CSS Custom Properties**: Sistema de variables para theming
- **Intersection Observer API**: Detección de elementos en viewport
- **Local Storage**: Persistencia de preferencias de usuario
- **Debounce/Throttle**: Optimización de performance
- **Progressive Enhancement**: Funcionalidad gradual

## 📁 Estructura del Proyecto

```
Portafolio/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principales con variables CSS
├── js/
│   └── script.js           # JavaScript modular y optimizado
├── assets/
│   ├── images/
│   │   ├── hero-avatar.svg # Avatar principal (SVG optimizado)
│   │   ├── about-image.jpg # Imagen de la sección "Sobre Mí"
│   │   └── projects/       # Imágenes de proyectos
│   │       ├── project-1.jpg
│   │       ├── project-2.jpg
│   │       ├── project-3.jpg
│   │       └── project-4.jpg
│   └── cv/
│       └── mi-cv.pdf       # CV para descarga
└── README.md               # Documentación
```

## 🚀 Instalación y Uso

### Opción 1: Servidor Local Simple
```bash
# Navegar al directorio del proyecto
cd /path/to/Portafolio

# Iniciar servidor local con Python
python -m http.server 8000

# O con Node.js (si tienes http-server instalado)
npx http-server -p 8000

# Abrir en el navegador
# http://localhost:8000
```

### Opción 2: XAMPP (Recomendado para este proyecto)
1. Copiar la carpeta `Portafolio` a `C:\xampp\htdocs\`
2. Iniciar Apache desde el panel de XAMPP
3. Abrir `http://localhost/Portafolio` en el navegador

### Opción 3: Live Server (VS Code)
1. Instalar la extensión "Live Server" en VS Code
2. Abrir el proyecto en VS Code
3. Click derecho en `index.html` → "Open with Live Server"

## ⚙️ Personalización

### 🎨 Colores y Tema
Editar las variables CSS en `css/styles.css`:
```css
:root {
    --primary-color: #667eea;    /* Color principal */
    --secondary-color: #f093fb;  /* Color secundario */
    --accent-color: #4facfe;     /* Color de acento */
    /* ... más variables */
}
```

### 📝 Contenido Personal
1. **Información Personal**: Editar textos en `index.html`
2. **Proyectos**: Reemplazar imágenes en `assets/images/projects/`
3. **CV**: Añadir tu CV en `assets/cv/mi-cv.pdf`
4. **Avatar**: Reemplazar `assets/images/hero-avatar.svg`

### 🔧 Funcionalidades
- **Formulario de Contacto**: Actualizar el endpoint en `js/script.js`
- **Redes Sociales**: Modificar enlaces en la sección de contacto
- **Analytics**: Añadir Google Analytics o similar

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Características Responsivas
- Grid layouts adaptativos
- Menú hamburguesa en mobile
- Imágenes optimizadas por dispositivo
- Touch-friendly interactions

## ♿ Accesibilidad

### Características Incluidas
- **Semantic HTML**: Estructura semántica completa
- **ARIA Labels**: Etiquetas para lectores de pantalla
- **Keyboard Navigation**: Navegación completa por teclado
- **Focus Indicators**: Indicadores de foco visibles
- **Color Contrast**: Cumple con WCAG 2.1 AA
- **Reduced Motion**: Respeta preferencias de animación

## 🎯 Performance

### Optimizaciones Implementadas
- **Lazy Loading**: Carga diferida de contenido
- **Throttling/Debouncing**: Optimización de eventos
- **CSS Minification**: Código optimizado
- **Image Optimization**: SVGs y formatos optimizados
- **Critical CSS**: Estilos críticos inline

### Métricas Objetivo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔧 Desarrollo y Mantenimiento

### Scripts Útiles
```bash
# Validar HTML
npx html-validate index.html

# Analizar CSS
npx csslint css/styles.css

# Verificar JavaScript
npx eslint js/script.js

# Optimizar imágenes
npx imagemin assets/images/* --out-dir=assets/images/optimized
```

### Testing
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility**: WAVE, axe-core, Lighthouse

## 📈 SEO y Meta Tags

### Incluidos
- Meta description optimizada
- Open Graph tags para redes sociales
- Twitter Card meta tags
- Structured data (JSON-LD)
- Sitemap.xml (a añadir)
- Robots.txt (a añadir)

## 🚀 Deployment

### Opciones de Hosting
1. **Netlify**: Deploy automático desde Git
2. **Vercel**: Optimizado para sitios estáticos
3. **GitHub Pages**: Hosting gratuito desde repositorio
4. **Firebase Hosting**: Google Cloud Platform

### Configuración de Dominio
1. Registrar dominio personalizado
2. Configurar DNS records
3. Habilitar HTTPS
4. Configurar CDN (opcional)

## 🤝 Contribuciones

### Para Desarrolladores
Si quieres contribuir a mejorar este portafolio:
1. Fork del repositorio
2. Crear branch para tu feature
3. Commit con mensajes descriptivos
4. Pull request con descripción detallada

### Reportar Issues
- Bugs encontrados
- Sugerencias de mejora
- Problemas de rendimiento
- Incompatibilidades de navegador

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Créditos

### Recursos Utilizados
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía (Inter, JetBrains Mono)
- **AOS Library**: Animaciones de scroll
- **Unsplash**: Inspiración para imágenes (placeholders incluidos)

### Inspiración
- Diseños modernos de Dribbble
- Portfolios de desarrolladores destacados
- Guías de UI/UX contemporáneas

---

**¿Necesitas ayuda?** Abre un issue o contacta al desarrollador.

**¿Te gustó el proyecto?** ⭐ ¡Dale una estrella en GitHub!

---

*Hecho con ❤️ y mucho ☕ para la comunidad de desarrolladores*