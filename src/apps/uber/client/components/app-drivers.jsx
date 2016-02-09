class AppDrivers extends React.Component {
  render(){
    return <div>
      <MyComponents.NavBar actions={this.props.actions}/>
      <div className="container">
        <div className="card">
          <MyComponents.User
              user={this.props.data.user}
              loginAction={this.props.actions.login}
              logoutAction={this.props.actions.logout}/>
        </div>
        <div className="row">
          <div className="col s6">
            <div className="card">
              <MyComponents.Driver
                  user={this.props.data.user}
                  loginAction={this.props.actions.login}
                  logoutAction={this.props.actions.logout}/>
            </div>
          </div>
          <div className="col s6">
            <div className="card">
              <MyComponents.RouteMap
                  providers={this.props.data.providers}
                  center={this.props.data.center}
                  user={this.props.data.user}
                  setUserLocationAction={this.props.actions.setUserLocation}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

MyComponents.App = AppDrivers