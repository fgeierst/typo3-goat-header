import 'vite/modulepreload-polyfill';
import '../Scss/main.scss';
import { preload } from './Utilities/preload.js';
import { ExpandingNav } from './Components/ExpandingNav.js';

preload();

new ExpandingNav({
  rootElement: document.querySelector(".subnav"),
  buttonSelector: ".subnav__button, .subnav__close",
  closeButtonSelector: ".subnav__close",
  inertSelector: "main, .mainnav__item:not(:has([aria-expanded='true'])), .logo, .header__metanav, .mainnav__button"
});

new ExpandingNav({
  rootElement: document.querySelector(".mainnav"),
  buttonSelector: ".mainnav__button",
  inertSelector: "main"
});

