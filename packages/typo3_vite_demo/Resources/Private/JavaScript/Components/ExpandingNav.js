
/* TODO
 *  - [x] Fix Focus trapping mobile
 *  - [ ] Handle focus on mobile
 *  - [ ] Prevent transition on page load
 *  - [ ] Mobile escape close only current level (custom close event?)
 */

/*
 * Features
 *   - Focus Trapping
 *   - Click Outside
 *   - Escape key
 *
 * Principles
 *   - CSS Transitions
 *   - State is stored in HTML [aria-expanded] attribute
 *   - No dependencies
 *   - Assuming server rendered HTML (TYPO3, WP, SSG); with client side rendering this would be solved differently.
 */

/**
 * @param {HTMLElement} parent - Parent Element
 * @param {string} buttonSelector - Toggle button selector
 * @param {string} backClass - Back button class
 * @param {string} focusableSelector - Focusable elements selector
 *
 */
export class ExpandingNav {
  constructor(options) {
    this.parent = options.parent;
    this.buttons = Array.from(
      this.parent.querySelectorAll(options.buttonSelector)
    );
    this.backClass = options.backClass;
    this.focusableSelector = options.focusableSelector;
    this.onClickBound = this.onClick.bind(this);
    this.parent.addEventListener("click", this.onClickBound);
  }

  onClick(event) {
    console.log(this.buttons, event.target);

    if (!this.buttons.includes(event.target)) {
      return;
    }
    console.log('is button click');

    event.stopPropagation();
    const isOpen = event.target.getAttribute("aria-expanded") === "true";
    const isBack = event.target.classList.contains(this.backClass);
    if (isOpen || isBack) {
      this.switch(false);
    } else {
      this.switch(event.target);
    }
    if (isBack) {
      const parentButton = event.target.parentNode;
      console.log(parentButton);
    }
  }

  onClickOutside(button, event) {
    const li = button.parentElement;
    const isOutside = !li.contains(event.target);
    if (isOutside) {
      this.switch(false);
    }
  }

  onKeydown(button, event) {
    switch (event.key) {
      case "Escape":
        this.switch(false);
        button.focus();
        event.preventDefault();
        break;
      case "Tab":
        const focusable = this.getFocusableElements(button);
        if (event.shiftKey) {
          if (document.activeElement === focusable.first) {
            focusable.last.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === focusable.last) {
            focusable.first.focus();
            event.preventDefault();
          }
        }
        break;
      default:
    }
  }

  /**
   * @param {HTMLElement | false} nextButton - Next button element or `false` to close all buttons.
   */
  switch(nextButton) {
    this.buttons.forEach((button) => {
      if (button !== nextButton) {
        this.close(button);
      }
    });
    if (nextButton) {
      this.open(nextButton);
    }
  }

  open(button) {
    button.setAttribute("aria-expanded", "true");
    const backButton = button.parentElement.querySelector(`.${this.backClass}`);
    if (backButton) {
      window.setTimeout(() => {
        backButton.focus();
      }, 300);
    }
    this.onKeydownBound = this.onKeydown.bind(this, button);
    document.addEventListener("keydown", this.onKeydownBound);
    this.onClickOutsideBound = this.onClickOutside.bind(this, button);
    document.addEventListener("click", this.onClickOutsideBound);
  }

  close(button) {
    button.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", this.onKeydownBound);
    document.removeEventListener("click", this.onClickOutsideBound);
  }

  getFocusableElements(button) {
    const parent = button.parentElement;
    const focusable = parent.querySelectorAll(this.focusableSelector);
    return {
      all: focusable,
      first: focusable[0],
      last: focusable[focusable.length - 1]
    };
  }
}

