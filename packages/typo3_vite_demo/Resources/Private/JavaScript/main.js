import 'vite/modulepreload-polyfill';
import '../Scss/main.scss';
import { preload } from './Utilities/preload.js';
import { ExpandingNav } from './Components/ExpandingNav.js';

preload();

new ExpandingNav({
  rootElement: document.querySelector(".mainnav"),
  buttonSelector: ".mainnav__button",
  inertSelector: "main"
});

new ExpandingNav({
  rootElement: document.querySelector(".subnav"),
  buttonSelector: ".subnav__button, .subnav__close",
  closeButtonSelector: ".subnav__close",
  inertSelector: "main, .logo, .header__metanav, .mainnav__button",
  hover: true
});

new ExpandingNav({
  rootElement: document.querySelector(".header__metanav--desktop > .search"),
  buttonSelector: ".search__button",
  inertSelector: "main"
});
new ExpandingNav({
  rootElement: document.querySelector(".header__metanav--mobile > .search"),
  buttonSelector: ".search__button",
  inertSelector: "main"
});


