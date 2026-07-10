export class Loader {
  constructor() {
    this.el = document.getElementById("loader");
    if (!this.el) return;

    window.addEventListener("load", () => {
      setTimeout(() => this.hide(), 500);
    });

    setTimeout(() => {
      if (!this.el.classList.contains("hidden")) this.hide();
    }, 3000);
  }

  hide() {
    this.el.classList.add("hidden");
    document.body.style.overflow = "visible";
  }

  destroy() {
    // nothing to clean
  }
}
