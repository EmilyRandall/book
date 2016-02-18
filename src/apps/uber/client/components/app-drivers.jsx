class AppDrivers extends React.Component {
  render(){
    return <div>
      <MyComponents.NavBar actions={this.props.actions} user={this.props.data.user}/>
      <div className="container main">
        <div className="card">
          <MyComponents.User
              user={this.props.data.user}
              actions={this.props.actions}/>
        </div>
        <div className="row">
          <div className="col s6">
            <div className="card">
              <MyComponents.Driver
                  user={this.props.data.user}
                  riders={this.props.data.riders}
                  loginAction={this.props.actions.login}
                  logoutAction={this.props.actions.logout}/>
            </div>
          </div>
          <div className="col s6">
            <div className="card">
              <MyComponents.Map
                  title="Riders who need a ride"
                  src="Client"
                  id="map"
                  clients={this.props.data.riders}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

MyComponents.App = AppDrivers