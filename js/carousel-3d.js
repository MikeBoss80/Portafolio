class Carousel3D {
    constructor() {
        this.data = [
            {
                id: 1, title: 'Portafolio Web', category: 'Web',
                description: 'Sitio web personal responsive con tema oscuro/claro, animaciones GSAP y fondo SVG 3D.',
                image: 'assets/images/projects/portafolio.png',
                tech: ['HTML', 'JavaScript', 'CSS', 'GSAP'], demo: 'https://github.com/MikeBoss80/Portafolio', code: 'https://github.com/MikeBoss80/Portafolio'
            },
            {
                id: 2, title: 'BarberB', category: 'Web App',
                description: 'Aplicación web para reservar citas en barbería con gestión de usuarios, establecimientos y notificaciones.',
                image: 'assets/images/projects/barberb.png',
                tech: ['Django', 'Python', 'JavaScript', 'HTML', 'CSS', 'MySQL'], demo: 'https://github.com/MikeBoss80/web_barberb', code: 'https://github.com/MikeBoss80/web_barberb'
            },
            {
                id: 3, title: 'COVID-19 Analysis', category: 'Data',
                description: 'Análisis de hospitalización por COVID-19 con visualización de datos y métricas clave.',
                image: 'assets/images/projects/covid19.png',
                tech: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'], demo: 'https://github.com/MikeBoss80/covid_hospitalization_analysis', code: 'https://github.com/MikeBoss80/covid_hospitalization_analysis'
            },
            {
                id: 4, title: 'Reciclaje CEMPRE', category: 'Data',
                description: 'Análisis de datos para CEMPRE Uruguay sobre reciclaje con visualizaciones interactivas.',
                image: 'assets/images/projects/reciclaje.png',
                tech: ['Python', 'Pandas', 'Data Analysis', 'Dash'], demo: 'https://github.com/MikeBoss80/prueba_data_analyst_cempre', code: 'https://github.com/MikeBoss80/prueba_data_analyst_cempre'
            },
            {
                id: 5, title: 'Transporte Dashboard', category: 'BI',
                description: 'Dashboard en Power BI para análisis de incidentes de transporte público.',
                image: 'assets/images/projects/dashboard-transporte.png',
                tech: ['Power BI', 'DAX', 'SQL', 'ETL'], demo: 'https://github.com/MikeBoss80/power_bi_transport_incident_dashboard', code: 'https://github.com/MikeBoss80/power_bi_transport_incident_dashboard'
            },
            {
                id: 6, title: 'Mattech', category: 'Web',
                description: 'Plataforma tecnológica para gestión de materiales y recursos.',
                image: 'assets/images/projects/mattech.png',
                tech: ['Python', 'Django', 'JavaScript', 'PostgreSQL'], demo: 'https://github.com/MikeBoss80/Mattech', code: 'https://github.com/MikeBoss80/Mattech'
            },
            {
                id: 7, title: 'LawHonor', category: 'Web App',
                description: 'Sistema de gestión para despachos jurídicos con seguimiento de casos y clientes.',
                image: 'assets/images/projects/lawhonor.png',
                tech: ['Python', 'Django', 'Bootstrap', 'SQLite'], demo: 'https://github.com/MikeBoss80/LawHonor', code: 'https://github.com/MikeBoss80/LawHonor'
            },
            {
                id: 8, title: 'Perfil GitHub', category: 'README',
                description: 'README interactivo para perfil de GitHub con estadísticas y tecnologías.',
                image: 'assets/images/projects/perfil-readme.png',
                tech: ['Markdown', 'HTML', 'Badges'], demo: 'https://github.com/MikeBoss80/MikeBoss80', code: 'https://github.com/MikeBoss80/MikeBoss80'
            }
        ];

        this.stage = document.getElementById('carouselStage');
        this.info = document.getElementById('carouselInfo');
        this.infoTitle = this.info.querySelector('.carousel-info-title');
        this.infoDesc = this.info.querySelector('.carousel-info-desc');
        this.infoTech = this.info.querySelector('.carousel-info-tech');
        this.infoDemo = this.info.querySelector('.carousel-link-demo');
        this.infoCode = this.info.querySelector('.carousel-link-code');
        this.dotsContainer = document.getElementById('carouselDots');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');

        this.activeIndex = 0;
        this.total = this.data.length;
        this.cards = [];
        this.autoTimer = null;
        this.isHovered = false;
        this.isDragging = false;
        this.dragStartX = 0;

        this.build();
        this.positionCards(0);
        this.updateInfo();
        this.createDots();
        this.bindEvents();
        this.startAutoRotate();
    }

    build() {
        this.data.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'carousel-3d-card';
            card.dataset.index = i;
            card.innerHTML = `
                <img class="card-image" src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="card-overlay">
                    <h4>${item.title}</h4>
                    <span class="card-category">${item.category}</span>
                </div>
            `;
            card.addEventListener('click', () => this.goTo(i));
            this.stage.appendChild(card);
            this.cards.push(card);
        });
    }

    getPosition(index) {
        const total = this.total;
        let idx = ((index - this.activeIndex) % total + total) % total;
        if (idx > Math.floor(total / 2)) idx -= total;

        const absIdx = Math.abs(idx);
        const sign = idx >= 0 ? 1 : -1;

        const xStep = 260;
        const zStep = 120;
        const yStep = 8;

        const positions = {
            x: sign * absIdx * xStep,
            z: -(absIdx * zStep) - (absIdx > 2 ? 80 : absIdx > 1 ? 40 : 0),
            y: -(absIdx * yStep),
            scale: 1 - absIdx * 0.11,
            opacity: Math.max(0.12, 1 - absIdx * 0.14),
            rotationY: sign * absIdx * 10,
            zIndex: total - absIdx
        };
        positions.scale = Math.max(positions.scale, 0.35);

        return positions;
    }

    positionCards(duration = 0.6) {
        this.cards.forEach((card, i) => {
            const pos = this.getPosition(i);
            gsap.to(card, {
                x: pos.x,
                y: pos.y,
                z: pos.z,
                scale: pos.scale,
                opacity: pos.opacity,
                rotationY: pos.rotationY,
                zIndex: pos.zIndex,
                duration: duration,
                ease: 'power3.out',
                force3D: true,
                overwrite: 'auto'
            });
            card.classList.toggle('active', i === this.activeIndex);
        });
    }

    updateInfo() {
        const item = this.data[this.activeIndex];
        this.infoTitle.textContent = item.title;
        this.infoDesc.textContent = item.description;
        this.infoTech.innerHTML = item.tech.map(t => `<span>${t}</span>`).join('');
        this.infoDemo.href = item.demo;
        this.infoCode.href = item.code;
        this.info.classList.add('visible');

        this.dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.activeIndex);
        });
    }

    createDots() {
        this.data.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === this.activeIndex ? ' active' : '');
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        });
    }

    prev() {
        this.goTo((this.activeIndex - 1 + this.total) % this.total);
    }

    next() {
        this.goTo((this.activeIndex + 1) % this.total);
    }

    goTo(index) {
        if (index === this.activeIndex) return;
        this.activeIndex = index;
        this.positionCards();
        this.updateInfo();
        this.restartAutoRotate();
    }

    startAutoRotate() {
        this.stopAutoRotate();
        this.autoTimer = setInterval(() => {
            if (!this.isHovered) this.next();
        }, 5000);
    }

    stopAutoRotate() {
        if (this.autoTimer) {
            clearInterval(this.autoTimer);
            this.autoTimer = null;
        }
    }

    restartAutoRotate() {
        this.stopAutoRotate();
        this.startAutoRotate();
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        this.stage.addEventListener('mouseenter', () => { this.isHovered = true; });
        this.stage.addEventListener('mouseleave', () => { this.isHovered = false; });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        this.stage.addEventListener('pointerdown', (e) => {
            this.isDragging = true;
            this.dragStartX = e.clientX;
            this.stage.setPointerCapture(e.pointerId);
        });

        this.stage.addEventListener('pointermove', (e) => {
            if (!this.isDragging) return;
            const dx = e.clientX - this.dragStartX;
            if (Math.abs(dx) > 60) {
                this.isDragging = false;
                dx > 0 ? this.prev() : this.next();
            }
        });

        this.stage.addEventListener('pointerup', () => { this.isDragging = false; });
        this.stage.addEventListener('pointercancel', () => { this.isDragging = false; });
    }
}
