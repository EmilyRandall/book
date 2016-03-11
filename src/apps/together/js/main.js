$(document).ready(function() {
  if (window.location.hash === '') {
    window.location.hash = 'login';
    showPage('login');
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
  var hash = window.location.hash.slice(1);
  gameKey = getURLParameter('key');
  showPage(hash);
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