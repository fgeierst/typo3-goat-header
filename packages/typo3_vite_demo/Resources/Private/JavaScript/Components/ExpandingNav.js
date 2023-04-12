/**
 * A class that creates an expanding navigation menu.
 * @class
 */
export class ExpandingNav {
	/**
	 * Creates an instance of ExpandingNav.
	 * @param {Object} options - Configuration of the menu.
	 * @param {HTMLElement} options.rootElement - Root element of the menu.
	 * @param {string} [options.closeButtonSelector] - Optional CSS selector for an extra close button.
	 * @param {string} options.buttonSelector - CSS selector for all clickable menu buttons.
   * @param {boolean} options.hover - Whether to open on hover.
	 */
  constructor(options) {
		this.rootElement = options.rootElement;
		this.closeButtonSelector = options.closeButtonSelector;
    this.inertSelector = options.inertSelector;
		this.buttons = Array.from(
			this.rootElement.querySelectorAll(options.buttonSelector)
		);
    this.rootElement.addEventListener("click", this.onClick.bind(this));
    if (options.hover) { this.addHoverListeners() };
  }


	/**
	 * Handles the click event on the menu buttons.
	 * @param {MouseEvent} event - The click event object.
	 */
  onClick(event) {
		if (!this.buttons.includes(event.target)) {
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
		}
  }

	/**
	 * Opens a menu button and adds event listeners for closing it.
	 * @param {HTMLElement} button - The button to open.
	 */
	open(button) {
		button.setAttribute("aria-expanded", "true");
		this.onEscapeKeyBound = this.onEscapeKey.bind(this, button);
		document.addEventListener("keydown", this.onEscapeKeyBound);
		document.addEventListener("click", this.onClickOutside.bind(this, button), {
			once: true
    });
  }


	/**
	 * Closes a menu button and removes event listeners for closing it.
	 * @param {HTMLElement} button - The button to close.
	 */
	close(button) {
		button.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", this.onEscapeKeyBound);
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
		const isOutside = !button.parentElement.contains(event.target);
		if (isOutside) {
			this.switch(false);
		}
  }

  /**
   * Adds event listeners for hovering over menu buttons.
   * Only on desktop, hover opens the menu.
   */
  addHoverListeners() {
    this.buttons.forEach((button) => {
      button.addEventListener("mouseenter", (event) => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        if (mediaQuery.matches) {
          this.switch(event.target);
        }
      })
    });
  }
}
