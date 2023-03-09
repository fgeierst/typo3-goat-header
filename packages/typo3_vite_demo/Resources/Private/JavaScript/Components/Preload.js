/**
* Remove .preload after page has loaded
* to prevent CSS transitions firing once on page load
*/
export function Preload() {
window.addEventListener("load", () => {
  document.querySelector(".preload").classList.remove("preload");
})
}
