import 'vite/modulepreload-polyfill';
import '../Scss/main.scss';
import { preload } from './Utilities/preload.js';
import { ExpandingNav } from './Components/ExpandingNav.js';

preload();

new ExpandingNav({
  parent: document.querySelector(".sub-nav"),
  buttonSelector: ".level-two-nav__toggle, .level-two-nav__back",
  backClass: "level-two-nav__back",
  focusableSelector: ".level-two-nav__back, .level-two-nav__link"
});

new ExpandingNav({
  parent: document.querySelector(".main-nav"),
  buttonSelector: ".main-nav-toggle",
  backClass: null,
  focusableSelector: ".main-nav-toggle, .sub-nav__button"
});
