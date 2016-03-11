var PaletteList = React.createClass({
  render: function() {
    var thisNode = this;
    var list = [];
    if (this.props.elems !== '') {
      list = _.keys(this.props.elems).map(function(key, i){
        var item = thisNode.props.elems[key];
        return React.createElement(Item, {description: item.description, key: i});
      });
    }
    return React.createElement('ul', {className: 'collection'}, list);
  },
});

var Item = React.createClass({
  render: function() {
    return React.createElement('li', {className: "collection-item"}, this.props.description);
  }
});

function showPalette(elems, node) {
  if (node !== null) {
    var list = React.createElement(PaletteList, {elems: elems});
    ReactDOM.render(list, node);
  }
}