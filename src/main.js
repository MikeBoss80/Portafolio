import { ThemeService } from "./services/ThemeService.js";
import { ScrollSpy } from "./services/ScrollSpy.js";
import { NotificationService } from "./services/NotificationService.js";
import { Navbar } from "./components/Navbar.js";
import { Hero } from "./components/Hero.js";
import { About } from "./components/About.js";
import { Experience } from "./components/Experience.js";
import { Carousel3D } from "./components/Carousel3D.js";
import { FolioStack } from "./components/FolioStack.js";
import { Languages } from "./components/Languages.js";
import { Terminal } from "./components/Terminal/Terminal.js";
import { Contact } from "./components/Contact.js";
import { BackToTop } from "./components/BackToTop.js";
import { Loader } from "./components/Loader.js";
import { ThreeScene } from "./effects/ThreeScene.js";
import { GSAPAnimations } from "./effects/GSAPAnimations.js";
import { CursorFX } from "./effects/CursorFX.js";
import { SVGScene } from "./effects/SVGScene.js";
import { ScrollReveal } from "./effects/ScrollReveal.js";
import "../styles/effects.css";

class App {
  constructor() {
    this.services = {};
    this.components = {};
    this.effects = {};
    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.boot());
    } else {
      this.boot();
    }
  }

  boot() {
    this.services.notify = new NotificationService();
    this.services.theme = new ThemeService();
    this.services.scroll = new ScrollSpy();

    this.components.navbar = new Navbar();
    this.components.hero = new Hero();
    this.components.about = new About();
    this.components.experience = new Experience();
    this.components.carousel = new Carousel3D();
    this.components.folioStack = new FolioStack();
    this.components.languages = new Languages();
    this.components.terminal = new Terminal();
    this.components.contact = new Contact();
    this.components.backToTop = new BackToTop();
    this.components.loader = new Loader();
    this.components.scrollReveal = new ScrollReveal();

    this.effects.threeScene = new ThreeScene();
    this.effects.gsap = new GSAPAnimations();
    this.effects.cursor = new CursorFX();
    this.effects.svgScene = new SVGScene();

    console.log("✅ Portafolio inicializado correctamente");
  }
}

const app = new App();
