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
  console.log(getURLParameter('key'));
}

function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
  return "";
}