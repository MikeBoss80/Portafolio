export class Experience {
  constructor() {
    this.timelineItems = document.querySelectorAll(".timeline-item");
    this.init();
  }

  init() {
    this.setupTimelineAnimations();
  }

  setupTimelineAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target;
            item.classList.add("animate");
            const techItems = item.querySelectorAll(".tech-stack span");
            techItems.forEach((tech, index) => {
              setTimeout(() => {
                tech.style.opacity = "1";
                tech.style.transform = "translateY(0)";
              }, 300 + index * 50);
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    this.timelineItems.forEach((item) => {
      const techItems = item.querySelectorAll(".tech-stack span");
      techItems.forEach((tech) => {
        tech.style.opacity = "0";
        tech.style.transform = "translateY(10px)";
        tech.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      });
      observer.observe(item);
    });
  }

  destroy() {
    // cleanup observers
  }
}
