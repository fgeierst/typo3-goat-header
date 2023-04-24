import 'vite/modulepreload-polyfill';
import '../Scss/main.scss';
import { preload } from './Utilities/preload.js';
import { ExpandingNav } from './Components/ExpandingNav.js';

preload();

new ExpandingNav({
  rootElement: document.querySelector(".header"),
  buttonSelector: ".header__toggle-button",
});

new ExpandingNav({
  rootElement: document.querySelector(".mainnav"),
  buttonSelector: ".mainnav__toggle-button, .mainnav__close-button",
  closeButtonSelector: ".mainnav__close-button",
  hoverSelector: "[data-hover]",
});


