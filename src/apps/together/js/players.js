var PlayerList = React.createClass({
  render: function() {
    var thisNode = this;
    var list = _.keys(this.props.players).map(function(key, i){
      var player = thisNode.props.players[key];
      if (player.active) {
        currentPlayer = key;
      }
      return React.createElement(Player, {name: player.name, active: player.active, isList: true, key: i, id: key});
    });
    return React.createElement('ul', {className: 'collection'}, list);
  },
  
  componentDidMount: function() {
    $('li').click(function() {
      setLens(this.id);
    });
  }
});

var PlayerMenu = React.createClass({
  render: function() {
    var thisNode = this;
    var list = _.keys(this.props.players).map(function(key, i){
      var player = thisNode.props.players[key];
      return React.createElement(Player, {name: player.name, active: player.active, isList: false, key: i, id: key});
    });
    var select = React.createElement('select', {id: "playerSelect"}, list);
    var label = React.createElement('label', null, 'Lens');
    return React.createElement('div', {className: 'input-field col s12'}, select, label);
  },
  
  componentDidMount: function() {
    $('select').material_select();
    currentPlayer = $('select').children(":selected").attr("id");
    
    $('select').on('change', function() {
      var current = $('select').children(":selected").attr("id");
      setLens(current);
    });
  }
});

var Player = React.createClass({
  render: function() {
    if (this.props.isList) {
      var className = this.props.active ? "collection-item active" : "collection-item";
      return React.createElement('li', {className: className, id: this.props.id}, this.props.name);
    }
    else {
      return React.createElement('option', {value: this.props.key, id: this.props.id}, this.props.name);
    }
  }
});

function showPlayerList(players) {
  var elem = document.getElementById('playerList');
  if (elem !== null) {
    var playerList = React.createElement(PlayerList, {players: players});
    ReactDOM.render(playerList, elem);
  }
}

function showPlayerMenu(players) {
  var elem = document.getElementById('playerMenu');
  if (elem !== null) {
    var playerMenu = React.createElement(PlayerMenu, {players: players});
    ReactDOM.render(playerMenu, elem);
  }
}