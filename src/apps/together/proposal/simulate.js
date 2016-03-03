var _ = require('lodash')
var random_name = require('node-random-name');
var Firebase = require('firebase');
var ref = new Firebase('https://shining-fire-9960.firebaseio.com/games');

// simualate a random person entering, staying for a duration, and leaving
function simulate() {
  var person = createPerson();
  var token = person.token;

  // simulate this person entering
  createGame(person);
  setBigPicture(token, "Big picture for " + token);

  // simulate this person leaving after 'duration' seconds
  setTimeout(function() {
    leaveGame(person);
  }, person.duration * 10000);
  
  for (var i = 0; i < 4; i++) {
    setTimeout(function() {
      var newPerson = createPerson();
      newPerson.token = token;
      joinGame(newPerson);
      addYes(token, "Requirement");
      addNo(token, "Forbidden");
      setTimeout(function() {
        leaveGame(newPerson);
      }, newPerson.duration * 10000); 
    }, i * 2000);
  }
  
  setTimeout(function() {
    addEpoch(token, 0, "First Epoch", "white");
  }, 10000);
  
  setTimeout(function() {
    addEpoch(token, 5, "Last Epoch", "white");
  }, 12000);
  
  setTimeout(function() {
    addEpoch(token, 3, "Middle Epoch", "black");
  }, 14000);
  
  setTimeout(function() {
    addEvent(token, 3, "First event for middle epoch", "white");
  }, 16000);
  
  setTimeout(function() {
    var eventKey = addEvent(token, 0, "First event for first epoch", "black");
    var sceneKey = addScene(token, 0, eventKey, "Question for first scene?");
    answerSceneQuestion(token, 0, eventKey, sceneKey, "Answer for first scene");
  }, 18000);
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

function setBigPicture(token, description) {
  console.log("Set big picture", description);
  var game = ref.child(token);
  game.update({
    'bigPicture': description
  });
}

function addYes(token, yes) {
  console.log("Add yes", yes);
  var yesSet = ref.child(token).child('palette/yes');
  yesSet.push().set({description: yes});
}

function addNo(token, no) {
  console.log("Add no", no);
  var noSet = ref.child(token).child('palette/no');
  noSet.push().set({description: no});
}

/**
 * token: game token
 * i: which epoch (0 - 5)
 * title: title of event
 * color: 'black' or 'white'
 */
function addEpoch(token, i, title, color) {
  console.log("Add epoch", i, "with description", title);
  var epoch = ref.child(token).child('epochs/' + i);
  epoch.update({
    title: title,
    color: color
  });
}

/**
 * token: game token
 * i: which epoch to add event under
 * title: title of event
 * color: 'black' or 'white'
 */
function addEvent(token, i, title, color) {
  console.log("Add event to epoch", i, "with description", title);
  var epoch = ref.child(token).child('epochs/' + i);
  var event = epoch.child('events').push();
  event.set({
    title: title,
    color: color
  });
  return event.key();
}

/**
 * token: game token
 * i: which epoch to add event under
 * key: key of event to add scene
 * question: guiding question of scene
 */
function addScene(token, i, key, question) {
  console.log("Add scene to epoch", i, "and scene", key, "with question", question);
  var event = ref.child(token).child('epochs/' + i + '/events/' + key);
  var scene = event.child('scenes').push();
  scene.set({
    question: question,
    answer: ''
  });
  return scene.key();
}

/**
 * token: game token
 * i: which epoch to add event under
 * eventKey: key of event that contains the scene
 * sceneKey: key of scene
 * answer: answer to the question of the scene
 */
function answerSceneQuestion(token, i, eventKey, sceneKey, answer) {
  console.log("Answer question for scene", sceneKey, "with answer", answer);
  var scene = ref.child(token).child('epochs/' + i + '/events/' + eventKey + "/scenes/" + sceneKey);
  scene.update({
    answer: answer
  });
}


// clear the firebase, so that the simulation always starts from no one
clear();
simulate();

// run each second
setInterval(simulate, 20000)
