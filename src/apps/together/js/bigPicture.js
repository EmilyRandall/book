var BigPicture = React.createClass({
  handleClick: function() {
    if (currentPlayer === getPlayer()) {
      $('#big-picture-modal').openModal();
    }
    else {
      invalidTurn();
    }
  },
  
  render: function() {
    if (this.props.bigPicture === '') {
      var span = React.createElement('span', {className: "card-title"}, "Add big picture description");
      var i = React.createElement('i', {className: "material-icons"}, "add");
      var button = React.createElement('a', {className: "btn-floating btn-small waves-effect waves-light", onClick: this.handleClick}, i);
      var div = React.createElement('div', {className: "right-align"}, button);
      return React.createElement('div', {className: "card-content"}, span, div);
    }
    else {
      var span = React.createElement('span', {className: "card-title"}, this.props.bigPicture);
      var p = React.createElement('p', null, 'Big Picture');
      return React.createElement('div', {className: "card-content"}, span, p);
    }
  },
});

function showBigPicture(bigPicture) {
  var elem = document.getElementById('big-picture');
  if (elem !== null) {
    var card = React.createElement(BigPicture, {bigPicture: bigPicture});
    ReactDOM.render(card, elem);
  }
}