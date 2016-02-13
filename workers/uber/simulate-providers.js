var _ = require('lodash')
var random_name = require('node-random-name');
var Firebase = require('firebase');

// Denver
var city_location = {
  lat: 39.73,
  lon: -104.98
}

var radius = 0.5

// simualate a random person entering, staying for a duration, and leaving
function simulate(){

  // generate a random person with a random name,
  // random location, and random duration
  var name = random_name();
  var duration = 1 + 5 * Math.random();
  var lat = city_location.lat + radius * (Math.random() - 0.5) * 2;
  var lon = city_location.lon + radius * (Math.random() - 0.5) * 2;
  var destinationArray = ['A-Basin', 'Eldora', 'Breckenridge', 'Vail', 'Keystone', 'Winter Park', 'Loveland', 'Copper'];
  var seatArray = ['1','2','3','4','5','6'];
  var startTimeArray = ['5', '6', '7', '8', '9', '10'];
  var returnTimeArray = ['12', '1', '2', '3', '4', '5'];
  var returnt = returnTimeArray[Math.floor(Math.random() * returnTimeArray.length)];
  var departure = startTimeArray[Math.floor(Math.random() * startTimeArray.length)];
  var seating = seatArray[Math.floor(Math.random() * seatArray.length)];
  var dest = destinationArray[Math.floor(Math.random() * destinationArray.length)];
  var person = {
    name: name,
    lat: lat,
    lon: lon,
    dest: dest,
    departure: departure,
    returnt: returnt,
    seating: seating,
    key: null
  };

  // simulate this person entering
  enter(person);
  var leaveTime = duration * 8000;
  
  // simulate this person moving
  var step = 1000;
  setTimeout(function() {
    move(person, step);
  }, step);
  

  // simulate this person leaving after 'duration' seconds
  setTimeout(function(){
    leave(person);
  }, leaveTime);

}

function enter(person){
  console.log('enter', person)
  // TODO: put this person in the Firebase
  var ref = new Firebase('https://rideski.firebaseio.com/Drivers');
  var child = ref.push();
  child.set({
      lat: person.lat,
      lon: person.lon,
      dest: person.dest,
      name: person.name,
      departure: person.departure,
      returnt: person.returnt,
      party: person.seating,
      driver: true
  });
  person.key = child.key();
}

function leave(person){
  console.log('leave', person)
  // TODO: remove this person from the Firebase
  var ref = new Firebase('https://rideski.firebaseio.com/Drivers');
    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };

    ref.child(person.key).remove(onComplete);
}

function move(person, step) {
  var ref = new Firebase('https://rideski.firebaseio.com/Drivers');
  person.lat = person.lat + radius * (Math.random() - 0.5) * 0.05;
  person.lon = person.lon + radius * (Math.random() - 0.5) * 0.05;
  console.log('move', person);
  ref.once('value', function(snapshot) {
    if (snapshot.hasChild(person.key)) {
      ref.child(person.key).update({lat: person.lat, lon: person.lon});
      setTimeout(function() {
        move(person, step);
      }, step);
    }
  });
}

// run each second
setInterval(simulate, 8000);
