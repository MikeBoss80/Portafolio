// ==============================================
// GLOBAL VARIABLES AND UTILITIES
// ==============================================
class MainApp  {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    initializeApp() {
        this.setupLoader();
        this.setupNavigation();
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupSkillBars();
        this.setupProjectFilters();
        this.setupContactForm();
        this.setupBackToTop();
        this.setupStatCounters();
        this.setupParticles();
        this.setupExperienceAnimations();
        this.setupLanguageBars();
        this.setupSVG3DEffects();  // ← AGREGAR
        
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }
    }



    // ==============================================
    // SVG 3D SCROLL EFFECTS CON ARCHIVO EXTERNO
    // ==============================================
    setupSVG3DEffects() {
        const svgWrapper = document.getElementById('svgBackground');
        const svgObject = document.getElementById('backgroundSVG');
        
        if (!svgWrapper || !svgObject) {
            console.warn('SVG Background no encontrado');
            return;
        }
    
        // Esperar a que el SVG se cargue completamente
        svgObject.addEventListener('load', () => {
            console.log('SVG cargado correctamente');
            this.initSVGEffects(svgWrapper, svgObject);
        });
    
        // Fallback: si no carga en 3 segundos
        setTimeout(() => {
            if (svgObject.contentDocument) {
                this.initSVGEffects(svgWrapper, svgObject);
            }
        }, 3000);
    }
    
    // ==============================================
    // INICIALIZAR EFECTOS DEL SVG
    // ==============================================
    initSVGEffects(wrapper, object) {
        const svg = object.contentDocument?.querySelector('svg');
        
        if (!svg) {
            console.warn('No se pudo acceder al SVG interno');
            return;
        }
    
        // Variables para efectos
        let scrollProgress = 0;
        let lastScrollY = 0;
    
        // ===== 1. PARALLAX EN EL SCROLL =====
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Progreso del scroll (0 a 1)
            scrollProgress = Math.min(1, scrollY / (docHeight * 0.8));
            
            // --- Efecto 1: Movimiento vertical (parallax) ---
            const translateY = scrollProgress * 120;
            const scale = 1 + scrollProgress * 0.03;
            const rotate = scrollProgress * 2;
            
            svg.style.transform = `
                translateY(${translateY * 0.3}px) 
                scale(${scale}) 
                rotate(${rotate}deg)
            `;
            
            // --- Efecto 2: Opacidad dinámica ---
            const opacity = Math.max(0.3, 1 - scrollProgress * 0.5);
            svg.style.opacity = opacity;
            
            // --- Efecto 3: Desenfoque progresivo ---
            const blurAmount = scrollProgress * 2;
            svg.style.filter = `blur(${blurAmount}px)`;
            
            // --- Efecto 4: Scroll de las capas internas ---
            const layers = svg.querySelectorAll('g[filter], g:not([filter])');
            layers.forEach((layer, index) => {
                const speed = 0.1 + (index % 3) * 0.05;
                const layerOffset = scrollProgress * 50 * speed;
                layer.style.transform = `translateY(${layerOffset}px)`;
            });
            
            // --- Efecto 5: Brillo de los nodos ---
            const nodes = svg.querySelectorAll('#networkNode, #networkNodeMagenta, .networkNode');
            nodes.forEach((node, i) => {
                const delay = i * 0.02;
                const progress = Math.max(0, Math.min(1, (scrollProgress - delay) / (1 - delay)));
                const glowSize = 12 + progress * 20;
                const glowOpacity = 0.3 + progress * 0.5;
                
                const circles = node.querySelectorAll('circle');
                circles.forEach(circle => {
                    if (circle.getAttribute('r') && parseFloat(circle.getAttribute('r')) > 8) {
                        circle.setAttribute('r', glowSize);
                        circle.setAttribute('opacity', glowOpacity);
                    }
                });
            });
            
            // --- Efecto 6: Velocidad de pulsos ---
            const pulses = svg.querySelectorAll('animateMotion');
            pulses.forEach((pulse) => {
                const speed = 4 + scrollProgress * 10;
                const currentDur = parseFloat(pulse.getAttribute('dur'));
                if (currentDur > 2) {
                    pulse.setAttribute('dur', Math.max(2, speed));
                }
            });
    
            lastScrollY = scrollY;
            
        }, { passive: true });
    
        // ===== 2. EFECTO CON EL MOUSE =====
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            svg.style.transform += ` translate(${x * 5}px, ${y * 5}px)`;
        });
    
        // ===== 3. REINICIAR EFECTOS AL CAMBIAR DE TEMA =====
        document.addEventListener('themeChanged', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            svg.style.opacity = isDark ? '0.7' : '0.9';
        });
    
        console.log('SVG 3D Scroll Effects inicializados');
    }

        // ==============================================
    // EXPERIENCE ANIMATIONS
    // ==============================================
    setupExperienceAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    // Agregar clase para animación
                    item.classList.add('animate');
                    
                    // Animar tech-stack items con delay
                    const techItems = item.querySelectorAll('.tech-stack span');
                    techItems.forEach((tech, index) => {
                        setTimeout(() => {
                            tech.style.opacity = '1';
                            tech.style.transform = 'translateY(0)';
                        }, 300 + index * 50);
                    });
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(item => {
            // Inicializar tech-stack items ocultos
            const techItems = item.querySelectorAll('.tech-stack span');
            techItems.forEach(tech => {
                tech.style.opacity = '0';
                tech.style.transform = 'translateY(10px)';
                tech.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            });
            
            observer.observe(item);
        });
    }

    // ==============================================
    // LANGUAGE BARS ANIMATION
    // ==============================================
    setupLanguageBars() {
        const languageBars = document.querySelectorAll('.language-progress');
        
        const animateBars = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                    
                    observer.unobserve(bar);
                }
            });
        };

        const barObserver = new IntersectionObserver(animateBars, {
            threshold: 0.5
        });

        languageBars.forEach(bar => barObserver.observe(bar));
    }

    // ==============================================
    // LOADER FUNCTIONALITY
    // ==============================================
    setupLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        // Hide loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 500);
        });

        // Fallback: hide loader after 3 seconds
        setTimeout(() => {
            if (!loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }
        }, 3000);
    }

    // ==============================================
    // NAVIGATION FUNCTIONALITY
    // ==============================================
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navbar) return;

        // Navbar scroll effect
        this.handleNavbarScroll(navbar);
        
        // Active link highlighting
        this.setupActiveLinks(navLinks);
        
        // Smooth scrolling for nav links
        this.setupSmoothScrolling(navLinks);
    }

    handleNavbarScroll(navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupActiveLinks(navLinks) {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        });
    }

    setupSmoothScrolling(navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
    }

    // ==============================================
    // THEME TOGGLE FUNCTIONALITY
    // ==============================================
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle?.querySelector('i');
        
        if (!themeToggle) return;

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme, themeIcon);

        // Theme toggle event
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            this.setTheme(newTheme, themeIcon);
            localStorage.setItem('theme', newTheme);
        });
    }

    setTheme(theme, themeIcon) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Disparar evento para que el SVG se ajuste
        document.dispatchEvent(new CustomEvent('themeChanged'));
        
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }    

    // ==============================================
    // MOBILE MENU FUNCTIONALITY
    // ==============================================
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    toggleMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
    }

    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = 'visible';
    }

    // ==============================================
    // SCROLL EFFECTS
    // ==============================================
    setupScrollEffects() {
        this.setupParallaxEffect();
        this.setupScrollReveal();
    }

    setupParallaxEffect() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('.hero-background');
            
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll('[data-animate]');
        animateElements.forEach(el => observer.observe(el));
    }

    // ==============================================
    // SKILL BARS ANIMATION
    // ==============================================
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const animateSkillBars = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const percentage = skillBar.getAttribute('data-percentage');
                    
                    setTimeout(() => {
                        skillBar.style.width = percentage + '%';
                    }, 200);
                    
                    observer.unobserve(skillBar);
                }
            });
        };

        const skillObserver = new IntersectionObserver(animateSkillBars, {
            threshold: 0.5
        });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // ==============================================
    // PROJECT FILTERS
    // ==============================================
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!filterButtons.length || !projectCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                this.filterProjects(projectCards, filter);
            });
        });
    }

    filterProjects(projectCards, filter) {
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // ==============================================
    // CONTACT FORM FUNCTIONALITY
    // ==============================================
    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let errorMessage = '';

        // Clear previous error
        this.clearFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'El nombre es requerido';
                } else if (value.length < 2) {
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'El email es requerido';
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Ingresa un email válido';
                }
                break;
            case 'subject':
                if (!value) {
                    errorMessage = 'El asunto es requerido';
                } else if (value.length < 5) {
                    errorMessage = 'El asunto debe tener al menos 5 caracteres';
                }
                break;
            case 'message':
                if (!value) {
                    errorMessage = 'El mensaje es requerido';
                } else if (value.length < 10) {
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                }
                break;
        }

        if (errorMessage) {
            this.showFieldError(field, errorMessage);
            return false;
        }

        return true;
    }

    showFieldError(field, message) {
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        field.style.borderColor = '#ef4444';
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        field.style.borderColor = '';
    }

    async handleFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        let isValid = true;

        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(formData);
            
            // Show success message
            this.showNotification('¡Mensaje enviado exitosamente!', 'success');
            form.reset();
            
        } catch (error) {
            this.showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
        } finally {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                // Simulate success (90% chance)
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Simulated error'));
                }
            }, 2000);
        });
    }

    // ==============================================
    // NOTIFICATION SYSTEM
    // ==============================================
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            minWidth: '300px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
        });

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => this.removeNotification(notification));

        // Auto remove after 5 seconds
        setTimeout(() => this.removeNotification(notification), 5000);
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // ==============================================
    // BACK TO TOP FUNCTIONALITY
    // ==============================================
    setupBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        if (!backToTopButton) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Scroll to top functionality
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==============================================
    // STATISTICS COUNTERS
    // ==============================================
    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounters = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    
                    this.animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        };

        const counterObserver = new IntersectionObserver(animateCounters, {
            threshold: 0.5
        });

        statNumbers.forEach(stat => counterObserver.observe(stat));
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // Adjust speed
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                setTimeout(updateCounter, stepTime);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // ==============================================
    // PARTICLE ANIMATION
    // ==============================================
    setupParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        if (!particlesContainer) return;

        // Create particles
        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        Object.assign(particle.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: '#667eea',
            borderRadius: '50%',
            left: `${x}%`,
            top: `${y}%`,
            opacity: '0.1',
            animation: `particleFloat ${duration}s linear infinite ${delay}s`
        });

        container.appendChild(particle);
    }

    // ==============================================
    // ANIMATIONS SETUP
    // ==============================================
    setupAnimations() {
        // Add CSS for particle animation if not present
        if (!document.querySelector('#particle-animation-css')) {
            const style = document.createElement('style');
            style.id = 'particle-animation-css';
            style.textContent = `
                @keyframes particleFloat {
                    0% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.1;
                    }
                    90% {
                        opacity: 0.1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
                
                .notification-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0;
                    margin-left: 10px;
                }
                
                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ==============================================
    // UTILITY METHODS
    // ==============================================
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ==============================================
// INITIALIZE APPLICATION
// ==============================================
const portfolioApp = new MainApp ();

// ==============================================
// ADDITIONAL EVENT LISTENERS
// ==============================================

// Performance optimization: Use passive event listeners for scroll
window.addEventListener('scroll', portfolioApp.throttle(() => {
    // Additional scroll-based functionality can be added here
}, 16), { passive: true }); // 60fps

// Handle window resize events
window.addEventListener('resize', portfolioApp.debounce(() => {
    // Handle responsive adjustments
    if (window.innerWidth > 768) {
        portfolioApp.closeMobileMenu();
    }
}, 250));

// Handle visibility change (when user switches tabs)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when tab becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// ==============================================
// CONSOLE WELCOME MESSAGE
// ==============================================
console.log(`
🚀 Portfolio Website Loaded Successfully!
─────────────────────────────────────────
✨ Features included:
• Responsive Design
• Dark/Light Theme Toggle
• Smooth Scroll Navigation
• Animated Skill Bars
• Project Filtering
• Contact Form Validation
• Intersection Observer APIs
• Mobile-First Approach
• Accessibility Features

💻 Built with modern JavaScript ES6+
🎨 Styled with CSS Custom Properties
📱 Optimized for all devices

Made with ❤️ for developers
`);

// ==============================================
// EXPORT FOR MODULE USAGE (if needed)
// ==============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
