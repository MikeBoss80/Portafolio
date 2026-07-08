// ==============================================
// CUSTOM CURSOR - CON FALLBACK Y DEBUG
// ==============================================
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorGlow = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isVisible = true;
        
        // No ejecutar en móvil
        if ('ontouchstart' in window || window.innerWidth < 768) {
            console.log('Cursor desactivado en móvil');
            return;
        }
        
        this.init();
    }

    init() {
        console.log('Inicializando cursor personalizado...');
        
        // ===== CREAR CURSOR =====
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        Object.assign(this.cursor.style, {
            position: 'fixed',
            width: '20px',
            height: '20px',
            border: '2px solid #004687',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '99999',              // ← Z-index muy alto
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
            willChange: 'transform',
            backgroundColor: 'rgba(0,70,135,0.1)',
            boxShadow: '0 0 10px rgba(0,70,135,0.2)'
        });

        // ===== GLOW =====
        this.cursorGlow = document.createElement('div');
        this.cursorGlow.className = 'custom-cursor-glow';
        Object.assign(this.cursorGlow.style, {
            position: 'fixed',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '99998',
            background: 'radial-gradient(circle, rgba(0,70,135,0.15) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform'
        });

        // Agregar al DOM
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorGlow);
        
        // Ocultar cursor nativo
        document.body.style.cursor = 'none';
        
        console.log('Cursor creado correctamente');

        // ===== EVENTOS =====
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateCursorPosition();
        });

        // Hover effects
        document.querySelectorAll('a, button, .btn, .carousel-3d-card, .social-link, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => this.onHover());
            el.addEventListener('mouseleave', () => this.onLeave());
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            if (this.cursor) {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
            }
        });
        document.addEventListener('mouseup', () => {
            if (this.cursor) {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });

        // Ocultar al salir
        document.addEventListener('mouseleave', () => {
            this.cursor.style.display = 'none';
            this.cursorGlow.style.display = 'none';
        });
        document.addEventListener('mouseenter', () => {
            this.cursor.style.display = 'block';
            this.cursorGlow.style.display = 'block';
        });

        // ===== RE-EVALUAR EN RESIZE =====
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                if (this.cursor) this.cursor.style.display = 'none';
                if (this.cursorGlow) this.cursorGlow.style.display = 'none';
                document.body.style.cursor = 'auto';
            }
        });
    }

    updateCursorPosition() {
        if (this.cursor) {
            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';
        }
        if (this.cursorGlow) {
            this.cursorGlow.style.left = this.mouseX + 'px';
            this.cursorGlow.style.top = this.mouseY + 'px';
        }
    }

    onHover() {
        if (this.cursor) {
            this.cursor.style.width = '40px';
            this.cursor.style.height = '40px';
            this.cursor.style.borderColor = '#0066CC';
            this.cursor.style.backgroundColor = 'rgba(0,70,135,0.2)';
            this.cursor.style.boxShadow = '0 0 20px rgba(0,70,135,0.4)';
        }
        if (this.cursorGlow) {
            this.cursorGlow.style.width = '80px';
            this.cursorGlow.style.height = '80px';
            this.cursorGlow.style.background = 'radial-gradient(circle, rgba(0,70,135,0.25) 0%, transparent 70%)';
        }
    }

    onLeave() {
        if (this.cursor) {
            this.cursor.style.width = '20px';
            this.cursor.style.height = '20px';
            this.cursor.style.borderColor = '#004687';
            this.cursor.style.backgroundColor = 'rgba(0,70,135,0.1)';
            this.cursor.style.boxShadow = '0 0 10px rgba(0,70,135,0.2)';
        }
        if (this.cursorGlow) {
            this.cursorGlow.style.width = '60px';
            this.cursorGlow.style.height = '60px';
            this.cursorGlow.style.background = 'radial-gradient(circle, rgba(0,70,135,0.15) 0%, transparent 70%)';
        }
    }

}

// ==============================================
// INICIALIZAR CON DEBUG
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando cursor...');
    
    // Pequeño delay para asegurar que el DOM está listo
    setTimeout(() => {
        try {
            if (!('ontouchstart' in window) && window.innerWidth >= 768) {
                const cursor = new CustomCursor();
                console.log('Cursor iniciado:', cursor);
            } else {
                console.log('Cursor desactivado (móvil o touch)');
            }
        } catch (error) {
            console.error('Error al iniciar cursor:', error);
        }
    }, 500);
});

// ===== FALLBACK: Si el cursor no se ve después de 2s =====
setTimeout(() => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor || cursor.style.display === 'none') {
        console.warn('Cursor no visible, restaurando cursor nativo');
        document.body.style.cursor = 'auto';
    }
}, 2000);
