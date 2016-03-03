---
layout: layout.hbs
---

# Features

## Feature: Add epoch

``` gherkin
Feature: Add to timeline
  Epochs and events should be described by a single phrase
  Scenes must have a question and answer
  Only 6 epochs may exist
  Epochs may have 0+ scenes
  Scenes may have 0+ events

  Scenario: Create epoch
    Given there is not an epoch already created in the space
    And I have clicked on the epoch box
    And I have entered a phrase in the text box
    And I have chosen a color for the epoch
    When I press the submit button
    Then the epoch is added to the database
    And the box displays the phrase and color

  Scenario: Create event
    Given there is an epoch in the epoch space
    And I have clicked on the 'Add Event' button for that epoch
    And I have added a phrase to the text box
    And I have chosen a color for the event
    When I press the submit button
    Then the description of the event is added as a child to the epoch in the database
    And an event box appears under the epoch
    And the box contains the event description and color
  
  Scenario: Create scene question
    Given that I have clicked on the event box
    And I have added a question to the initial form
    When I click on the 'Begin Scene' button
    Then the 'Edit Scene' box appears
    And the first player is asked to create a character
  
  Scenario: Create character for scene
    Given that a scene has been started
    And it is my turn
    And I have added a character name to the 'Name' box
    And I have added a description to the 'Description' box
    When I click on the 'Add character' button
    Then the character is added to the list
    And the next player is given the lens
  
  Scenario: Roleplay scene
    Given that a scene has been started
    And everyone has a character
    And it is my turn
    When I type my actions into the scene roleplay box
    Then everyone can see what I type
  
  Scenario: Answer scene question
    Given that a scene roleplay has finished
    And I am the user who created the scene
    And I have written a short phrase to answer the initial question in the text box
    When I click 'Submit'
    Then the answer is added to the database
    And the scene dialogue closes
    And the lens passes to the next player

```

## Feature: Begin game/end game

``` gherkin
Feature: Begin game/end game
  Users should be able to join an existing game
  Users should be able to start their own game
  Users should be able to leave the game

  Scenario: Join existing game with password
    Given that I have entered my name in the 'Name' field
    And I have entered a valid password in the password field
    When I click on the 'Begin Game' button
    Then I am taken to the initial screen of the game
    And my name is added to the list of players in that game

  Scenario: Attempt to join existing game without password
    Given that I have entered my name in the 'Name' field
    And I have entered an incorrect password in the password field
    When I click on the 'Begin Game' button
    Then an error message appears to tell me that no such game exists
    And I am asked if I want to start a new game or re-enter the password
  
  Scenario: Create game
    Given that I have entered my name in the 'Name' field
    When I click on the 'Create Game' button
    Then a message appears to tell me what the password for my game is
    And there is a button to begin the game
    And the game is added to the list of active games
  
  Scenario: Leave game
    Given that I am part of a current game
    When I click the 'Leave Game' button
    Then I am removed from the list of players for that game
    And the page returns to the intro page

```