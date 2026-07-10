export class CursorFX {
  constructor() {
    this.cursor = null;
    this.cursorGlow = null;
    this.mouseX = 0;
    this.mouseY = 0;

    if ("ontouchstart" in window || window.innerWidth < 768) return;
    this.init();
  }

  init() {
    this.cursor = document.createElement("div");
    this.cursor.className = "custom-cursor";
    Object.assign(this.cursor.style, {
      position: "fixed",
      width: "20px",
      height: "20px",
      border: "2px solid #004687",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "99999",
      transform: "translate(-50%, -50%)",
      transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
      willChange: "transform",
      backgroundColor: "rgba(0,70,135,0.1)",
      boxShadow: "0 0 10px rgba(0,70,135,0.2)",
    });

    this.cursorGlow = document.createElement("div");
    this.cursorGlow.className = "custom-cursor-glow";
    Object.assign(this.cursorGlow.style, {
      position: "fixed",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "99998",
      background:
        "radial-gradient(circle, rgba(0,70,135,0.15) 0%, transparent 70%)",
      transform: "translate(-50%, -50%)",
      willChange: "transform",
    });

    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorGlow);
    document.body.style.cursor = "none";

    this.bindEvents();
    this.watchDarkTheme();
  }

  bindEvents() {
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.update();
    });

    document
      .querySelectorAll(
        "a, button, .btn, .carousel-3d-card, .social-link, input, textarea"
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", () => this.onHover());
        el.addEventListener("mouseleave", () => this.onLeave());
      });

    document.addEventListener("mousedown", () => {
      if (this.cursor)
        this.cursor.style.transform = "translate(-50%, -50%) scale(0.7)";
    });

    document.addEventListener("mouseup", () => {
      if (this.cursor)
        this.cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });

    document.addEventListener("mouseleave", () => {
      if (this.cursor) this.cursor.style.display = "none";
      if (this.cursorGlow) this.cursorGlow.style.display = "none";
    });

    document.addEventListener("mouseenter", () => {
      if (this.cursor) this.cursor.style.display = "block";
      if (this.cursorGlow) this.cursorGlow.style.display = "block";
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        if (this.cursor) this.cursor.style.display = "none";
        if (this.cursorGlow) this.cursorGlow.style.display = "none";
        document.body.style.cursor = "auto";
      }
    });
  }

  update() {
    if (this.cursor) {
      this.cursor.style.left = this.mouseX + "px";
      this.cursor.style.top = this.mouseY + "px";
    }
    if (this.cursorGlow) {
      this.cursorGlow.style.left = this.mouseX + "px";
      this.cursorGlow.style.top = this.mouseY + "px";
    }
  }

  onHover() {
    if (!this.cursor) return;
    this.cursor.style.width = "40px";
    this.cursor.style.height = "40px";
    this.cursor.style.borderColor = "#0066CC";
    this.cursor.style.backgroundColor = "rgba(0,70,135,0.2)";
    this.cursor.style.boxShadow = "0 0 20px rgba(0,70,135,0.4)";
    if (this.cursorGlow) {
      this.cursorGlow.style.width = "80px";
      this.cursorGlow.style.height = "80px";
      this.cursorGlow.style.background =
        "radial-gradient(circle, rgba(0,70,135,0.25) 0%, transparent 70%)";
    }
  }

  onLeave() {
    if (!this.cursor) return;
    this.cursor.style.width = "20px";
    this.cursor.style.height = "20px";
    this.cursor.style.borderColor = "#004687";
    this.cursor.style.backgroundColor = "rgba(0,70,135,0.1)";
    this.cursor.style.boxShadow = "0 0 10px rgba(0,70,135,0.2)";
    if (this.cursorGlow) {
      this.cursorGlow.style.width = "60px";
      this.cursorGlow.style.height = "60px";
      this.cursorGlow.style.background =
        "radial-gradient(circle, rgba(0,70,135,0.15) 0%, transparent 70%)";
    }
  }

  watchDarkTheme() {
    const updateTheme = () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      if (this.cursor) {
        this.cursor.style.borderColor = isDark ? "#0066CC" : "#004687";
        this.cursor.style.backgroundColor = isDark
          ? "rgba(0,102,204,0.1)"
          : "rgba(0,70,135,0.1)";
        this.cursor.style.boxShadow = isDark
          ? "0 0 15px rgba(0,102,204,0.3)"
          : "0 0 10px rgba(0,70,135,0.2)";
      }
      if (this.cursorGlow) {
        this.cursorGlow.style.background = isDark
          ? "radial-gradient(circle, rgba(0,102,204,0.2) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(0,70,135,0.15) 0%, transparent 70%)";
      }
    };
    updateTheme();
    document.addEventListener("themeChanged", updateTheme);
  }

  destroy() {
    if (this.cursor?.parentNode) this.cursor.parentNode.removeChild(this.cursor);
    if (this.cursorGlow?.parentNode)
      this.cursorGlow.parentNode.removeChild(this.cursorGlow);
    document.body.style.cursor = "auto";
  }
}
