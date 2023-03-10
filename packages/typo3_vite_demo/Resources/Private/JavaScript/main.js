import 'vite/modulepreload-polyfill';
import '../Scss/main.scss';
import { preload } from './Utilities/preload.js';
import { MainNav } from './Components/MainNav.js';

preload();
MainNav();
