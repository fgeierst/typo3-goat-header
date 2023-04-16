import 'vite/modulepreload-polyfill';
import '../Scss/main.scss';
import { preload } from './Utilities/preload.js';
import { ExpandingNav } from './Components/ExpandingNav.js';

preload();

new ExpandingNav({
  rootElement: document.querySelector(".mobile-menu"),
  buttonSelector: ".mobile-menu__toggle-button",
});

new ExpandingNav({
  rootElement: document.querySelector(".mainnav"),
  buttonSelector: ".mainnav__button, .mainnav__close",
  closeButtonSelector: ".mainnav__close",
  hover: true
});


