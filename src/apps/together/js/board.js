var Board = React.createClass({
  render: function() {
    var thisNode = this;
    var list = this.props.epochs.map(function(epoch, i){
      var epochCard = React.createElement(Period, {color: epoch.color, title: epoch.title, id: i});
      var eventList = epoch.events === null ? null : _.keys(epoch.events).map(function(key, j) {
        var event = epoch.events[key];
        return React.createElement(Event, {color: event.color, title: event.title, key: j});
      });
      return React.createElement('div', {className: "col s2", key: i}, epochCard, eventList);
    });
    return React.createElement('div', {className: 'row'}, list);
  },
  
  componentDidMount: function() {
    $('.unknown').click(function() {
      console.log('click');
    });
    
    $('.event').click(function() {
      console.log('event click');
    });
  }
});

/**
 * Props: color, title
 */
var Period = React.createClass({
  render: function() {
    if (this.props.color === '') {
      var span = React.createElement('span', null, "Add Epoch");
      return React.createElement('div', {className: "card period unknown", id: this.props.id}, span);
    }
    else {
      var i = React.createElement('i', {className: "material-icons"}, "add");
      var a = React.createElement('a', {className: "btn-floating btn-small waves-effect waves-light"}, i);
      var button = React.createElement('div', {className: "right-align"}, a);
      var strong = React.createElement('strong', null, this.props.title);
      var span = React.createElement('span', null, strong);
      return React.createElement('div', {className: "card period " + this.props.color, id: this.props.id}, span, button);
    }
  }
});

/**
 * Props: color, title
 */
var Event = React.createClass({
  render: function() {
    var span = React.createElement('span', null, this.props.title);
    return React.createElement('div', {className: "card event " + this.props.color}, span);
  }
});

function showBoard(epochs) {
  var elem = document.getElementById('gameboard');
  if (elem !== null) {
    var board = React.createElement(Board, {epochs: epochs});
    ReactDOM.render(board, elem);
  }
}