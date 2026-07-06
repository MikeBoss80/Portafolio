// ==============================================
// CUSTOM 3D CURSOR
// ==============================================
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorGlow = null;
        this.cursorText = null;
        this.isHovering = false;
        
        this.init();
    }

    init() {
        // Create cursor elements
        this.createCursor();
        this.setupEvents();
    }

    createCursor() {
        // Main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #004687;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.15s ease;
            transform: translate(-50%, -50%);
            mix-blend-mode: difference;
        `;

        // Glow effect
        this.cursorGlow = document.createElement('div');
        this.cursorGlow.className = 'custom-cursor-glow';
        this.cursorGlow.style.cssText = `
            position: fixed;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            background: radial-gradient(circle, rgba(0,70,135,0.15) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
        `;

        // Text label (optional)
        this.cursorText = document.createElement('div');
        this.cursorText.className = 'custom-cursor-text';
        this.cursorText.style.cssText = `
            position: fixed;
            color: white;
            font-size: 12px;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s ease;
            font-weight: 500;
            text-shadow: 0 0 10px rgba(0,0,0,0.5);
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorGlow);
        document.body.appendChild(this.cursorText);

        // Hide default cursor
        document.body.style.cursor = 'none';
    }

    setupEvents() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.updateCursor(e.clientX, e.clientY);
        });

        // Mouse over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .social-link, .filter-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.onHoverStart(el));
            el.addEventListener('mouseleave', () => this.onHoverEnd());
        });

        // Mouse down/up for click effect
        document.addEventListener('mousedown', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Mouse leave document
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.cursorGlow.style.opacity = '0';
            this.cursorText.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.cursorGlow.style.opacity = '1';
        });
    }

    updateCursor(x, y) {
        // Update cursor position with slight delay for smoothness
        this.cursor.style.left = x + 'px';
        this.cursor.style.top = y + 'px';

        // Update glow with more delay for trailing effect
        setTimeout(() => {
            this.cursorGlow.style.left = x + 'px';
            this.cursorGlow.style.top = y + 'px';
        }, 50);

        this.cursorText.style.left = x + 'px';
        this.cursorText.style.top = (y - 40) + 'px';
    }

    onHoverStart(el) {
        // Expand cursor
        this.cursor.style.width = '40px';
        this.cursor.style.height = '40px';
        this.cursor.style.borderColor = '#0066CC';
        this.cursor.style.backgroundColor = 'rgba(0,70,135,0.1)';

        // Glow effect
        this.cursorGlow.style.width = '120px';
        this.cursorGlow.style.height = '120px';
        this.cursorGlow.style.background = 'radial-gradient(circle, rgba(0,70,135,0.25) 0%, transparent 70%)';

        // Show text if element has text
        const text = el.textContent.trim();
        if (text && text.length < 20) {
            this.cursorText.textContent = text;
            this.cursorText.style.opacity = '1';
        }

        this.isHovering = true;
    }

    onHoverEnd() {
        // Reset cursor
        this.cursor.style.width = '20px';
        this.cursor.style.height = '20px';
        this.cursor.style.borderColor = '#004687';
        this.cursor.style.backgroundColor = 'transparent';

        this.cursorGlow.style.width = '80px';
        this.cursorGlow.style.height = '80px';
        this.cursorGlow.style.background = 'radial-gradient(circle, rgba(0,70,135,0.15) 0%, transparent 70%)';

        this.cursorText.style.opacity = '0';
        this.isHovering = false;
    }
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = new CustomCursor();
});
