class NavBar extends React.Component {

  render(){
    return (
      <nav>
        <div className="nav-wrapper blue darken-4">
        <a href="../index.html" className="brand-logo">RideSki</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="../client/drivers.html">Drivers</a></li>
          <li><a href="../client/riders.html">Riders</a></li>
          <li><a href="../admin/index.html">Admin</a></li>           
        </ul>
        </div>
      </nav>
    );
  }

}
MyComponents.NavBar = NavBar
