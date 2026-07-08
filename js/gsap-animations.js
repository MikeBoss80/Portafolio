// ==============================================
// GSAP ADVANCED ANIMATIONS
// ==============================================
class GSAPAnimations {
    constructor() {
        // Register ScrollTrigger plugin
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            this.init();
        }
    }

    init() {
        this.heroAnimations();
        this.aboutAnimations();
        this.skillsAnimations();
        this.projectsAnimations();
        this.formacionAnimations();
        this.contactAnimations();
        this.navbarAnimations();
        this.parallaxEffects();
    }

    heroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroImage = document.querySelector('.hero-image');

        if (!heroTitle) return;

        // Ensure hero section is visible before animating children
        gsap.set('.hero', { opacity: 1 });

        // Create timeline
        const tl = gsap.timeline({
            defaults: {
                ease: 'power4.out',
                duration: 1.2
            }
        });

        // Animate hero elements
        tl.from(heroTitle, {
            y: 100,
            opacity: 0,
            duration: 1.5
        })
        .from(heroSubtitle, {
            y: 50,
            opacity: 0,
            duration: 1
        }, '-=0.5')
        .from(heroButtons, {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from(heroImage, {
            x: 100,
            opacity: 0,
            rotation: 10,
            duration: 1.2
        }, '-=1');

        // Floating elements animation
        document.querySelectorAll('.floating-element').forEach((el, i) => {
            gsap.to(el, {
                y: -20,
                duration: 2 + i,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.5
            });
        });

        // Typing effect for role
        this.typeWriterEffect();
    }

    typeWriterEffect() {
        const roleElement = document.querySelector('.role');
        if (!roleElement) return;

        const roles = [
            'Desarrollador Back-end',
            'Full Stack Developer',
            'Python Developer',
            'Apasionado por la Tecnología'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentRole = roles[roleIndex];
            
            if (!isDeleting) {
                // Typing
                roleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(type, 2000);
                    return;
                }
                
                setTimeout(type, 100 + Math.random() * 50);
            } else {
                // Deleting
                roleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(type, 500);
                    return;
                }
                
                setTimeout(type, 50);
            }
        };

        // Start typing after initial animations
        setTimeout(type, 2000);
    }

    aboutAnimations() {
        const aboutSection = document.querySelector('.about');
        if (!aboutSection) return;

        // Animate stats
        gsap.utils.toArray('.stat-item').forEach((stat, i) => {
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2,
                ease: 'power3.out'
            });
        });

        // Animate about text
        gsap.from('.about-description', {
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    skillsAnimations() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach((category, i) => {
            gsap.from(category, {
                scrollTrigger: {
                    trigger: category,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out'
            });

            // Animate skill bars
            const bars = category.querySelectorAll('.skill-bar');
            bars.forEach((bar, j) => {
                const percentage = bar.getAttribute('data-percentage');
                
                gsap.from(bar, {
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    width: '0%',
                    duration: 1.2,
                    delay: 0.2 + j * 0.1,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        bar.style.width = percentage + '%';
                    }
                });
            });
        });
    }

    projectsAnimations() {
        gsap.from('.carousel-3d', {
            scrollTrigger: {
                trigger: '#projects',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    formacionAnimations() {
        const folioItems = document.querySelectorAll('.folio-item');
        folioItems.forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: '#formacion',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
    }

    contactAnimations() {
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out'
            });
        });

        // Animate contact form
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    navbarAnimations() {
        // Animate nav items on load
        gsap.from('.nav-item', {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.5,
            ease: 'power3.out'
        });
    }

    parallaxEffects() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        gsap.to('.hero-background', {
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 100,
            scale: 1.1,
            opacity: 0.3
        });

        document.querySelectorAll('.floating-element').forEach((el, i) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                },
                y: 50 + i * 30,
                rotation: 20 + i * 10
            });
        });

        // ===== 3D SCENE "SUBMERGING" EFFECT =====
        const threeContainer = document.getElementById('threeContainer');
        if (threeContainer) {
            gsap.to(threeContainer, {
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.2,
                    invalidateOnRefresh: true
                },
                opacity: 0.15,
                scale: 0.7,
                yPercent: 30,
                ease: 'power2.inOut'
            });
        }
    }
}

// Initialize GSAP animations
document.addEventListener('DOMContentLoaded', () => {
    const gsapAnimations = new GSAPAnimations();
});
