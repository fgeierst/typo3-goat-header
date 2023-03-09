/**
 * Trap focus.
 * https://hidde.blog/using-javascript-to-trap-focus-in-an-element/
 *
 * @param {Event} event
 * @listens Event
 */

export function trapFocus(event) {
  const focusableEls = event.currentTarget.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  const KEYCODE_TAB = 9;
  const isTabPressed = (event.key === 'Tab' || event.keyCode === KEYCODE_TAB);

  if (!isTabPressed) {
    return;
  }

  if ( event.shiftKey ) /* shift + tab */ {
    if (document.activeElement === firstFocusableEl) {
      lastFocusableEl.focus();
        event.preventDefault();
      }
    } else /* tab */ {
    if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
        event.preventDefault();
      }
    }
}
