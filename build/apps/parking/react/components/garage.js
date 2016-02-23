// Dependencies:
// - MyComponents.GarageSpaces
// - MyComponents.GarageTitle
// - MyComponents.GarageHours
// - MyComponents.GarageRates

MyComponents.Garage = React.createClass({
  render: function() {
    console.log(Object.keys(this.props.garages));
    var thisNode = this;
    var garageList = Object.keys(this.props.garages).map(function(key, i){
      if (key !== '_geofire') {
        return ( <div key={i} className="col s6">
              <GarageCard garage={thisNode.props.garages[key]} />
            </div> );
      }
    });
    
    return (
      <div className="row">
        {garageList}
      </div>
    );
  }
});

var GarageCard = React.createClass({
  render: function() {
    
    return (
      <div className="card light-blue lighten-4">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src="images/banner.jpg" />
        </div>
        <div className="card-content">
          <MyComponents.GarageTitle
            title={this.props.garage.friendlyName} icon="list"/>
        </div>
        <div className="card-reveal">
          <MyComponents.GarageTitle
            title={this.props.garage.friendlyName} icon="close"/>
          <MyComponents.GarageSpaces
            open={this.props.garage.open_spaces}
            total={this.props.garage.total_spaces}/>
          <MyComponents.GarageRates
            rates={this.props.garage.rates}/>
          <MyComponents.GarageHours
            hours={this.props.garage.hours}/>
        </div>
      </div>
    );
  }
});
