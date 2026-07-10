export class ScrollService {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.backToTop = document.getElementById("backToTop");
    this.lastScrollY = 0;
    this.init();
  }

  init() {
    this.handleScroll();
    this.setupSmoothScrolling();
    if (this.backToTop) {
      this.backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  handleScroll() {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        this.updateNavbar(y);
        this.updateActiveLink(y);
        this.updateBackToTop(y);
        this.lastScrollY = y;
      },
      { passive: true }
    );
  }

  updateNavbar(y) {
    if (!this.navbar) return;
    this.navbar.classList.toggle("scrolled", y > 50);
    if (y > this.lastScrollY && y > 100) {
      this.navbar.style.transform = "translateY(-100%)";
    } else {
      this.navbar.style.transform = "translateY(0)";
    }
  }

  updateActiveLink(y) {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = y + 100;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        this.navLinks.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }

  updateBackToTop(y) {
    if (!this.backToTop) return;
    this.backToTop.classList.toggle("show", y > 300);
  }

  setupSmoothScrolling() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
          this.closeMobileMenu();
        }
      });
    });
  }

  closeMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    hamburger?.classList.remove("active");
    navMenu?.classList.remove("active");
    document.body.style.overflow = "visible";
  }

  destroy() {
    // cleanup references - event listeners would need specific refs
  }
}
