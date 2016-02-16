// a single 'data' object that holds the data of your entire app, with initial values
var data = {
  user: null,
  drivers: [],
  riders: [],
  center: [39.73, -104.98]
};
var root = new Firebase('https://rideski.firebaseio.com/');

// a single 'handlers' object that holds all the actions of your entire app
var actions = {}

// the main render() function. call this function whenever the app's UI
// needs to to re-rendered
// 'data' and 'actions' are injected into the app
function render(){
  var user = getURLParameter('user');
  if (user !== "" && data.user === null) {
    root.child('users').child(user).once('value', function(snapshot) {
      data.user = snapshot.val();
      ReactDOM.render(
        <MyComponents.App
            data={data}
            actions={actions}/>,
        $('#app-container').get(0)
      );
    });
  }
  else {
    ReactDOM.render(
      <MyComponents.App
          data={data}
          actions={actions}/>,
      $('#app-container').get(0)
    );
  }
}

render();

function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
  return "";
}

//
// DATA
//
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

//
// ACTIONS
//

// Actions
actions.setUserLocation = function(latlng){
  if (data.user){
    root
      .child('users')
      .child(data.user.username)
      .child('pos')
      .set([latlng.lat, latlng.lng]);
  }
}

actions.login = function(){

  root.authWithOAuthPopup("github", function(error, authData){

    // handle the result of the authentication
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);

      // create a user object based on authData
      var user = {
        displayName: authData.github.displayName,
        username: authData.github.username,
        id: authData.github.id,
        imgUrl: authData.github.profileImageURL,
        status: 'online',
        pos: data.center  // position, default to the map center
      };

      var userRef = root.child('users').child(user.username);

      // subscribe to the user data
      userRef.on('value', function(snapshot){
        data.user = snapshot.val();
        render();
      });

      // set the user data
      userRef.set(user);

    }
  })

}

actions.logout = function(){

  if (data.user){

    root.unauth();

    var userRef = root
      .child('users')
      .child(data.user.username);

    // unsubscribe to the user data
    userRef.off();

    // set the user's status to offline
    userRef.child('status').set('offline');

    data.user = null;

    render();

  }

}
