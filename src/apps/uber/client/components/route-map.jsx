class RouteMap extends React.Component {

  render(){
    return (
      <div id="map" style={{'height':'400px'}}>Map</div>
    );
  }
  
  componentDidMount() {
    var mapDiv = document.getElementById('map');
    var denver = {lat: 39.73, lng: -104.98};
    var boulder = {lat: 40.03, lng: -105.25};
    var map = new google.maps.Map(mapDiv, {
      center: denver,
      zoom: 7
    });
    
    var directionsDisplay = new google.maps.DirectionsRenderer({
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
    });

  }

}
MyComponents.RouteMap = RouteMap

