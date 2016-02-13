class User extends React.Component {

  render(){

    if (this.props.user){
      // user is authenticated
      return <div className="center-align">
          <h4>Hello {this.props.user.displayName}!</h4>
          <a href="#" onClick={this.props.logoutAction}>Logout</a>
      </div>
    } else {
      // user is not set
      return <div className="center-align">
        <h4>You are not logged in yet.</h4>
        <a href="#" onClick={this.props.loginAction}>Login via Github</a>
      </div>
    }
  }

}
MyComponents.User = User
