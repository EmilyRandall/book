---
layout: layout.hbs
---

# Specification

# Data

Our app uses the following structure for the database backend:

    Games

      -random key-
      
        players
        
          -key-
          
            name: -name-
            
            active: false
            
          ...
          
        big-picture: -description-
        
        palette
        
          yes
          
            0: -description-
            
            ...
            
          no
          
            0: -description-
            
            ...
          
        epochs
        
          0
          
            title: -title-
            
            color: 'black' or 'white'
          
            events
            
              -key-
              
                title: -title-
                
                color: 'black' or 'white'
                
                scenes
                
                  -key-
                  
                    question: -question-
                
                    answer: -answer-
                    
                  ...
                
              ...
          
          1
          
          2
          
          3
          
          4
          
          5
          
      -random key-
      
      ...

# Actions

The major actions of our app are:
* Create game
* Join game
* Leave game
* Set big picture description
* Create palette
* Create epoch
* Create event
* Create scene

## Action: Create game

### case: default

``` javascript
// given
$('#create-name').get() !== ''

// when
createGameButton.click()

//then
showModal(welcomeToGameModal)
Games.add(generated_key)
```

## Action: Join game

### case: valid password

``` javascript
// given
$('#join-name').get() !== '' && $('#password').get() !== '' && Games[$('#password').get()] !== undefined

// when
joinGameButton.click()

//then
go_to_page(intro.html)
Games.password.addPlayer(name)
```

### case: invalid password

``` javascript
// given
$('#join-name').get() !== '' && $('#password').get() !== '' && Games[$('#password').get()] === undefined

// when
joinGameButton.click()

//then
showModal(sorry)
```

## Action: Leave game

### case: default

``` javascript
// given
state = in_game

// when
leaveGameButton.click()

//then
current_game.removePlayer(me)
go_to_page(start.html)
```

## Action: Set big picture description

### case: default

``` javascript
// given
$('#big-picture').get() !== ''

// when
setDescriptionButton.click()

//then
Games[generated_key].big-picture = $('#big-picture').get()
reload()
```

## Action: Create palette

### case: add 'Yes'

``` javascript
// given
Games.players.find(player.active === true) === me && $('#add-yes').get() !== ''

// when
submitButton.click()

//then
Games.palette.yes.add($('#add-yes').get())
reload()
```

### case: add 'No'

``` javascript
// given
Games.players.find(player.active === true) === me && $('#add-no').get() !== ''

// when
submitButton.click()

//then
Games.palette.no.add($('#add-no').get())
reload()
```

## Action: Create epoch

### case: create epoch i

``` javascript
// given
$('#epoch' + i).isEmpty() && $('#title').get() !== '' && $('color').get() !== ''

// when
submitButton.click()

//then
Games.epochs[i].title = $('#title').get()
Games.epochs[i].color = $('#color').get()
reload()
```

## Action: Create event

### case: create event for epoch i

``` javascript
// given
!$('#epoch' + i).isEmpty() && $('#title').get() !== '' && $('color').get() !== ''

// when
submitButton.click()

//then
Games.epochs[i].addEvent( {title: $('#title').get()
                           color: $('#color').get()})
reload()
```

## Action: Create scene

### case: create question for scene for event i

``` javascript
// given
!$('#event' + i).isEmpty() && $('#question').get() !== ''

// when
submitButton.click()

//then
Games.epochs[event.getEpoch()].event.addScene( {question: $('#question').get()})
reload()
```

### case: create character for scene i

``` javascript
// given
scenes.get(i) !== undefined && Games.players.find(player.active === true) === me && $('#character').get() !== ''

// when
createCharacterButton.click()

//then
scene.characters.add($('#character').get())
reload()
```

### case: roleplay scene i

``` javascript
// given
scenes.get(i) !== undefined && Games.players.find(player.active === true) === me

// when
editSceneButton.click()

//then
scene.description = $('#scene').get()
reload()
```

### case: answer scene question for scene i

``` javascript
// given
scene.description.isComplete() && scene.creator === me && $('#answer').get() !== ''

// when
addAnswerButton.click()

//then
scene.answer = $('#answer').get()
reload()
```
