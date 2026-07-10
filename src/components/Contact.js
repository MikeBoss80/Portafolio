import { profile } from "../data/profile.js";
import { social } from "../data/social.js";
import { CONFIG } from "../utils/config.js";
import { notify } from "../services/NotificationService.js";

export class Contact {
  constructor() {
    this.container = document.querySelector(".contact-content");
    if (!this.container) return;
    this.render();
    this.bind();
  }

  render() {
    this.container.innerHTML = `
      <div class="contact-card">
        <div class="contact-card-header">
          <i class="fas fa-paper-plane"></i>
          <h3>Trabajemos juntos</h3>
          <p>Estoy abierto a oportunidades freelance, tiempo completo o proyectos de datos.</p>
        </div>

        <div class="contact-card-body">
          <a href="mailto:${CONFIG.email}" class="contact-btn">
            <i class="fas fa-envelope"></i>
            ${CONFIG.email}
          </a>
          <a href="${CONFIG.whatsapp}" class="contact-btn contact-btn--whatsapp" target="_blank" rel="noopener">
            <i class="fab fa-whatsapp"></i>
            WhatsApp
          </a>
          <a href="tel:${CONFIG.phone}" class="contact-btn contact-btn--outline">
            <i class="fas fa-phone"></i>
            ${CONFIG.phoneDisplay}
          </a>
        </div>

        <div class="contact-card-footer">
          <span class="contact-label">Encuéntrame en</span>
          <div class="social-links">
            ${social
              .map(
                (s) => `
              <a href="${s.url}" class="social-link" aria-label="${s.label}" target="_blank" rel="noopener">
                <i class="${s.icon}"></i>
              </a>
            `
              )
              .join("")}
          </div>
        </div>
      </div>

      <form class="contact-form" id="contactForm">
        <div class="form-row">
          <div class="form-group">
            <label for="form-name">Nombre</label>
            <input type="text" id="form-name" name="name" placeholder="Tu nombre" required minlength="2">
            <span class="form-error"></span>
          </div>
          <div class="form-group">
            <label for="form-email">Email</label>
            <input type="email" id="form-email" name="email" placeholder="tu@email.com" required>
            <span class="form-error"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="form-subject">Asunto</label>
          <input type="text" id="form-subject" name="subject" placeholder="¿De qué se trata?" required minlength="5">
          <span class="form-error"></span>
        </div>
        <div class="form-group">
          <label for="form-message">Mensaje</label>
          <textarea id="form-message" name="message" rows="5" placeholder="Cuéntame sobre tu proyecto..." required minlength="10"></textarea>
          <span class="form-error"></span>
        </div>
        <button type="submit" class="btn btn-primary btn-submit">
          <span class="btn-text">Enviar mensaje</span>
          <span class="btn-loader" style="display:none"><i class="fas fa-spinner fa-spin"></i></span>
        </button>
      </form>
    `;
  }

  bind() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => this.handleSubmit(e));
    form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("blur", () => this.validateField(field));
      field.addEventListener("input", () => this.clearError(field));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    this.clearError(field);

    switch (name) {
      case "name":
        if (!value) return this.showError(field, "El nombre es requerido");
        if (value.length < 2)
          return this.showError(field, "Mínimo 2 caracteres");
        break;
      case "email":
        if (!value) return this.showError(field, "El email es requerido");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return this.showError(field, "Email inválido");
        break;
      case "subject":
        if (!value) return this.showError(field, "El asunto es requerido");
        if (value.length < 5)
          return this.showError(field, "Mínimo 5 caracteres");
        break;
      case "message":
        if (!value) return this.showError(field, "El mensaje es requerido");
        if (value.length < 10)
          return this.showError(field, "Mínimo 10 caracteres");
        break;
    }
    return true;
  }

  showError(field, msg) {
    const err = field.parentNode.querySelector(".form-error");
    if (err) {
      err.textContent = msg;
      err.classList.add("show");
    }
    field.style.borderColor = "#ef4444";
    return false;
  }

  clearError(field) {
    const err = field.parentNode.querySelector(".form-error");
    if (err) err.classList.remove("show");
    field.style.borderColor = "";
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector(".btn-submit");
    const btnText = btn.querySelector(".btn-text");
    const btnLoader = btn.querySelector(".btn-loader");

    let valid = true;
    form.querySelectorAll("input, textarea").forEach((f) => {
      if (!this.validateField(f)) valid = false;
    });
    if (!valid) return;

    btnText.textContent = "Enviando...";
    btnLoader.style.display = "inline";
    btn.disabled = true;

    try {
      const formData = new FormData(form);
      formData.append("access_key", CONFIG.web3forms.accessKey);
      formData.append("from_name", formData.get("name"));

      const res = await fetch(CONFIG.web3forms.endpoint, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        notify.show("¡Mensaje enviado exitosamente!", "success");
        form.reset();
      } else {
        notify.show("Error al enviar. Intenta de nuevo.", "error");
      }
    } catch {
      notify.show("Error de conexión. Intenta de nuevo.", "error");
    } finally {
      btnText.textContent = "Enviar mensaje";
      btnLoader.style.display = "none";
      btn.disabled = false;
    }
  }

  destroy() {
    // cleanup
  }
}
