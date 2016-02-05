MyComponents.City = React.createClass({

  render: function() {
    console.log(this.props.city);
    var city = this.props.city;
    var imageName = "images/" + this.props.name + ".jpg";
    var cityName = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);
    return (
      <div className="col s6">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" id="city-image" src={imageName} />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4" id="city-title">{cityName} Weather<i className="material-icons right">more_vert</i></span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4" id="city-title-expanded">{cityName} Weather<i className="material-icons right">close</i></span>
            <p>Current conditions: {city.currently.summary}</p>
            <p>Temperature: {city.currently.temperature} &#8457;</p>
            <p>Wind speed: {city.currently.windSpeed} mph</p>
            <p>Daily forecast: {city.daily.data[0].summary} </p>
            <p>Weekly forecast: {city.daily.summary}</p>
          </div>
        </div>
      </div>
    );
  }

});

MyComponents.CityList = React.createClass({
  render: function() {
    console.log(this.props.cities);
    var thisNode = this;
    var cityElements = Object.keys(this.props.cities).map(function(key,i){
      if (thisNode.props.names.indexOf(key) !== -1) {
        console.log(key);
        return (
          <MyComponents.City city={thisNode.props.cities[key]} name={key} key={i}/>
        )
      }
    });

    return (
      <div id="cities" className="row">
        <h3 className="center-align col s12">My Favorite Cities</h3>
        {cityElements}
      </div>
    );
  }
});
