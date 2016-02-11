class Map extends React.Component {

  render(){
    return (
      <div>
        <p className="center-align"><b>{this.props.title}</b></p>
        <div id="map" style={{'height':'400px'}}>Map</div>
      </div>
    );
  }
  
  componentDidMount() {
    var mapDiv = document.getElementById('map');
    initMap(mapDiv);
    
    var root = new Firebase('https://rideski.firebaseio.com/');
    var isDriver = this.props.src === 'Drivers';
    root.child(this.props.src).on('value', function(snapshot){
      var clients = snapshot.val();
      showClients(clients, isDriver);
    });
  }

}
MyComponents.Map = Map

