class Driver extends React.Component {

  render(){
    return (
      <div className="row">
        <p className="center-align"><b>Sign Up as a Driver</b></p>
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
            <label htmlFor="passengers">Number of Available Seats</label>
          </div>
          <div className="input-field col s12">
            <select name="dropdown" id="ski-area" defaultValue="0">
              <option value="0">Choose ski area</option>
              <option value="1">Winter Park</option>
              <option value="2">Copper</option>
              <option value="3">Keystone</option>
              <option value="4">Vail</option>
              <option value="5">Breckenridge</option>
              <option value="6">Loveland</option>
              <option value="7">Eldora</option>
              <option value="8">A-Basin</option>
            </select>
          </div>
          <div className="center-align submit"><a className="waves-effect waves-light btn">Submit</a></div>
        </form>
      </div>
    );
  }
  
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
  }

}
MyComponents.Driver = Driver