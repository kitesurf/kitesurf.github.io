// Menu toggle and click-outside handler
function menuAus() {
  var navTrigger = document.getElementById("nav-trigger");
  if (navTrigger) {
    navTrigger.checked = false;
  }
}

function uncheck() {
  var navTrigger = document.getElementById("nav-trigger");
  var chbx1 = document.getElementById("chbx1");
  var chbx2 = document.getElementById("chbx2");
  if (navTrigger) navTrigger.checked = false;
  if (chbx1) chbx1.checked = false;
  if (chbx2) chbx2.checked = false;
}

function uncheck2() {
  var navTrigger = document.getElementById("nav-trigger");
  var chbx2 = document.getElementById("chbx2");
  if (navTrigger) navTrigger.checked = false;
  if (chbx2) chbx2.checked = false;
}

document.addEventListener("click", function(event) {
  var menu = document.querySelector(".menuToggle");
  if (menu && !menu.contains(event.target)) {
    var navTrigger = document.getElementById("nav-trigger");
    if (navTrigger) {
      navTrigger.checked = false;
    }
  }
});
