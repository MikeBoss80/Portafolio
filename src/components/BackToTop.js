export class BackToTop {
  constructor() {
    this.btn = document.getElementById("backToTop");
    if (!this.btn) return;
    this.bind();
  }

  bind() {
    window.addEventListener(
      "scroll",
      () => {
        this.btn.classList.toggle("show", window.scrollY > 300);
      },
      { passive: true }
    );

    this.btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  destroy() {
    // cleanup
  }
}
