MyComponents.GarageTitle = React.createClass({
  render: function() {
    return (
      <span className="card-title activator grey-text text-darken-4">{this.props.title}<i className="material-icons right">{this.props.icon}</i></span>
    );
  }
});
