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
  if (window.location.hash === '#cities') {
    showPage('cities', function() {
      initMap();
    });
  }
  else {
    showPage(window.location.hash.slice(1));
  }
}