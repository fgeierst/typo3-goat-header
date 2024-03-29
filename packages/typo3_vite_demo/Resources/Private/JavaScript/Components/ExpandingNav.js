/**
 * A class that creates an expanding navigation menu.
 * @class
 */
export class ExpandingNav {
	/**
	 * Creates an instance of ExpandingNav.
	 * @param {Object} options - Configuration of the menu.
	 * @param {HTMLElement | null} options.rootElement - Root element of the menu.
	 * @param {string} options.buttonSelector - CSS selector for all clickable menu buttons.
	 * @param {string} [options.closeButtonSelector] - Optional CSS selector for an extra close button.
   * @param {string} [options.hoverSelector] - Optional CSS selector for buttons that toggle on hover.
	 */
  constructor(options) {
    this.rootElement = options.rootElement;
    if (!this.rootElement) {
      throw new Error("rootElement is required");
    }
		this.closeButtonSelector = options.closeButtonSelector;
		this.buttons = Array.from(
			this.rootElement.querySelectorAll(options.buttonSelector)
		);
    this.rootElement.addEventListener("click", this.onClick.bind(this));
    if (options.hoverSelector) { this.addHoverListeners(options.hoverSelector) };
    window.addEventListener("resize", () => { this.switch(false) });
  }


	/**
	 * Handles the click event on the menu buttons.
	 * @param {MouseEvent} event - The click event object.
	 */
  onClick(event) {
		if (!this.buttons.includes(event.target) || this.wasImmediatelyOpened) {
			return;
		}
		event.stopPropagation();
		const isOpen = event.target.getAttribute("aria-expanded") === "true";
		const closeButtonEvent = event.target.matches(this.closeButtonSelector);
		if (isOpen || closeButtonEvent) {
			this.switch(false);
		} else {
			this.switch(event.target);
		}
	}

	/**
	 * Switches between open and closed states of the menu buttons.
	 * @param {HTMLElement | false} nextButton - The next button to open, or false to close all buttons.
	 */
  switch(nextButton) {
		this.buttons.forEach((button) => {
			if (button !== nextButton) {
				this.close(button);
			}
		});
		if (nextButton) {
      this.open(nextButton);
      this.rootElement.setAttribute("data-expanded", "");
    } else {
      this.rootElement.removeAttribute("data-expanded");
    }
  }

	/**
	 * Opens a menu button and adds event listeners for closing it.
	 * @param {HTMLElement} button - The button to open.
	 */
	open(button) {
    button.setAttribute("aria-expanded", "true");
    button.parentElement?.setAttribute("data-expanded", "");
		this.onEscapeKeyBound = this.onEscapeKey.bind(this, button);
    document.addEventListener("keydown", this.onEscapeKeyBound);
    this.onClickOutsideBound = this.onClickOutside.bind(this, button);
		document.addEventListener("click", this.onClickOutsideBound);
  }


	/**
	 * Closes a menu button and removes event listeners for closing it.
	 * @param {HTMLElement} button - The button to close.
	 */
	close(button) {
    button.setAttribute("aria-expanded", "false");
    button.parentElement?.removeAttribute("data-expanded");
    document.removeEventListener("keydown", this.onEscapeKeyBound);
    document.removeEventListener("click", this.onClickOutsideBound);
	}

	/**
	 * Closes a menu button when the escape key is pressed.
	 * @param {HTMLElement} button - The button to close.
	 * @param {KeyboardEvent} event - The keydown event object.
	 */
	onEscapeKey(button, event) {
		if (event.key !== "Escape") {
			return;
		}
		event.preventDefault();
		this.switch(false);
		button.focus();
		event.stopPropagation();
	}

	/**
	 * Closes a menu button when clicked outside of it.
	 * @param {HTMLElement} button - The button to close.
	 * @param {MouseEvent} event - The click event object.
	 */
	onClickOutside(button, event) {
		const isOutside = !button.parentElement?.contains(event.target);
		if (isOutside) {
      this.switch(false);
		}
  }

  /**
   * Adds event listeners for hovering over menu buttons.
   * Only on desktop, hover opens the menu.
   */
  addHoverListeners(selector) {
    const hoverButtons = Array.from(
			this.rootElement.querySelectorAll(selector)
		);
    hoverButtons.forEach((button) => {
      button.addEventListener("mouseenter", (event) => {
        const mediaQuery = window.matchMedia('(min-width: 900px)');
        if (mediaQuery.matches) {
          this.wasImmediatelyOpened = true;
          setTimeout(() => {
            this.wasImmediatelyOpened = false;
          }, 500)
          this.switch(event.target);
        }
      })
    });
  }
}
