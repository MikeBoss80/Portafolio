/**
 * SNIPPETS LISTOS PARA USAR - Portafolio Miguel Ángel Bolívar
 * Copiar y pegar estos códigos en script.js
 * 
 * Instrucciones de integración marcadas con [INTEGRAR AQUÍ]
 */

// ===================================================
// 1. VALIDACIÓN ROBUSTA DE FORMULARIO
// ===================================================

class FormValidator {
    /**
     * Valida email según RFC 5322 simplificado
     * @param {string} email 
     * @returns {boolean}
     */
    static validateEmail(email) {
        // Expresión regular más robusta
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Validaciones adicionales
        if (!emailRegex.test(email)) return false;
        if (email.length > 254) return false; // Límite RFC
        if (email.includes('..')) return false; // Puntos consecutivos
        
        return true;
    }

    /**
     * Valida mensaje
     * @param {string} message 
     * @returns {object} { valid: boolean, error: string }
     */
    static validateMessage(message) {
        const trimmed = message.trim();
        
        if (trimmed.length === 0) {
            return { valid: false, error: 'El mensaje no puede estar vacío' };
        }
        
        if (trimmed.length < 10) {
            return { valid: false, error: 'El mensaje debe tener al menos 10 caracteres' };
        }
        
        if (trimmed.length > 5000) {
            return { valid: false, error: 'El mensaje no puede exceder 5000 caracteres' };
        }
        
        // Detectar spam
        if (this.isSpam(trimmed)) {
            return { valid: false, error: 'Parece que hay spam en tu mensaje' };
        }
        
        return { valid: true, error: null };
    }

    /**
     * Detecta contenido tipo spam
     * @param {string} text 
     * @returns {boolean}
     */
    static isSpam(text) {
        const spamPatterns = [
            /viagra|cialis|casino|lottery/gi,
            /click here|buy now|visit now/gi,
            /<script|javascript:|onerror=/gi,
            /http[s]?:\/\/.{0,10}\.(top|xyz|download)/gi
        ];
        
        return spamPatterns.some(pattern => pattern.test(text));
    }

    /**
     * Sanitiza HTML para evitar XSS
     * @param {string} text 
     * @returns {string}
     */
    static sanitizeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// [INTEGRAR AQUÍ en setupContactForm()]
/*
setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();

        // Validar email
        if (!FormValidator.validateEmail(email)) {
            this.showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }

        // Validar mensaje
        const msgValidation = FormValidator.validateMessage(message);
        if (!msgValidation.valid) {
            this.showNotification(msgValidation.error, 'error');
            return;
        }

        // Validar subject
        if (subject.length < 3) {
            this.showNotification('El asunto debe tener al menos 3 caracteres', 'error');
            return;
        }

        // Si todo es válido, enviar
        this.submitContactForm(email, subject, message);
    });
}

async submitContactForm(email, subject, message) {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: FormValidator.sanitizeHTML(email),
                subject: FormValidator.sanitizeHTML(subject),
                message: FormValidator.sanitizeHTML(message),
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) throw new Error('Error en servidor');

        this.showNotification('¡Mensaje enviado! Te responderé pronto.', 'success');
        document.getElementById('contact-form').reset();
    } catch (error) {
        console.error('Error:', error);
        this.showNotification('Error al enviar. Intenta más tarde.', 'error');
    }
}
*/

// ===================================================
// 2. LAZY LOADING DE IMÁGENES
// ===================================================

class LazyImageLoader {
    /**
     * Inicializa lazy loading para todas las imágenes
     */
    static init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback para navegadores antiguos
            this.loadAllImages();
            return;
        }

        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Cargar imagen
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    
                    // Remover placeholder si existe
                    img.classList.add('loaded');
                    
                    observer.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    }

    static loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// [INTEGRAR AQUÍ] en initializeApp()
/*
this.setupLazyLoading();

setupLazyLoading() {
    LazyImageLoader.init();
}
*/

// HTML ejemplo de uso:
/*
<img data-src="assets/images/projects/project-1.jpg" 
     src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
     alt="Proyecto 1"
     loading="lazy" 
     decoding="async">
*/

// ===================================================
// 3. RATE LIMITING PARA FORMULARIO
// ===================================================

class RateLimiter {
    constructor() {
        this.attempts = new Map();
        this.maxAttempts = 5;
        this.windowMs = 60 * 60 * 1000; // 1 hora
    }

    /**
     * Verifica si el usuario ha excedido el límite
     * @param {string} identifier - Puede ser IP o email
     * @returns {object}
     */
    check(identifier) {
        const now = Date.now();
        const key = this.hashIdentifier(identifier);

        if (!this.attempts.has(key)) {
            this.attempts.set(key, []);
        }

        const userAttempts = this.attempts.get(key);
        
        // Eliminar intentos antiguos fuera de la ventana
        const recentAttempts = userAttempts.filter(
            time => now - time < this.windowMs
        );

        if (recentAttempts.length >= this.maxAttempts) {
            const oldestAttempt = recentAttempts[0];
            const resetTime = new Date(oldestAttempt + this.windowMs);
            
            return {
                allowed: false,
                remaining: 0,
                resetTime: resetTime.toLocaleTimeString('es-CO')
            };
        }

        // Registrar nuevo intento
        recentAttempts.push(now);
        this.attempts.set(key, recentAttempts);

        return {
            allowed: true,
            remaining: this.maxAttempts - recentAttempts.length,
            resetTime: null
        };
    }

    /**
     * Hash simple del identificador
     * @param {string} identifier 
     * @returns {string}
     */
    hashIdentifier(identifier) {
        // En producción, usar una librería como 'crypto' del servidor
        return btoa(identifier);
    }

    /**
     * Limpia intentos después de la ventana
     */
    cleanup() {
        const now = Date.now();
        for (const [key, attempts] of this.attempts.entries()) {
            const valid = attempts.filter(time => now - time < this.windowMs);
            if (valid.length === 0) {
                this.attempts.delete(key);
            } else {
                this.attempts.set(key, valid);
            }
        }
    }
}

const rateLimiter = new RateLimiter();

// Limpiar cada 30 minutos
setInterval(() => rateLimiter.cleanup(), 30 * 60 * 1000);

// [INTEGRAR AQUÍ] en submitContactForm()
/*
async submitContactForm(email, subject, message) {
    // Rate limiting check
    const rateLimitCheck = rateLimiter.check(email);
    if (!rateLimitCheck.allowed) {
        this.showNotification(
            `Demasiados intentos. Intenta después de ${rateLimitCheck.resetTime}`,
            'error'
        );
        return;
    }

    // ... resto del código
}
*/

// ===================================================
// 4. NOTIFICACIÓN MEJORADA
// ===================================================

class Notification {
    static show(message, type = 'info', duration = 4000) {
        // Crear contenedor si no existe
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }

        // Crear notificación
        const notification = document.createElement('div');
        const bgColor = {
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        }[type];

        notification.style.cssText = `
            background-color: ${bgColor};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            font-size: 14px;
            font-weight: 500;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
            pointer-events: auto;
        `;

        notification.textContent = message;
        document.getElementById('notification-container').appendChild(notification);

        // Auto-remove
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// Añadir estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// [INTEGRAR AQUÍ] Reemplazar this.showNotification() con:
/*
Notification.show('Tu mensaje', 'success');
// Tipos disponibles: success, error, warning, info
*/

// ===================================================
// 5. SCRIPT PARA OPTIMIZAR IMÁGENES (Terminal/npm)
// ===================================================

/*
INSTRUCCIONES PARA MIGUEL:

1. Instalar imagemin:
   npm install --save-dev imagemin imagemin-webp imagemin-mozjpeg imagemin-pngquant

2. Crear script en package.json:
   "scripts": {
     "optimize-images": "node scripts/optimize-images.js"
   }

3. Crear archivo scripts/optimize-images.js con este contenido:

---
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
    try {
        console.log('🖼️  Optimizando imágenes...');
        
        // Convertir a WebP
        await imagemin(['assets/images/**/*.{jpg,png}'], {
            destination: 'assets/images/optimized',
            plugins: [
                imageminWebp({ quality: 75 })
            ]
        });
        
        // Comprimir JPEG
        await imagemin(['assets/images/**/*.jpg'], {
            destination: 'assets/images/optimized',
            plugins: [
                imageminMozjpeg({ quality: 80 })
            ]
        });
        
        // Comprimir PNG
        await imagemin(['assets/images/**/*.png'], {
            destination: 'assets/images/optimized',
            plugins: [
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });
        
        console.log('✅ Imágenes optimizadas exitosamente');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
})();

4. Ejecutar:
   npm run optimize-images
*/

// ===================================================
// 6. SCHEMA MARKUP PARA SEO (Añadir en HTML <head>)
// ===================================================

/*
<!-- JSON-LD Schema Markup para Miguel -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Miguel Angel Bolivar",
  "jobTitle": "Desarrollador Back-end",
  "url": "https://miguelbolivar.com",
  "image": "https://miguelbolivar.com/assets/images/hero-avatar.svg",
  "email": "miguel@example.com",
  "telephone": "+57-XXX-XXX-XXXX",
  "sameAs": [
    "https://github.com/MikeBoss80",
    "https://linkedin.com/in/miguelbolivar",
    "https://twitter.com/miguelbolivar"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance Developer"
  },
  "knowsAbout": ["Backend Development", "Full Stack", "Node.js", "PHP", "Python"],
  "workLocation": "Colombia"
}
</script>

<!-- Para cada proyecto -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Nombre del Proyecto",
  "description": "Descripción del proyecto",
  "url": "https://enlace-al-proyecto.com",
  "author": {
    "@type": "Person",
    "name": "Miguel Angel Bolivar"
  },
  "dateCreated": "2024-01-15",
  "image": "https://miguelbolivar.com/assets/images/projects/project-1.jpg"
}
</script>
*/

// ===================================================
// 7. HELPER PARA TESTEAR EN CONSOLA
// ===================================================

class PortfolioTester {
    /**
     * Test de validación de emails
     */
    static testEmailValidation() {
        const testEmails = [
            { email: 'miguel@example.com', expected: true },
            { email: 'invalid-email', expected: false },
            { email: 'user@domain.co', expected: true },
            { email: 'a' + 'b'.repeat(250) + '@test.com', expected: false }
        ];

        console.log('📧 Testing Email Validation:');
        testEmails.forEach(test => {
            const result = FormValidator.validateEmail(test.email);
            const status = result === test.expected ? '✅' : '❌';
            console.log(`${status} "${test.email}": ${result}`);
        });
    }

    /**
     * Test de detección de spam
     */
    static testSpamDetection() {
        const testMessages = [
            { msg: 'Hola, me gustaría hablar contigo', expected: false },
            { msg: 'Click here to buy viagra now!', expected: true },
            { msg: 'Visit http://casino.top for prizes', expected: true }
        ];

        console.log('\n🚨 Testing Spam Detection:');
        testMessages.forEach(test => {
            const result = FormValidator.isSpam(test.msg);
            const status = result === test.expected ? '✅' : '❌';
            console.log(`${status} "${test.msg.substring(0, 30)}...": ${result}`);
        });
    }

    /**
     * Test de rate limiting
     */
    static testRateLimiting() {
        console.log('\n⏱️  Testing Rate Limiting:');
        const limiter = new RateLimiter();
        
        for (let i = 0; i < 7; i++) {
            const check = limiter.check('test-user@example.com');
            console.log(`Intento ${i + 1}: ${check.allowed ? '✅ Permitido' : '❌ Bloqueado'} (${check.remaining} restantes)`);
        }
    }

    /**
     * Mostrar performance metrics
     */
    static showPerformanceMetrics() {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const firstPaint = perfData.responseEnd - perfData.navigationStart;

            console.log('\n⚡ Performance Metrics:');
            console.log(`Time to First Paint: ${firstPaint}ms`);
            console.log(`Total Page Load Time: ${pageLoadTime}ms`);
        }
    }
}

// Uso en consola:
// PortfolioTester.testEmailValidation();
// PortfolioTester.testSpamDetection();
// PortfolioTester.testRateLimiting();
// PortfolioTester.showPerformanceMetrics();

/**
 * INSTRUCCIONES DE USO:
 * 
 * 1. En la consola del navegador (F12), puedes probar:
 *    PortfolioTester.testEmailValidation()
 *    
 * 2. Para integrar FormValidator en el formulario, reemplaza la sección
 *    setupContactForm() con el código marcado [INTEGRAR AQUÍ]
 *    
 * 3. Para lazy loading, añade data-src a las imágenes y llama setupLazyLoading()
 * 
 * 4. Para notificaciones mejoradas, usa Notification.show() en lugar de 
 *    this.showNotification()
 */

export {
    FormValidator,
    LazyImageLoader,
    RateLimiter,
    Notification,
    PortfolioTester
};
