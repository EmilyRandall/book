var map;
var drivers = {};
var riders = {};
function initMap(mapDiv) {
  var denver = {lat: 39.73, lng: -104.98};
  //var boulder = {lat: 40.03, lng: -105.25};
  map = new google.maps.Map(mapDiv, {
    center: denver,
    zoom: 8
  });
  
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

function showClients(clients, areDrivers) {
  if (areDrivers) {
    Object.keys(clients).forEach(function(key) {
      if (!(key in drivers)) {
        var driver = clients[key];
        var marker = new google.maps.Marker({
          map: map,
          position: {'lat': driver['lat'], 'lng': driver['lon']}
        });
        var infowindow = new google.maps.InfoWindow({
          content: '<p>' + driver['name'] + '</p><p>Destination: ' + driver['dest'] + '</p><p>Open seats: ' + driver['seating'] + '</p>'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        drivers[key] = marker;
      }
    });
    Object.keys(drivers).forEach(function(key) {
      if (!(key in clients)) {
        drivers[key].setMap(null);
      }
    });
  }
  else {
    Object.keys(clients).forEach(function(key) {
      if (!(key in riders)) {
        var rider = clients[key];
        var marker = new google.maps.Marker({
          map: map,
          position: {'lat': rider['lat'], 'lng': rider['lon']}
        });
        var infowindow = new google.maps.InfoWindow({
          content: '<p>' + rider['name'] + '</p><p>Destination: ' + rider['dest'] + '</p><p>Passengers: ' + rider['party'] + '</p>'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        riders[key] = marker;
      }
    });
    Object.keys(riders).forEach(function(key) {
      if (!(key in clients)) {
        riders[key].setMap(null);
      }
    });
  }
}