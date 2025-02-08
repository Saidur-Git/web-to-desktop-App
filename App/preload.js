// preload.js
window.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.innerHTML = `
      ::-webkit-scrollbar:horizontal {
        display: none !important;
      }
      body {
        overflow-x: hidden !important;
      }
    `;
    document.head.appendChild(style);
  });
