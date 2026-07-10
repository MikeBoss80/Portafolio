const ANIMATIONS = {
  "fade-up": { opacity: 0, transform: "translateY(60px)" },
  "fade-down": { opacity: 0, transform: "translateY(-60px)" },
  "fade-right": { opacity: 0, transform: "translateX(-60px)" },
  "fade-left": { opacity: 0, transform: "translateX(60px)" },
};

export class ScrollReveal {
  constructor() {
    const elements = document.querySelectorAll("[data-aos], [data-animate]");
    if (!elements.length) return;

    elements.forEach((el) => {
      const type = el.getAttribute("data-aos") || "fade-up";
      const delay = parseInt(el.getAttribute("data-aos-delay")) || 0;
      const anim = ANIMATIONS[type] || ANIMATIONS["fade-up"];

      Object.assign(el.style, {
        ...anim,
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      });
    });

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            Object.assign(el.style, { opacity: 1, transform: "translate(0,0)" });
            this.observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => this.observer.observe(el));
  }

  destroy() {
    this.observer?.disconnect();
  }
}
