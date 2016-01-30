//var markersLayerGroup;
var map;
var marker;
var infowindow;

function initMap(){
  /*var attributionText = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a       href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
  
  // initialize the map
  map = L.map($('#map')[0]).setView([39.73, -104.98], 6);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: attributionText,
      maxZoom: 18,
      id: 'doubleshow.noeko77m',
      accessToken: 'pk.eyJ1IjoiZG91Ymxlc2hvdyIsImEiOiJjaWZ5Y3B1eTE1MHRidWRtMG9uZXluajg4In0.u5ONW27Ly5cU7M5KYi6Y9Q'
  }).addTo(map);
  
  // create a layer group to hold all the markers
  markersLayerGroup = L.layerGroup();
  // add the makers layer group to the map
  markersLayerGroup.addTo(map);*/
  var mapDiv = document.getElementById('map');
  if (mapDiv) {
    var latlng = {lat: 39.73, lng: -104.98};
    map = new google.maps.Map(mapDiv, {
      center: latlng,
      zoom: 7
    });
    marker = new google.maps.Marker({
      map: map,
      position: latlng
    });
    infowindow = new google.maps.InfoWindow({
      content: '<img src="images/icons/default.png" style="width: 60px" />'
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }

}

// visualize cities on the map
function mapCity(city, name){
  /*markersLayerGroup.clearLayers();
  var latlng = [city.latitude, city.longitude];
  map.setView(latlng, 6);
  var icon = city.currently.icon !== undefined ? city.currently.icon + '.png' : 'default.png';
  var popup = '<img src="images/icons/' + icon + '" style="width: 60px" />'
  L.marker(latlng).bindPopup(popup).addTo(map);*/
  // Create a marker and set its position.
  var icon = city.currently.icon !== undefined ? city.currently.icon + '.png' : 'default.png';
  var popup = '<img src="images/icons/' + icon + '" style="width: 60px" />';
  marker.setPosition({lat: city.latitude, lng: city.longitude});
  infowindow.setContent(popup);
  map.setCenter(marker.getPosition());
}

function displayCity(city, cityString, name){
  $('#city-title').html(name + ' Weather<i class="material-icons right">more_vert</i>');
  $('#city-title-expanded').html(name + ' Weather<i class="material-icons right">close</i>');
  $('#city-image').attr('src', 'images/' + cityString + '.jpg');
  var info = "<p>Current conditions: " + city.currently.summary + "</p>";
  info += "<p>Temperature: " + city.currently.temperature + " &#8457;</p>";
  info += "<p>Wind speed: " + city.currently.windSpeed + " mph</p>";
  info += "<p>Daily forecast: " + city.daily.data[0].summary + "</p>";
  info += "<p>Weekly forecast: " + city.daily.summary + "</p>";
  $('#city-info').html(info);
}