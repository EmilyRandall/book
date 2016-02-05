MyComponents.Skill = React.createClass({

  render: function() {
    var skill = this.props.skill;
    return (
      <li className="card light-blue lighten-3 z-depth-3">
        <div className="card-content">
          <span className="card-title">{skill.name}</span>
          <p>Level: {skill.Level}</p>
          <p>Years of Experience: {skill.Years}</p>
        </div>
      </li>
    );
  }

});

MyComponents.SkillList = React.createClass({
  render: function() {

    var skillElements = this.props.skills.map(function(s,i){
      return <MyComponents.Skill skill={s} key={i}/>
    })

    return (
      <div className="row">
        <h3 className="center-align">Skills</h3>
        <ul>

        {skillElements}

        </ul>
      </div>
    );
  }
});
