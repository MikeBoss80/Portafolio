export class ScrollSpy {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-link");
    if (!this.navLinks.length) return;
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.update(), { passive: true });
  }

  update() {
    const y = window.scrollY + 100;
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (y >= top && y < top + height) {
        this.navLinks.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }

  destroy() {
    // no listeners to clean — anonymous function
  }
}
