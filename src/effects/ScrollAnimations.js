import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class ScrollAnimations {
  constructor() {
    if (window.innerWidth < 768) return;
    this.init();
  }

  init() {
    this.about();
    this.skills();
    this.projects();
    this.formacion();
    this.contact();
    this.parallax();
  }

  about() {
    gsap.utils.toArray(".stat-item").forEach((stat, i) => {
      gsap.from(stat, {
        scrollTrigger: { trigger: stat, start: "top 80%", toggleActions: "play none none none" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: "power3.out",
      });
    });

    gsap.from(".about-description", {
      scrollTrigger: { trigger: ".about-text", start: "top 80%", toggleActions: "play none none none" },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }

  skills() {
    document.querySelectorAll(".skill-category").forEach((category, i) => {
      gsap.from(category, {
        scrollTrigger: { trigger: category, start: "top 85%", toggleActions: "play none none none" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power3.out",
      });

      category.querySelectorAll(".skill-bar").forEach((bar, j) => {
        const percentage = bar.getAttribute("data-percentage");
        gsap.from(bar, {
          scrollTrigger: { trigger: bar, start: "top 90%", toggleActions: "play none none none" },
          width: "0%",
          duration: 1.2,
          delay: 0.2 + j * 0.1,
          ease: "power3.inOut",
          onComplete: () => {
            bar.style.width = percentage + "%";
          },
        });
      });
    });
  }

  projects() {
    gsap.from(".carousel-3d", {
      scrollTrigger: { trigger: "#projects", start: "top 85%", toggleActions: "play none none none" },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }

  formacion() {
    document.querySelectorAll(".folio-item").forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: "#formacion", start: "top 85%", toggleActions: "play none none none" },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: "power3.out",
      });
    });
  }

  contact() {
    document.querySelectorAll(".contact-item").forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power3.out",
      });
    });

    gsap.from(".contact-form", {
      scrollTrigger: { trigger: ".contact-form", start: "top 85%", toggleActions: "play none none none" },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }

  parallax() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    gsap.to(".hero-background", {
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
      y: 100,
      scale: 1.1,
      opacity: 0.3,
    });

    const threeContainer = document.getElementById("threeContainer");
    if (threeContainer) {
      gsap.to(threeContainer, {
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
        opacity: 0.15,
        scale: 0.7,
        yPercent: 30,
        ease: "power2.inOut",
      });
    }
  }

  destroy() {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }
}
