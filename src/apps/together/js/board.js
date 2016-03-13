var Board = React.createClass({
  getInitialState: function() {
    return {
      epoch: -1,
      epochTitleId: 'epoch-title',
      epochColorId: 'epoch-color',
      epochModalId: 'epoch-modal',
      eventTitleId: 'event-title',
      eventColorId: 'event-color',
      eventModalId: 'event-modal'
    };
  },
  
  addEpoch: function() {
    console.log('add', this.state.epoch);
    var color = $('#' + this.state.epochColorId).val();
    var title = $('#' + this.state.epochTitleId).val();
    if (color !== '0' && title !== '') {
      color = $('#' + this.state.epochColorId + ' option:selected').text();
      addEpoch(this.state.epoch, title, color);
      $('#' + this.state.epochModalId).closeModal();
    }
    else {
      Materialize.toast('Please enter a color and title for the epoch', 4000);
    }
  },
  
  addEvent: function() {
    console.log('add', this.state.epoch);
    var color = $('#' + this.state.eventColorId).val();
    var title = $('#' + this.state.eventTitleId).val();
    console.log(color, title);
    if (color !== 0 && title !== '') {
      color = $('#' + this.state.eventColorId + ' option:selected').text();
      addEvent(this.state.epoch, title, color);
      $('#' + this.state.eventModalId).closeModal();
    }
    else {
      Materialize.toast('Please enter a color and title for the event', 4000);
    }
  },
  
  /**
   * i: id of epoch
   * isEpoch: create epoch or event
   */
  openModal: function(i, isEpoch) {
    var id = isEpoch ? this.state.epochModalId : this.state.eventModalId;
    $('#' + id).openModal();
    this.setState({epoch: i});
  },
  
  render: function() {
    var thisNode = this;
    var list = this.props.epochs.map(function(epoch, i){
      var epochCard = React.createElement(Period, {color: epoch.color, title: epoch.title, id: i, openModal: thisNode.openModal});
      var eventList = epoch.events === null ? null : _.keys(epoch.events).map(function(key, j) {
        var event = epoch.events[key];
        return React.createElement(Event, {color: event.color, title: event.title, key: j, id: key});
      });
      return React.createElement('div', {className: "col s2", key: i}, epochCard, eventList);
    });
    var epochModal = React.createElement(Modal, {titleId: this.state.epochTitleId,
                                                 colorId: this.state.epochColorId,
                                                 title: 'Create Epoch',
                                                 id: this.state.epochModalId,
                                                 buttonClick: this.addEpoch});
    var eventModal = React.createElement(Modal, {titleId: this.state.eventTitleId,
                                                 colorId: this.state.eventColorId,
                                                 title: 'Create Event',
                                                 id: this.state.eventModalId,
                                                 buttonClick: this.addEvent});
    return React.createElement('div', {className: 'row'}, list, epochModal, eventModal);
  }
});

/**
 * Props: color, title, id, openModal
 */
var Period = React.createClass({
  render: function() {
    if (this.props.color === '') {
      var span = React.createElement('span', null, "Add Epoch");
      return React.createElement('div', {className: "card period unknown",
                                         id: this.props.id,
                                         onClick: this.props.openModal.bind(null, this.props.id, true)}, span);
    }
    else {
      var i = React.createElement('i', {className: "material-icons"}, "add");
      var a = React.createElement('a', {className: "btn-floating btn-small waves-effect waves-light"}, i);
      var button = React.createElement('div', {className: "right-align",
                                               onClick: this.props.openModal.bind(null, this.props.id, false)}, a);
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
    return React.createElement('div', {className: "card event " + this.props.color, id: this.props.id}, span);
  }
});

/**
 * props: titleId, colorId, title, id, buttonClick
 */
var Modal = React.createClass({
  render: function() {
    var titleInput = React.createElement('input', {id: this.props.titleId, placeholder: 'ex: Mortal world created', type: 'text', className: 'validate'});
    var title = React.createElement('div', {className: 'input-field'}, titleInput);
    var color = React.createElement(ColorSelect, {id: this.props.colorId});
    var heading = React.createElement('h4', null, this.props.title);
    var modalContent = React.createElement('div', {className: 'modal-content'}, heading, title, color);
    var button = React.createElement('button', {className: 'btn waves-effect waves-light', onClick: this.props.buttonClick}, "Add");
    var modalFooter = React.createElement('div', {className: 'modal-footer'}, button);
    return React.createElement('div', {className: 'modal', id: this.props.id}, modalContent, modalFooter);
  },
  
  componentDidMount: function() {
    $('select').material_select();
  }
});

var ColorSelect = React.createClass({
  render: function() {
    var choose = React.createElement('option', {value: 0}, "Choose color");
    var dark = React.createElement('option', {value: 1}, "dark");
    var light = React.createElement('option', {value: 2}, "light");
    var select = React.createElement('select', {id: this.props.id}, choose, dark, light);
    var label = React.createElement('label', null, "Color");
    return React.createElement('div', {className: 'input-field'}, select, label);
  }
});

function showBoard(epochs) {
  var elem = document.getElementById('gameboard');
  if (elem !== null) {
    var board = React.createElement(Board, {epochs: epochs});
    ReactDOM.render(board, elem);
  }
}