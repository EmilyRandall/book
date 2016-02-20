var map;
var drivers = {};
var riders = {};
var both = {};
var users = {};
var costs = {"Winter Park": "$20",
            "Copper": "$25",
            "Keystone": "$20",
            "Vail": "$30",
            "Breckenridge": "$25",
            "Loveland": "$15",
            "Eldora": "$15",
            "A-Basin": "$20"};
            
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

function getCost(name) {
  if (name in costs) {
    return costs[name];
  }
  else {
    return "Cost unknown";
  }
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
    var c = clients[key];
    if (!(key in dict)) {
      var seats = c['driver'] ? 'Open seats' : 'Passengers';
      var icon = c['driver'] ? '../images/blue-marker.png' : '../images/red-marker.png';
      var cost = c['driver'] ? '<p>Cost: ' + getCost(c['dest']) + '</p>' : '';
      var marker = new google.maps.Marker({
        map: map,
        position: {'lat': c['lat'], 'lng': c['lon']},
        icon: icon
      });
      var infowindow = new google.maps.InfoWindow({
        content: '<p>' + c['name'] + '</p><p>Destination: ' + c['dest'] + '</p><p>' + seats + ': ' + c['party'] + '</p>' + cost
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      dict[key] = marker;
    }
    else {
      var oldPos = dict[key].getPosition();
      if (oldPos.lat() !== c.lat || oldPos.lng !== c.lon) {
        dict[key].setPosition({lat: c.lat, lng: c.lon});
      }
    }
  });
  Object.keys(dict).forEach(function(key) {
    if (!(key in clients)) {
      dict[key].setMap(null);
      delete dict[key];
    }
  });
}

function showActiveUsers(currentUsers) {
  Object.keys(currentUsers).forEach(function(key) {
    var user = currentUsers[key];
    if (!(key in users)) {
      var marker = new google.maps.Marker({
        map: map,
        position: {'lat': user.pos[0], 'lng': user.pos[1]},
        icon: '../images/green-marker.png'
      });
      var name = user.displayName === undefined ? user.username : user.displayName;
      var infowindow = new google.maps.InfoWindow({
        content: '<p>' + name + '</p>'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      users[key] = marker;
    }
    else {
      var oldPos = users[key].getPosition();
      if (oldPos.lat() !== user.pos[0] || oldPos.lng !== user.pos[1]) {
        users[key].setPosition({'lat': user.pos[0], 'lng': user.pos[1]});
      }
    }
  });
  Object.keys(users).forEach(function(key) {
    if ((key in currentUsers) && currentUsers[key].status !== 'online') {
      users[key].setMap(null);
      delete users[key];
    }
  });
}