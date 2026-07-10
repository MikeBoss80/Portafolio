# Plan de Sprints — Portafolio Miguel Bolívar

## Estado actual: ✅ COMPLETO

## Stack técnico final
- **Bundler**: Vite 8 (Rolldown)
- **JavaScript**: ES Modules nativos, npm packages `three`, `gsap`
- **CSS**: Variables nativas (`styles/tokens.css`), `css/styles.css` (componentes)
- **Formulario**: Web3Forms API
- **WhatsApp**: `wa.me/573207685504`
- **Email**: `mailto:miguel.bolivar3000@gmail.com`
- **Animaciones**: GSAP + ScrollTrigger + IntersectionObserver
- **3D**: Three.js via dynamic import (code-split)
- **Deploy**: `dist/` estático vía GitHub Pages

---

## Sprint 1 — Fundación
- [x] Vite inicializado, `npm run dev`/`build` funcional
- [x] Estructura `src/` creada (data/, services/, components/, effects/, utils/)
- [x] Datos extraídos a 7 archivos en `src/data/`
- [x] Tokens CSS unificados en `styles/tokens.css`
- [x] Servicios: ThemeService, ScrollService

## Sprint 2 — Componentes núcleo
- [x] Navbar.js (scroll spy, hamburguesa, tema)
- [x] Hero.js (typewriter, datos de perfil)
- [x] About.js (stats animados)
- [x] Experience.js (timeline)

## Sprint 3 — Componentes interactivos
- [x] Carousel3D.js (proyectos 3D)
- [x] FolioStack.js (acordeón formación)
- [x] Languages.js (tarjetas idiomas)
- [x] Terminal/ (+ SQLEngine) (terminal interactiva)

## Sprint 4 — Contacto + limpieza
- [x] Contact.js (Web3Forms + WhatsApp + Email)
- [x] BackToTop.js
- [x] NotificationService.js (toasts)
- [x] Código muerto eliminado de script.js
- [x] Web3Forms key configurada

## Sprint 5 — Efectos + Eliminar AOS
- [x] ThreeScene.js (+ dynamic import three.js)
- [x] CursorFX.js (cursor personalizado)
- [x] SVGScene.js (efectos scroll SVG)
- [x] GSAPAnimations.js (migrado de gsap-animations.js)
- [x] ScrollReveal.js (reemplaza AOS con IntersectionObserver)
- [x] Loader.js
- [x] AOS removido (CDN + init)
- [x] Legacy scripts removidos (CDN three.js, gsap, etc.)
- [x] 6 archivos JS legacy eliminados

## Sprint 6 — CSS + SEO + Lazy Loading
- [x] Variables CSS duplicadas removidas de styles.css
- [x] Meta tags SEO (OG, Twitter, canonical, keywords, author)
- [x] `loading="lazy"` en imágenes
- [x] Code-split de three.js (chunk separado)

## Sprint 7 — Build final + Deploy
- [x] Build de producción exitoso
- [x] `dist/` genera 3 chunks (CSS, JS, three.js)
- [ ] Configurar deploy (GitHub Actions o manual)

---

## Estructura final
```
src/
├── data/           (7 archivos: profile, social, experience, courses, projects, skills, languages)
├── services/       (ThemeService, ScrollService, NotificationService)
├── components/     (Navbar, Hero, About, Experience, Carousel3D, FolioStack, Languages, Terminal/, Contact, BackToTop, Loader)
├── effects/        (ThreeScene, CursorFX, SVGScene, GSAPAnimations, ScrollReveal)
├── utils/          (config, constants)
└── main.js         (entry point)
styles/
├── tokens.css      (CSS variables unificadas)
css/
└── styles.css      (component styles)
assets/
└── terminal-habilidades/terminal.css   (terminal styles)
```

## Build output
- `index.html` — 34 KB
- `index-B7xTg_8h.css` — 40 KB (gzip: 8 KB)
- `index-BmsG3JGM.js` — 170 KB (gzip: 62 KB)
- `three.module-DZlTWqWi.js` — 724 KB (gzip: 184 KB)
