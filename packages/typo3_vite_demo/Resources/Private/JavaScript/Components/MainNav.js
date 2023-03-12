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


/**
* Level Two Nav.
* Add event listeners that toggle the Level Two Nav on desktop.
*/
export function LevelTwoNav() {
  const buttons = document.querySelectorAll(".level-two-nav__toggle");
  buttons.forEach(button => button.addEventListener("click", handleLevelTwoClick));
}

function handleLevelTwoClick(event) {
  // Get state of current button.
  const currentButton = event.currentTarget;
  const isCurrentOpen = currentButton.getAttribute("aria-expanded") === "true";

  // Close all button.
  const buttons = document.querySelectorAll(".level-two-nav__toggle");
  let isOtherButtonOpen = false;
  buttons.forEach(button => {
    if (button.getAttribute("aria-expanded") === "true" && button !== currentButton) {
      isOtherButtonOpen = true;
    }
  });

  // Omit transition if nav is already expanded.
  const mainNav = document.querySelector(".main-nav");
  if (isOtherButtonOpen) {
    mainNav.style.setProperty('--main-nav-animation-timing', 0);
  } else {
    mainNav.style.removeProperty('--main-nav-animation-timing');
  }

  buttons.forEach(button => {
    if (button !== currentButton) {
      button.setAttribute("aria-expanded", false);
    } else {
      button.setAttribute("aria-expanded", !isCurrentOpen);
    }
  });
}


