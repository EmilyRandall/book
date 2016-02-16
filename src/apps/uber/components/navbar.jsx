class NavBar extends React.Component {

  render(){
    var userExists = this.props.user === undefined || this.props.user === null;
    var driverLink = userExists ? "../client/drivers.html" : "../client/drivers.html?user=" + this.props.user.username;
    var riderLink = userExists ? "../client/riders.html" : "../client/riders.html?user=" + this.props.user.username;
    return (
      <nav>
        <div className="nav-wrapper blue darken-4">
        <a href="../index.html" className="brand-logo">RideSki</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href={driverLink}>Drivers</a></li>
          <li><a href={riderLink}>Riders</a></li>
          <li><a href="../admin/index.html">Admin</a></li>           
        </ul>
        </div>
      </nav>
    );
  }

}
MyComponents.NavBar = NavBar
