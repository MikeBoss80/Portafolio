import { profile } from "../data/profile.js";

export class About {
  constructor() {
    this.statNumbers = document.querySelectorAll(".stat-number");
    this.init();
  }

  init() {
    this.setupStatCounters();
  }

  setupStatCounters() {
    this.statNumbers.forEach((stat) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = parseInt(stat.getAttribute("data-target"));
              this.animateCounter(stat, target);
              observer.unobserve(stat);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(stat);
    });
  }

  animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const stepTime = 2000 / 50;

    const update = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        setTimeout(update, stepTime);
      } else {
        element.textContent = target;
      }
    };
    update();
  }

  destroy() {
    // cleanup observers
  }
}
