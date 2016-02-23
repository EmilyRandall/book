MyComponents.Hour = React.createClass({
  render: function() {
  
    var beg = this.props.hour.BEG;
    var end = this.props.hour.END;
    var from = this.props.hour.FROM;
    var to = this.props.hour.TO;
    
    return (
      <li className="collection-item">{beg} {end} {from} {to}</li>
    );
  }
});


MyComponents.GarageHours = React.createClass({
  render: function() {
    
    var hours;
    try{
      hours = this.props.hours.map(function(h,i){
        return <MyComponents.Hour hour={h} key={i}/>
      })
    }
    catch(err){
      hours = [ <MyComponents.Hour hour={this.props.hours} key={0} /> ]
      //hours = Object.keys(this.props.hours).map(function(h,i){
        //return <MyComponents.Hour hour={this.props.hours} key={i}/>
      //})
    }
   

    return (
      <div className="card black lighten">
        <div className="card-content white-text">
          <span className="card-title">Hours</span>
          <ul className="collection black-text">
            {hours}
          </ul>
        </div>
      </div>
    );
  }
});
