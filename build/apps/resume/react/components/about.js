MyComponents.About = React.createClass({

  render: function() {
    return (
      <div>
        <div className="row">
          <h3 className="center-align">Welcome!</h3>
          <div className="col s3">
            <img src="images/portrait.jpg" style={{width:"200px"}}/>
          </div>
          <div className="col s9">
            <h4>Emily Randall</h4>
            <p>Degree: Bachelors of Science, Engineering Physics, anticipated May 2016</p>
            <p>Degree: Bachelors of Science, Computer Science, anticipated May 2016</p>
            <p><a href="https://github.com/EmilyRandall">Github</a></p>
          </div>
        </div>
        <div className="row">
          <div className="col s4">
            <div className="card">
              <div className="card-image">
                <a href="#resume" id="resume"><img src="images/boulder.jpg" /></a>
                <span className="card-title">Skills</span>
              </div>
              <div className="card-content">
                <p>My skills</p>
              </div>
            </div>
          </div>
          <div className="col s4">
            <div className="card">
              <div className="card-image">
                <a href="#tasks" id="tasks"><img src="images/milky-way.jpg" /></a>
                <span className="card-title">Tasks</span>
              </div>
              <div className="card-content">
                <p>Todo list</p>
              </div>
            </div>
          </div>
          <div className="col s4">
            <div className="card">
              <div className="card-image">
                <a href="#cities" id="cities"><img src="images/clearing-storm.jpg" /></a>
                <span className="card-title">Cities</span>
              </div>
              <div className="card-content">
                <p>Favorite cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
