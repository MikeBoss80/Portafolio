import gsap from "gsap";
import { projects } from "../data/projects.js";

export class Carousel3D {
  constructor() {
    this.data = projects;
    this.stage = document.getElementById("carouselStage");
    this.info = document.getElementById("carouselInfo");
    if (!this.stage || !this.info) return;

    this.infoTitle = this.info.querySelector(".carousel-info-title");
    this.infoDesc = this.info.querySelector(".carousel-info-desc");
    this.infoTech = this.info.querySelector(".carousel-info-tech");
    this.infoDemo = this.info.querySelector(".carousel-link-demo");
    this.infoCode = this.info.querySelector(".carousel-link-code");
    this.dotsContainer = document.getElementById("carouselDots");
    this.prevBtn = document.querySelector(".carousel-prev");
    this.nextBtn = document.querySelector(".carousel-next");

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
      const card = document.createElement("div");
      card.className = "carousel-3d-card";
      card.dataset.index = i;
      card.innerHTML = `
        <img class="card-image" src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="card-overlay">
          <h4>${item.title}</h4>
          <span class="card-category">${item.category}</span>
        </div>
      `;
      card.addEventListener("click", () => this.goTo(i));
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

    const w = window.innerWidth;
    const xStep = w < 480 ? 140 : w < 768 ? 160 : w < 900 ? 200 : 260;
    const zStep = w < 480 ? 60 : w < 768 ? 80 : w < 900 ? 100 : 120;
    const yStep = w < 480 ? 4 : w < 768 ? 5 : w < 900 ? 6 : 8;

    const scale = Math.max(1 - absIdx * 0.11, 0.35);
    const opacity = Math.max(0.12, 1 - absIdx * 0.14);

    return {
      x: sign * absIdx * xStep,
      z: -(absIdx * zStep) - (absIdx > 2 ? 80 : absIdx > 1 ? 40 : 0),
      y: -(absIdx * yStep),
      scale,
      opacity,
      rotationY: sign * absIdx * 10,
      zIndex: total - absIdx,
    };
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
        duration,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      });
      card.classList.toggle("active", i === this.activeIndex);
    });
  }

  updateInfo() {
    const item = this.data[this.activeIndex];
    this.infoTitle.textContent = item.title;
    this.infoDesc.textContent = item.description;
    this.infoTech.innerHTML = item.tech.map((t) => `<span>${t}</span>`).join("");
    this.infoDemo.href = item.demo;
    this.infoCode.href = item.code;
    this.info.classList.add("visible");

    this.dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === this.activeIndex);
    });
  }

  createDots() {
    this.data.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className =
        "carousel-dot" + (i === this.activeIndex ? " active" : "");
      dot.addEventListener("click", () => this.goTo(i));
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
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    this.stage.addEventListener("mouseenter", () => {
      this.isHovered = true;
    });
    this.stage.addEventListener("mouseleave", () => {
      this.isHovered = false;
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });

    this.stage.addEventListener("pointerdown", (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.stage.setPointerCapture(e.pointerId);
    });

    this.stage.addEventListener("pointermove", (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.dragStartX;
      if (Math.abs(dx) > 60) {
        this.isDragging = false;
        dx > 0 ? this.prev() : this.next();
      }
    });

    this.stage.addEventListener("pointerup", () => {
      this.isDragging = false;
    });
    this.stage.addEventListener("pointercancel", () => {
      this.isDragging = false;
    });
  }

  destroy() {
    this.stopAutoRotate();
    // cleanup would need full ref tracking
  }
}
