export class SVGScene {
  constructor() {
    this.svgWrapper = document.getElementById("svgBackground");
    this.svgObject = document.getElementById("backgroundSVG");
    if (!this.svgWrapper || !this.svgObject) return;

    this.rafId = null;
    this.scrollProgress = 0;
    this.targetOpacity = 0.9;
    this.currentOpacity = 0.9;
    this.targetTranslate = 0;
    this.currentTranslate = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.currentMouseX = 0;
    this.currentMouseY = 0;

    this.svgObject.addEventListener("load", () => this.boot());
    setTimeout(() => {
      if (this.svgObject.contentDocument) this.boot();
    }, 3000);
  }

  boot() {
    const svg = this.svgObject.contentDocument?.querySelector("svg");
    if (!svg) return;

    const updateSVG = () => {
      const translateY = this.scrollProgress * 80;
      const scale = 1 + this.scrollProgress * 0.02;
      const rotate = this.scrollProgress * 1.5;

      this.currentOpacity += (this.targetOpacity - this.currentOpacity) * 0.05;
      this.currentTranslate +=
        (this.targetTranslate - this.currentTranslate) * 0.05;
      this.currentMouseX += (this.mouseX - this.currentMouseX) * 0.05;
      this.currentMouseY += (this.mouseY - this.currentMouseY) * 0.05;

      let transform = `translateY(${this.currentTranslate}px) scale(${scale}) rotate(${rotate}deg)`;

      if (this.scrollProgress > 0.1) {
        const intensity = Math.min(1, this.scrollProgress * 2);
        transform += ` translate(${this.currentMouseX * 3 * intensity}px, ${this.currentMouseY * 3 * intensity}px)`;
      }

      svg.style.transform = transform;
      svg.style.opacity = Math.min(0.9, this.currentOpacity);

      if (this.scrollProgress > 0.3) {
        const blur = (this.scrollProgress - 0.3) * 3;
        svg.style.filter = `blur(${Math.min(blur, 3)}px)`;
      } else {
        svg.style.filter = "blur(0px)";
      }

      const layers = svg.querySelectorAll("g[filter], g:not([filter])");
      layers.forEach((layer, index) => {
        const speed = 0.1 + (index % 3) * 0.05;
        layer.style.transform = `translateY(${this.scrollProgress * 40 * speed}px)`;
      });

      const nodes = svg.querySelectorAll(
        "#networkNode, #networkNodeMagenta, .networkNode"
      );
      nodes.forEach((node, i) => {
        const delay = i * 0.02;
        const progress = Math.max(
          0,
          Math.min(1, (this.scrollProgress - delay) / (1 - delay))
        );
        const glowSize = 12 + progress * 15;
        const glowOpacity = 0.3 + progress * 0.4;
        node.querySelectorAll("circle").forEach((circle) => {
          const r = circle.getAttribute("r");
          if (r && parseFloat(r) > 8) {
            circle.setAttribute("r", glowSize);
            circle.setAttribute("opacity", glowOpacity);
          }
        });
      });

      const pulses = svg.querySelectorAll("animateMotion");
      pulses.forEach((pulse) => {
        const speed = 4 + this.scrollProgress * 8;
        const dur = parseFloat(pulse.getAttribute("dur"));
        if (dur > 2) pulse.setAttribute("dur", Math.max(2, speed));
      });

      this.rafId = requestAnimationFrame(updateSVG);
    };

    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight =
          document.documentElement.scrollHeight - windowHeight;
        const aboutSection = document.querySelector("#about");
        if (!aboutSection) return;
        const aboutOffset = aboutSection.offsetTop - windowHeight * 0.3;
        const raw =
          (scrollY - aboutOffset) / (docHeight - aboutOffset);
        this.scrollProgress = Math.max(0, Math.min(1, raw));
        this.targetOpacity = 0.1 + this.scrollProgress * 0.8;
        this.targetTranslate = this.scrollProgress * 80;
      },
      { passive: true }
    );

    document.addEventListener("mousemove", (e) => {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    document.addEventListener("themeChanged", () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      svg.style.opacity = isDark ? "0.6" : "0.9";
    });

    updateSVG();
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
