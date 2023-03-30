/**
 * A class that creates an expanding navigation menu.
 * @class
 */
export class ExpandingNav {
	/**
	 * Creates an instance of ExpandingNav.
	 * @param {Object} options - The configuration options for the menu.
	 * @param {HTMLElement} options.rootElement - Root element of the menu.
	 * @param {string} options.backButtonSelector - CSS selector for the button to close a subnav panel.
	 * @param {string} options.inertSelector - CSS selector for elements that can't be focused when the menu is open.
	 * @param {string} options.buttonSelector - The CSS selector for the menu buttons.
	 */
	constructor(options) {
		this.rootElement = options.rootElement;
		this.backButtonSelector = options.backButtonSelector;
		this.inertSelector = options.inertSelector;
		this.buttons = Array.from(
			this.rootElement.querySelectorAll(options.buttonSelector)
		);
		this.rootElement.addEventListener("click", this.onClick.bind(this));
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
		const isBackButton = event.target.matches(this.backButtonSelector);
		if (isOpen || isBackButton) {
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
	 * Adds inert attributes to other elements for focus trapping.
	 * @param {HTMLElement} button - The button to open.
	 */
	open(button) {
		button.setAttribute("aria-expanded", "true");
		this.onEscapeKeyBound = this.onEscapeKey.bind(this, button);
		document.addEventListener("keydown", this.onEscapeKeyBound);
		document.addEventListener("click", this.onClickOutside.bind(this, button), {
			once: true
		});
		document.querySelectorAll(this.inertSelector).forEach((element) => {
			element.setAttribute("inert", "");
		});
	}

	/**
	 * Closes a menu button and removes event listeners for closing it.
	 * Removes inert attributes to release focus.
	 * @param {HTMLElement} button - The button to close.
	 */
	close(button) {
		button.setAttribute("aria-expanded", "false");
		document.removeEventListener("keydown", this.onEscapeKeyBound);
		document.querySelectorAll(this.inertSelector).forEach((element) => {
			element.removeAttribute("inert");
		});
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
}

