export class Navbar {
  constructor() {
    this.container = document.getElementById("navbar");
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("nav-menu");
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupCloseOnOutsideClick();
    this.setupCloseOnResize();
  }

  setupMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;

    this.hamburger.addEventListener("click", () => this.toggle());
    this.navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => this.close());
    });
  }

  setupCloseOnOutsideClick() {
    document.addEventListener("click", (e) => {
      if (
        this.navMenu?.classList.contains("active") &&
        !this.navMenu.contains(e.target) &&
        !this.hamburger?.contains(e.target)
      ) {
        this.close();
      }
    });
  }

  setupCloseOnResize() {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) this.close();
    });
  }

  toggle() {
    this.hamburger?.classList.toggle("active");
    this.navMenu?.classList.toggle("active");
    document.body.style.overflow =
      this.navMenu?.classList.contains("active") ? "hidden" : "visible";
  }

  close() {
    this.hamburger?.classList.remove("active");
    this.navMenu?.classList.remove("active");
    document.body.style.overflow = "visible";
  }

  destroy() {
    // cleanup listeners if needed
  }
}
