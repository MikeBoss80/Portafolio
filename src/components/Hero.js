import { profile } from "../data/profile.js";

export class Hero {
  constructor() {
    this.container = document.querySelector("#home");
    this.roleElement = this.container?.querySelector(".role");
    this.roles = profile.roles;
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.typeTimer = null;
    this.init();
  }

  init() {
    if (this.roleElement) {
      setTimeout(() => this.type(), 2000);
    }
  }

  type() {
    if (!this.roleElement) return;
    const currentRole = this.roles[this.roleIndex];

    if (!this.isDeleting) {
      this.roleElement.textContent = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;
      if (this.charIndex === currentRole.length) {
        this.isDeleting = true;
        this.typeTimer = setTimeout(() => this.type(), 2000);
        return;
      }
      this.typeTimer = setTimeout(() => this.type(), 100 + Math.random() * 50);
    } else {
      this.roleElement.textContent = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.typeTimer = setTimeout(() => this.type(), 500);
        return;
      }
      this.typeTimer = setTimeout(() => this.type(), 50);
    }
  }

  destroy() {
    if (this.typeTimer) clearTimeout(this.typeTimer);
  }
}
