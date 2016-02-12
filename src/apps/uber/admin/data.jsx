// a single 'data' object that holds the data of your entire app, with initial values
var data = {
  center: [37.78, -122.41], // San Francisco
  providers: [],
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

//
// DATA
//

var firebaseRef = new Firebase('https://ucdd2-book.firebaseio.com/uber')

// Real-time Data (load constantly on changes)
firebaseRef.child('users')
  .on('value', function(snapshot){

    data.users = _.values(snapshot.val())

    render()

  })

firebaseRef.child('providers')
  .on('value', function(snapshot){

    data.providers = _.values(snapshot.val())

    render()

  })

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
