var _ = require('lodash')
var random_name = require('node-random-name');
var Firebase = require('firebase');
var ref = new Firebase('https://shining-fire-9960.firebaseio.com/games');

// simualate a random person entering, staying for a duration, and leaving
function simulate() {
  var person = createPerson();

  // simulate this person entering
  createGame(person);

  // simulate this person leaving after 'duration' seconds
  setTimeout(function() {
    leaveGame(person);
  }, person.duration * 10000);
  
  for (var i = 0; i < 4; i++) {
    setTimeout(function() {
      var newPerson = createPerson();
      newPerson.token = person.token;
      joinGame(newPerson);
      setTimeout(function() {
        leaveGame(newPerson);
      }, newPerson.duration * 10000); 
    }, i * 1000);
  }
}

function createPerson() {
  var name = random_name();
  var token = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  var duration = 1 + 5 * Math.random();;
  var person = {
      name: name,
      duration: duration,
      token: token,
  }
  return person;
}

function createGame(person) {
  console.log('create', person);
  var game = ref.child(person.token);
  var epochs = {};
  for (var i = 0; i < 6; i++) {
    epochs[i] = {
      title: '',
      color: '',
    }
  }
  var palette = {
    yes: '',
    no: ''
  }
  game.set({
      bigPicture: '',
      palette: palette,
      epochs: epochs
  });
  var players = game.child('players');
  players.push().set({name: person.name, active: true});
}

function joinGame(person) {
  console.log('join', person);
  ref.once('value', function(snapshot) {
    var games = snapshot.val();
    if (_.has(games, person.token)) {
      var players = ref.child(person.token).child('players');
      players.push().set({name: person.name, active: false});
    }
  });
}

function leaveGame(person) {
  console.log('leave', person);
  var game = ref.child(person.token);
  game.child('players').once('value', function(snapshot){
    var players = snapshot.val();
    _.keys(players).forEach(function(key) {
      if (players[key].name === person.name) {
        game.child('players').child(key).remove();
      }
    });
  });
}

function clear() {
  ref.remove();
}


// clear the firebase, so that the simulation always starts from no one
clear()

// run each second
setInterval(simulate, 8000)
