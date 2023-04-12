import 'vite/modulepreload-polyfill';
import '../Scss/main.scss';
import { preload } from './Utilities/preload.js';
import { ExpandingNav } from './Components/ExpandingNav.js';

preload();

new ExpandingNav({
  rootElement: document.querySelector(".header"),
  buttonSelector: ".mainnav__button, .search__button",
});

new ExpandingNav({
  rootElement: document.querySelector(".subnav"),
  buttonSelector: ".subnav__button, .subnav__close",
  closeButtonSelector: ".subnav__close",
  hover: true
});


