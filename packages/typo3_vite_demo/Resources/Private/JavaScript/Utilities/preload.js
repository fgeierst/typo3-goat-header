/**
* Remove .preload after page has loaded.
* This prevents unwanted CSS transitions firing on page load.
*/
export function preload() {
  window.addEventListener("load", () => {
  document.querySelectorAll(".preload").forEach((element) => {
    element.classList.remove("preload");
  });
})
}
