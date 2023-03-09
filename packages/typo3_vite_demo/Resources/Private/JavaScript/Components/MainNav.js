export const MainNav = () => {
  const button = document.querySelector(".main-nav__button");
  const header = document.querySelector(".header");

  // Toggle aria-expanded attribute
  button.addEventListener("click", (e) => {
    // aria-expanded="true" signals that the menu is currently open
    const isOpen = header.getAttribute("data-nav-expanded") === "true";
    header.setAttribute("data-nav-expanded", !isOpen);
    button.setAttribute("aria-expanded", !isOpen);
  });

  // Hide list on keydown Escape
  button.addEventListener("keyup", (e) => {
    console.log("keyup", e);
    if (e.code === "Escape") {
      header.setAttribute("data-nav-expanded", false);
      button.setAttribute("aria-expanded", false);
    }
  });

}
