function createIframe(){
  var youtube = document.createElement("iframe");
  youtube.src = "https://www.youtube.com/embed/El49Bnx505w";
  youtube.allowTransparency = "false"
  youtube.height = "460px"
  youtube.width = "100%"
  youtube.style = "border:none; allowfullscreen;";
  youtube.scrolling = "no";
  document.getElementById("video").appendChild(youtube);
};
if (window.addEventListener)
window.addEventListener("load", createIframe, false);
else if (window.attachEvent)
window.attachEvent("onload", createIframe);
else window.onload = createIframe;