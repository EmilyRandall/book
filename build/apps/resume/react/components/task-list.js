MyComponents.Task = React.createClass({

  render: function() {
    var thisNode = this;
    var taskElements = Object.keys(this.props.task).map(function(key,i){
      var item = thisNode.props.task[key];
      if (key != 'title' && key != 'completed' && item[key] != "") {
        return <MyComponents.TaskItem keyName={key} value={item} key={i}/>
      }
    });
    
    return (
      <li className="card light-blue lighten-3 z-depth-3">
        <div className="card-content">
          <span className="card-title">{this.props.task.title}</span>
          {taskElements}
        </div>
      </li>
    );
  }

});

MyComponents.TaskItem = React.createClass({
  render: function() {
    return (<p>{this.props.keyName} : {this.props.value}</p> )
  }
})

MyComponents.TaskList = React.createClass({
  render: function() {
    var thisNode = this;
    var taskElements = Object.keys(this.props.tasks).map(function(key,i){
      var task = thisNode.props.tasks[key];
      if (('assigned' in task) && task['assigned'] == 'EmilyRandall') {
        return <MyComponents.Task task={thisNode.props.tasks[key]} key={i}/>
      }
    });

    return (
      <div className="row">
        <h3 className="center-align">Tasks</h3>
        <ul>

        {taskElements}

        </ul>
      </div>
    );
  }
});
