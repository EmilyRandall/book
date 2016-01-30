$(document).ready(function() { 
  showPage("welcome");
  
  $('.parallax').parallax();
  
  $("#Resume").click(function(){
    showPage('resume');
  });
  $("#Tasks").click(function(){
    showPage('tasks');
  });
  $("#Cities").click(function(){
    showPage('cities', function() {
      initMap();
    });
  });
  $("#Home").click(function(){
    showPage('welcome');
  });
  
});

function showPage(file, completedFunc) {
  $( "#presentation_content" ).load( "./pages/" + file+".html", completedFunc);
}