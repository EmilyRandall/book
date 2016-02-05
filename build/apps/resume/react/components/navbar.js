MyComponents.NavBar = React.createClass({
  render: function() {
    return (
      <nav>
        <div className="nav-wrapper blue">
          <a href="#welcome" className="brand-logo" style={{marginLeft:'15px'}} id="Home">Home</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#resume">Skills</a></li>
            <li><a href="#tasks">Tasks</a></li>
            <li><a href="#cities">Favorite Cities</a></li>
          </ul>
        </div>
      </nav>
    );
  }
});
