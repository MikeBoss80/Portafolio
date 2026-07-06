// ==============================================
// CUSTOM CURSOR - VERSIÓN RÁPIDA Y LIVIANA
// ==============================================
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorGlow = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.isHovering = false;
        this.speed = 0.15; // ← Velocidad de seguimiento (0.1 = lento, 0.3 = rápido)
        
        this.init();
    }

    init() {
        // Solo crear en desktop
        if ('ontouchstart' in window) return;
        
        this.createCursor();
        this.setupEvents();
        this.animate();
    }

    createCursor() {
        // ===== CURSOR PRINCIPAL (más pequeño y rápido) =====
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        Object.assign(this.cursor.style, {
            position: 'fixed',
            width: '16px',              // ← Más pequeño
            height: '16px',
            border: '2px solid #004687',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease', // ← Solo transiciones necesarias
            willChange: 'transform'      // ← Optimiza rendimiento
        });

        // ===== GLOW (más pequeño y sin transiciones pesadas) =====
        this.cursorGlow = document.createElement('div');
        this.cursorGlow.className = 'custom-cursor-glow';
        Object.assign(this.cursorGlow.style, {
            position: 'fixed',
            width: '40px',               // ← Más pequeño
            height: '40px',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9998',
            background: 'radial-gradient(circle, rgba(0,70,135,0.12) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            opacity: '0.5',
            willChange: 'transform'      // ← Optimiza rendimiento
        });

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorGlow);
        document.body.style.cursor = 'none';
    }

    setupEvents() {
        // ===== Evento de mouse (solo actualiza coordenadas) =====
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // ===== Eventos hover (sin animaciones pesadas) =====
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .project-card, .social-link, .filter-btn'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.isHovering = true;
                // Cambios rápidos sin transiciones pesadas
                this.cursor.style.width = '32px';
                this.cursor.style.height = '32px';
                this.cursor.style.borderColor = '#0066CC';
                this.cursor.style.backgroundColor = 'rgba(0,70,135,0.08)';
                
                this.cursorGlow.style.width = '60px';
                this.cursorGlow.style.height = '60px';
                this.cursorGlow.style.background = 'radial-gradient(circle, rgba(0,70,135,0.2) 0%, transparent 70%)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.isHovering = false;
                this.cursor.style.width = '16px';
                this.cursor.style.height = '16px';
                this.cursor.style.borderColor = '#004687';
                this.cursor.style.backgroundColor = 'transparent';
                
                this.cursorGlow.style.width = '40px';
                this.cursorGlow.style.height = '40px';
                this.cursorGlow.style.background = 'radial-gradient(circle, rgba(0,70,135,0.12) 0%, transparent 70%)';
            });
        });

        // ===== Click effect (sin transiciones pesadas) =====
        document.addEventListener('mousedown', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // ===== Ocultar al salir de la página =====
        document.addEventListener('mouseleave', () => {
            this.cursor.style.display = 'none';
            this.cursorGlow.style.display = 'none';
        });
        
        document.addEventListener('mouseenter', () => {
            this.cursor.style.display = 'block';
            this.cursorGlow.style.display = 'block';
        });
    }

    // ===== ANIMACIÓN CON REQUESTANIMATIONFRAME (más suave) =====
    animate() {
        // Calcular posición con interpolación suave
        this.cursorX += (this.mouseX - this.cursorX) * this.speed;
        this.cursorY += (this.mouseY - this.cursorY) * this.speed;

        // Aplicar posición (usando transform para mejor rendimiento)
        this.cursor.style.transform = `translate(${this.cursorX - 8}px, ${this.cursorY - 8}px)`;
        this.cursorGlow.style.transform = `translate(${this.cursorX - 20}px, ${this.cursorY - 20}px)`;

        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    if (!('ontouchstart' in window)) {
        const customCursor = new CustomCursor();
    }
});
