
// function menuAus() {
var box = document.querySelector(".menuToggle");

// Detect all clicks on the document
document.addEventListener("click", function(event) {
  // If user clicks inside the element, do nothing
  if (event.target.closest(".menuToggle")) return;
document.getElementById("nav-trigger").checked = false;
  // If user clicks outside the element, hide it!
  //box.classList.add("js-is-hidden");
});
function uncheck() {
  document.getElementById("nav-trigger").checked = false;
  document.getElementById("chbx1").checked = false;
  document.getElementById("chbx2").checked = false;
};
function uncheck2() {
  document.getElementById("nav-trigger").checked = false;
  document.getElementById("chbx2").checked = false;
}

