import { trapFocus } from '../Utilities/trapFocus.js';

/**
* Main Nav.
* Add event listeners that toggle the main nav on mobile.
*/
export function MainNav()  {
  const button = document.querySelector(".main-nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const header = document.querySelector(".header");

  // Toggle data-nav-expanded attribute.
  button.addEventListener("click", (e) => {
    // data-nav-expanded="true" signals that the menu is currently open.
    const isOpen = header.getAttribute("data-nav-expanded") === "true";
    header.setAttribute("data-nav-expanded", !isOpen);
    button.setAttribute("aria-expanded", !isOpen);

    // Trap focus.
    if (isOpen) {
      mainNav.removeEventListener('keydown', trapFocus);
    } else {
      mainNav.addEventListener('keydown', trapFocus);
    }
  });

  // Hide list on keydown Escape.
  document.body.addEventListener("keyup", (e) => {
    if (e.code === "Escape") {
      header.setAttribute("data-nav-expanded", false);
      button.setAttribute("aria-expanded", false);
      mainNav.removeEventListener('keydown', trapFocus);
    }
  });

}


