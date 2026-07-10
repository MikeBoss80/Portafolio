export class ThemeService {
  constructor() {
    this.toggle = document.getElementById("theme-toggle");
    this.icon = this.toggle?.querySelector("i");
    this.init();
  }

  init() {
    if (!this.toggle) return;
    const saved = localStorage.getItem("theme") || "light";
    this.set(saved);
    this.toggle.addEventListener("click", () => this.toggleTheme());
  }

  set(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.dispatchEvent(new CustomEvent("themeChanged"));
    if (this.icon) {
      this.icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }

  toggleTheme() {
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    this.set(next);
    localStorage.setItem("theme", next);
  }

  destroy() {
    if (this.toggle) {
      this.toggle.removeEventListener("click", () => this.toggleTheme());
    }
  }
}
