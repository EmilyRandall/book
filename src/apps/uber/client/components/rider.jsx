var Rider = React.createClass( {

  getInitialState() {
    return {isSubmitted: false, destination: ""};
  },

  render(){
    if (this.state.isSubmitted) {
      var drivers = {};
      var thisNode = this;
      _.keys(this.props.drivers).forEach(function(key) {
        if (thisNode.props.drivers[key].dest === thisNode.state.destination) {
          drivers[key] = thisNode.props.drivers[key];
        }
      });
      return <MyComponents.UserList users={drivers} title="Potential Drivers" seatName="Available seats"/>
    }
    else {
      return (
        <div className="row" id="rider-form">
          <p className="center-align"><b>Find a Ride</b></p>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input id="first_name" type="text" className="validate" />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s6">
                <input id="last_name" type="text" className="validate" />
                <label htmlFor="last_name">Last Name</label>
              </div>
            </div>
            <div className="input-field col s12">
              <input id="address" type="text" className="validate" />
              <label htmlFor="address">Address</label>
            </div>
            <label htmlFor="departSlider">Departure Time</label>
            <p className="slider" id="departSlider"></p>
            <label htmlFor="departSlider">Return Time</label>
            <p className="slider" id="returnSlider"></p>
            <div className="input-field col s12">
              <input id="passengers" type="text" className="validate" />
              <label htmlFor="passengers">Number of Travelers</label>
            </div>
            <div className="input-field col s12">
              <select name="dropdown" id="ski-area" defaultValue="">
                <option value="">Choose ski area</option>
                <option value="Winter Park">Winter Park</option>
                <option value="Copper">Copper</option>
                <option value="Keystone">Keystone</option>
                <option value="Vail">Vail</option>
                <option value="Breckenridge">Breckenridge</option>
                <option value="Loveland">Loveland</option>
                <option value="Eldora">Eldora</option>
                <option value="A-Basin">A-Basin</option>
              </select>
            </div>
            <div className="center-align submit"><a className="waves-effect waves-light btn">Submit</a></div>
          </form>
        </div>
      );
    }
  },
  
  componentDidMount() {
    var dslider = document.getElementById('departSlider');
    noUiSlider.create(dslider, {
     start: [6, 7],
     connect: true,
     step: 1,
     range: {
       'min': 5,
       'max': 10
     },
     format: wNumb({
       decimals: 0,
	   postfix: ' AM',
     })
    });
    
    var rslider = document.getElementById('returnSlider');
    noUiSlider.create(rslider, {
     start: [3, 4],
     connect: true,
     step: 1,
     range: {
       'min': 2,
       'max': 9
     },
     format: wNumb({
       decimals: 0,
	   postfix: ' PM',
     })
    });
    
    var root = new Firebase('https://rideski.firebaseio.com/');
    var taskListRef = root.child('Client');
    var geocoder = new google.maps.Geocoder();
    var thisNode = this;

    $('.submit').click(function(){
      var myname = $('#first_name').val() + " " + $('#last_name').val();
      var departure = dslider.noUiSlider.get()[0] + " - " + dslider.noUiSlider.get()[1];
      var dest = $('#ski-area').val();
      var passengers = $('#passengers').val();
      var returnt = rslider.noUiSlider.get()[0] + " - " + rslider.noUiSlider.get()[1];
      
      var address = $('#address').val();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var lat = results[0].geometry.location.lat();
          var lon = results[0].geometry.location.lng();
          
          if (myname !== "" && departure !== "" && dest !== "" && passengers !== "" && returnt !== "") {
            var taskObject = {
                departure: departure,
                dest: dest,
                lat: lat,
                lon: lon,
                name: myname,
                party: passengers,
                returnt: returnt,
                driver: false
            }
      
            var newTaskRef = taskListRef.push();
            newTaskRef.set(taskObject);
            
            thisNode.setState({isSubmitted: true, destination: dest});
          }
          else {
            Materialize.toast('Please fill in every part of the form', 4000);
          }
          
        } else {
          Materialize.toast('Please enter a valid address', 4000);
        }
      });
    });
  }
});

MyComponents.Rider = Rider