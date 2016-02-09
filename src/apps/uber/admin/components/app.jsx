class App extends React.Component {
  render(){
    return <div>
      <MyComponents.NavBar />
      <div className="container">
        <MyComponents.UserMap users={this.props.data.users}/>
        <MyComponents.UserList users={this.props.data.users}/>
        <MyComponents.ProviderMap users={this.props.data.providers}/>
        <MyComponents.ProviderList providers={this.props.data.providers}/>
      </div>
    </div>
  }
}

MyComponents.App = App
