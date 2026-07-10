import { languages } from "../data/languages.js";

export class Languages {
  constructor() {
    this.container = document.querySelector(".languages-grid");
    if (!this.container) return;
    this.render();
    this.setupBarAnimations();
  }

  render() {
    this.container.innerHTML = languages
      .map(
        (l) => `
      <div class="language-card">
        <div class="language-flag">${l.flag}</div>
        <div class="language-info">
          <h4>${l.name}</h4>
          <p class="language-level">${l.level}</p>
          <div class="language-bar">
            <div class="language-progress" style="width: ${l.percentage}%"></div>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  setupBarAnimations() {
    const bars = this.container.querySelectorAll(".language-progress");
    bars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0%";

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                bar.style.width = width;
              }, 200);
              observer.unobserve(bar);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(bar);
    });
  }

  destroy() {
    // cleanup
  }
}
