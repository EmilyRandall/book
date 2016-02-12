class AppRiders extends React.Component {
  render(){
    return <div>
      <MyComponents.NavBar actions={this.props.actions}/>
      <div className="container main">
        <div className="card">
          <MyComponents.User
              user={this.props.data.user}
              loginAction={this.props.actions.login}
              logoutAction={this.props.actions.logout}/>
        </div>
        <div className="row">
          <div className="col s6">
            <div className="card">
              <MyComponents.Rider
                  user={this.props.data.user}
                  loginAction={this.props.actions.login}
                  logoutAction={this.props.actions.logout}/>
            </div>
          </div>
          <div className="col s6">
            <div className="card">
              <MyComponents.Map
                  title="Current Drivers"
                  src="Drivers"
                  id="map"
                  clients={this.props.data.drivers}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

MyComponents.App = AppRiders
