// a single 'data' object that holds the data of your entire app, with initial values
var data = {
  users: [],
  drivers: [],
  riders: []
}

// a single 'handlers' object that holds all the actions of your entire app
var actions = {}

// the main render() function. call this function whenever the app's UI
// needs to to re-rendered
// 'data' and 'actions' are injected into the app
function render(){
  ReactDOM.render(
    <MyComponents.App
        data={data}
        actions={actions}/>,
    $('#app-container').get(0)
  )
}

render();

//
// DATA
//

var root = new Firebase('https://rideski.firebaseio.com/');
var driverRef = root.child('Drivers');
driverRef.on('value', function(snapshot) {
  data.drivers = snapshot.val();
  render();
});

var riderRef = root.child('Client');
riderRef.on('value', function(snapshot) {
  data.riders = snapshot.val();
  render();
});

var userRef = root.child('users');
userRef.on('value', function(snapshot) {
  data.users = snapshot.val();
  render();
});
