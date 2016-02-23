MyComponents.GarageSpaces = React.createClass({
  render: function() {
    
    var open
    return (
      <div className="card black lighten">
        <div className="card-content white-text">
          <span className="card-title">Spaces</span>
          <ul className="collection black-text">
            <li className="collection-item">Open Spaces: {this.props.open}</li>
            <li className="collection-item">Total Spaces: {this.props.total}</li>
          </ul>
        </div>
      </div>

    );
  }
});
