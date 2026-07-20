// Highlights the current page's nav link based on the document URL.
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });
});
