var map;
var drivers = {};
var riders = {};
var both = {};
function initMap(mapDiv, legendDiv) {
  var denver = {lat: 39.73, lng: -104.98};
  //var boulder = {lat: 40.03, lng: -105.25};
  map = new google.maps.Map(mapDiv, {
    center: denver,
    zoom: 8
  });
  
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);
  
  /*var directionsDisplay = new google.maps.DirectionsRenderer({
    map: map
  });
  
  // Set destination, origin and travel mode.
  var request = {
    destination: boulder,
    origin: denver,
    travelMode: google.maps.TravelMode.DRIVING
  };

  // Pass the directions request to the directions service.
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map.
      directionsDisplay.setDirections(response);
    }
  });*/
}

function showClients(clients, src) {
  var dict;
  if (src === 'Drivers') {
    dict = drivers;
  }
  else if (src === 'Client') {
    dict = riders;
  }
  else {
    dict = both; 
  }
  show(clients, dict);
}

function show(clients, dict) {
  Object.keys(clients).forEach(function(key) {
    if (!(key in dict)) {
      var c = clients[key];
      var seats = c['driver'] ? 'Open seats' : 'Passengers';
      var icon = c['driver'] ? '../images/blue-marker.png' : '../images/red-marker.png';
      var marker = new google.maps.Marker({
        map: map,
        position: {'lat': c['lat'], 'lng': c['lon']},
        icon: icon
      });
      var infowindow = new google.maps.InfoWindow({
        content: '<p>' + c['name'] + '</p><p>Destination: ' + c['dest'] + '</p><p>' + seats + ': ' + c['party'] + '</p>'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      dict[key] = marker;
    }
  });
  Object.keys(dict).forEach(function(key) {
    if (!(key in clients)) {
      dict[key].setMap(null);
    }
  });
}