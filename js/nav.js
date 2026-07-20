document.querySelectorAll(".fx-nav-toggle").forEach((toggle) => {
  const links = document.getElementById(toggle.getAttribute("aria-controls"));
  if (!links) return;
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    links.classList.toggle("is-open", !isOpen);
  });
});
