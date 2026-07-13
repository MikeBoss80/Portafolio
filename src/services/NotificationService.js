export class NotificationService {
  show(message, type = "info") {
    const existing = document.querySelectorAll(".notification");
    existing.forEach((n) => n.remove());

    const el = document.createElement("div");
    el.className = `notification notification-${type}`;
    el.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.classList.add("notification-visible");
    });

    const closeBtn = el.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => this.remove(el));

    setTimeout(() => this.remove(el), 5000);
  }

  remove(el) {
    el.classList.remove("notification-visible");
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 300);
  }
}

export const notify = new NotificationService();
