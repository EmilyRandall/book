var ref = new Firebase('https://shining-fire-9960.firebaseio.com/games');
var gameKey = '';
var currentPlayer = '';

/**
 * name: player name
 * token: game key
 * onSuccess: function called if successful
 */
function createGame(name, token, onSuccess) {
  console.log('create', name);
  var game = ref.child(token);
  gameKey = token;
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
  var playerRef = players.push();
  playerRef.set({name: name, active: true});
  currentPlayer = playerRef.key();
  onSuccess();
}

/**
 * name: player name
 * token: game key
 * onSuccess: function called if successful
 * onFailure: function called if game does not exist
 */
function joinGame(name, token, onSuccess, onFailure) {
  console.log('join', name);
  ref.once('value', function(snapshot) {
    var games = snapshot.val();
    if (_.has(games, token)) {
      gameKey = token;
      var players = ref.child(token).child('players');
      players.push().set({name: name, active: false});
      onSuccess();
    }
    else {
      onFailure();
    }
  });
}

/**
 * name: name of player leaving
 */
function leaveGame(name) {
  console.log('leave', name);
  var game = ref.child(gameKey);
  game.child('players').once('value', function(snapshot){
    var players = snapshot.val();
    _.keys(players).forEach(function(key) {
      if (players[key].name === name) {
        game.child('players').child(key).remove();
      }
    });
  });
}

/**
 * description: new big picture
 */
function setBigPicture(description) {
  console.log("Set big picture", description);
  var game = ref.child(gameKey);
  game.update({
    'bigPicture': description
  });
}

/**
 * description: item to add
 * location: 'yes' or 'no'
 */
function addToPalette(description, location) {
  var palette = ref.child(gameKey).child('palette/' + location);
  palette.push().set({description: description});
}

/**
 * key: key of player
 */
function setLens(key) {
  var players = ref.child(gameKey).child('players');
  players.child(currentPlayer).update({
    active: false
  });
  currentPlayer = key;
  players.child(currentPlayer).update({
    active: true
  });
}

/**
 * i: which epoch (0 - 5)
 * title: title of event
 * color: 'black' or 'white'
 */
function addEpoch(i, title, color) {
  console.log("Add epoch", i, "with description", title);
  var epoch = ref.child(gameKey).child('epochs/' + i);
  epoch.update({
    title: title,
    color: color
  });
}

/**
 * i: which epoch to add event under
 * title: title of event
 * color: 'black' or 'white'
 */
function addEvent(i, title, color) {
  console.log("Add event to epoch", i, "with description", title);
  var epoch = ref.child(gameKey).child('epochs/' + i);
  var event = epoch.child('events').push();
  event.set({
    title: title,
    color: color
  });
  return event.key();
}

/**
 * i: which epoch to add event under
 * key: key of event to add scene
 * question: guiding question of scene
 */
function addScene(i, key, question) {
  console.log("Add scene to epoch", i, "and scene", key, "with question", question);
  var event = ref.child(gameKey).child('epochs/' + i + '/events/' + key);
  var scene = event.child('scenes').push();
  scene.set({
    question: question,
    answer: ''
  });
  return scene.key();
}

/**
 * i: which epoch to add event under
 * eventKey: key of event that contains the scene
 * sceneKey: key of scene
 * answer: answer to the question of the scene
 */
function answerSceneQuestion(i, eventKey, sceneKey, answer) {
  console.log("Answer question for scene", sceneKey, "with answer", answer);
  var scene = ref.child(gameKey).child('epochs/' + i + '/events/' + eventKey + "/scenes/" + sceneKey);
  scene.update({
    answer: answer
  });
}