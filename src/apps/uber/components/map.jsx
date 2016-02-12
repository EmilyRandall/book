class Map extends React.Component {
  
  render(){
    showClients(this.props.clients, this.props.src);
    return (
      <div>
        <p className="center-align"><b>{this.props.title}</b></p>
        <div id={this.props.id} style={{'height':'450px'}}>Map
          <div id="legend" className="card">
            <div className="row valign-wrapper">
              <div className="col s6">
                <img src="../images/red-marker.png" />
              </div>
              <div className="col s6 valign">Riders</div>
            </div>
            <div className="row valign-wrapper">
              <div className="col s6">
                <img src="../images/blue-marker.png" />
              </div>
              <div className="col s6 valign">Drivers</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  componentDidMount() {
    var mapDiv = document.getElementById(this.props.id);
    var legendDiv = document.getElementById('legend');
    initMap(mapDiv, legendDiv);
  }

}
MyComponents.Map = Map

