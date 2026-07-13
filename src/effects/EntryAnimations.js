import gsap from "gsap";

export class EntryAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.heroTimeline();
    this.navbarStagger();
  }

  heroTimeline() {
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroButtons = document.querySelector(".hero-buttons");

    if (!heroTitle) return;

    gsap.set(".hero", { opacity: 1 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

    tl.from(heroTitle, { y: 100, opacity: 0, duration: 1.5 })
      .from(heroSubtitle, { y: 50, opacity: 0, duration: 1 }, "-=0.5")
      .from(heroButtons, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5");
  }

  navbarStagger() {
    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.5,
      ease: "power3.out",
    });
  }

  destroy() {
    // entry animations run once, no cleanup needed
  }
}
