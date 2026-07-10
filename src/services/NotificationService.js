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

    Object.assign(el.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "16px 20px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      zIndex: "9999",
      minWidth: "300px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease-in-out",
      backgroundColor:
        type === "success"
          ? "#10b981"
          : type === "error"
            ? "#ef4444"
            : "#3b82f6",
    });

    document.body.appendChild(el);
    setTimeout(() => {
      el.style.transform = "translateX(0)";
    }, 100);

    const closeBtn = el.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => this.remove(el));

    setTimeout(() => this.remove(el), 5000);
  }

  remove(el) {
    el.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 300);
  }
}

export const notify = new NotificationService();
