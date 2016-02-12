class App extends React.Component {
  render(){
    var clients = $.extend({}, this.props.data.riders, this.props.data.drivers);
    return <div>
      <MyComponents.NavBar />
      <div className="container main">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <MyComponents.Map src="both" clients={clients} id="driverMap" title="Current drivers and passengers"/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <div className="card">
              <MyComponents.UserList users={this.props.data.riders} title="Riders" seatName="Passengers"/>
            </div>
          </div>
          <div className="col s6">
            <div className="card">
              <MyComponents.UserList users={this.props.data.drivers} title="Drivers" seatName="Available seats"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

MyComponents.App = App
