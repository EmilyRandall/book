class User extends React.Component {

  render(){

    if (this.props.user){
      // user is authenticated
      var name = this.props.user.displayName === undefined ? this.props.user.username : this.props.user.displayName;
      return (
        <div className="center-align">
          <div className="row">
            <div className="col s2 left-align">
              <a className="modal-trigger" id="modal-trigger" href="#" onClick={openModal}>Set location</a>
            </div>
            <div className="col s8">
              <div className="chip" style={{'height': '45px', 'fontSize': '275%'}}>
                <img src={this.props.user.imgUrl} style={{'height': '45px', 'width': '45px'}}/>
                Hello {name}!
              </div>
            </div>
            <div className="col s2 right-align">
              <a href="#" onClick={this.props.actions.logout}>Logout</a>
            </div>
          </div>
          <div id="modal1" className="modal">
            <div className="modal-content">
              <h4>Set location</h4>
              <div className="input-field">
                <input id="user-address" type="text" className="validate" />
                <label htmlFor="user-address">Address</label>
              </div>
            </div>
            <div className="modal-footer">
              <a href="#!" id="change-loc" onClick={changeLocation} className="modal-action waves-effect waves-blue btn-flat">Submit</a>
            </div>
          </div>
        </div> )
    } else {
      // user is not set
      return <div className="center-align">
        <h4>You are not logged in yet.</h4>
        <a href="#" onClick={this.props.actions.login}>Login via Github</a>
      </div>
    }
  }
  
  componentDidMount() {
    var thisNode = this;
    changeLocation = function() {
      var address = $('#user-address').val();
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var lat = results[0].geometry.location.lat();
          var lon = results[0].geometry.location.lng();
          thisNode.props.actions.setUserLocation({lat: lat, lng: lon});
          $('#modal1').closeModal();
        }
        else {
          Materialize.toast('Please enter a valid address', 4000);
        }
      });
    }
  }
}

var openModal = function() {
  $('#modal1').openModal();
}

var changeLocation;

MyComponents.User = User
