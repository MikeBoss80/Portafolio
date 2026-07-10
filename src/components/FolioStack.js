import { courses } from "../data/courses.js";

export class FolioStack {
  constructor() {
    this.container = document.querySelector(".folio-stack");
    if (!this.container) return;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = courses
      .map(
        (c, i) => `
      <div class="folio-item" tabindex="0" role="button" aria-expanded="false">
        <div class="folio-header">
          <span class="folio-num">${String(i + 1).padStart(3, "0")}</span>
          <span class="folio-title">${c.name}</span>
          <span class="folio-chevron"><i class="fas fa-chevron-down"></i></span>
        </div>
        <div class="folio-body">
          <div class="folio-meta">
            <span class="folio-meta-label">Expediente</span>
            <span class="folio-meta-value">${c.platform} · ${c.year}</span>
          </div>
          <p class="folio-desc">${c.description}</p>
          <div class="folio-tags">
            ${c.skills.map((s) => `<span class="folio-tag">${s}</span>`).join("")}
          </div>
          <span class="folio-stamp ${c.stamp === "Aprobado" ? "folio-stamp--approve" : ""}">${c.stamp}</span>
        </div>
      </div>
    `
      )
      .join("");
  }

  bindEvents() {
    this.container.querySelectorAll(".folio-item").forEach((item) => {
      item.addEventListener("click", () => this.toggle(item));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggle(item);
        }
      });
    });
  }

  toggle(item) {
    const expanded = item.classList.toggle("expanded");
    item.setAttribute("aria-expanded", expanded);
    this.container.querySelectorAll(".folio-item.expanded").forEach((other) => {
      if (other !== item) {
        other.classList.remove("expanded");
        other.setAttribute("aria-expanded", "false");
      }
    });
  }

  destroy() {
    // cleanup
  }
}
