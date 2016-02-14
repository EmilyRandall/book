$(document).ready(function() {
  if (window.location.hash === '') {
    showPage("welcome");
  }
  else {
    hashChange();
  }
});

$(window).bind('hashchange', hashChange);

function showPage(file, completedFunc) {
  $( "#presentation_content" ).load( "./pages/" + file+".html", completedFunc);
}

function hashChange() {
  showPage(window.location.hash.slice(1));
}