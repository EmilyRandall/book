MyComponents.Rate = React.createClass({
  render: function() {
  
    var desc = this.props.rate.DESC;
    var rr = this.props.rate.RR;
    var beg = this.props.rate.BEG;
    var end = this.props.rate.END;
    var rate = this.props.rate.RATE;
    var rq = this.props.rate.RQ;
    
    
    return (
      <li className="collection-item">{desc} {beg} {end} $<b>{rate}</b> {rq} {rr}</li>
    );
  }
});


MyComponents.GarageRates = React.createClass({
  render: function() {
    
    var rates;
    try{
      rates = this.props.rates.map(function(h,i){
        return <MyComponents.Rate rate={h} key={i}/>
      })
    }
    catch(err){
      rates = [ <MyComponents.Rate rate={this.props.rates} key={0} /> ]
      //rates = Object.keys(this.props.rates).map(function(h,i){
        //return <MyComponents.Rate rate={this.props.rates} key={i}/>
      //})
    }
   

    return (
      <div className="card black lighten">
        <div className="card-content white-text">
          <span className="card-title">Rates</span>
          <ul className="collection black-text">
            {rates}
          </ul>
        </div>
      </div>
    );
  }
});
