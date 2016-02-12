class UserList extends React.Component {
  render(){
    var seatName = this.props.seatName;
    var list = _.values(this.props.users).map(function(user,i){
      return <MyComponents.Person person={user} seats={seatName} key={i}/>
    });
    return (
      <div className="row">
        <h4 className="center-align">{this.props.title}</h4>
        <ul className="collapsible" data-collapsible="accordion">
        {list}
        </ul>
      </div>
    );
  }
  
  componentDidMount() {
    $('.collapsible').collapsible();
  }
}

MyComponents.UserList = UserList

MyComponents.Person = React.createClass({

  render: function() {
    var person = this.props.person;
    var dep = person.departure.includes('AM') ? person.departure : person.departure + ' AM';
    var ret = person.returnt.includes('PM') ? person.returnt : person.returnt + ' PM';
    var cost = person.driver ? 'Cost: ' + getCost(person.dest) : '';
    return (
      <li>
        <div className="collapsible-header">{person.name}</div>
        <div className="collapsible-body">
          <div className="card blue lighten-3 z-depth-3">
            <div className="card-content">
              Destination: {person.dest}<br />
              Departure time: {dep}<br />
              Return time: {ret}<br />
              {this.props.seats}: {person.party}<br />
              {cost}
            </div>
          </div>
        </div>
      </li>
    );
  }

});
