//array of pattern
var gamePattern = [];

//array of user clicked pattern
var userClickedPattern = [];

//array of button colours
var buttonColours = ["red", "blue", "green", "yellow"];

//var to check if the game has started
var started = false;

//var for the level
var level = 0;

//initiate the game when clicked
$("#level-title").click( function() {
    if (!started) {
        //change the h1 text
        $("#level-title").text("Level " + level);

        //call the next sequence colour
        nextSequence();

        //set started to true to initiate the game
        started = true;
    }
});

//generate next sequence number
function nextSequence() {
    //reset the user clicked pattern array
    userClickedPattern = [];

    // increment the level
    level++;

    //update the level title
    $("#level-title").text("Level " + level);

    //get random number between 0-4
    var randomNumber = Math.floor(Math.random() * 4);

    //get the colour
    var randomChosenColour = buttonColours[randomNumber];

    //push to gamePattern
    gamePattern.push(randomChosenColour);

    //animate the next colour
    $("#" + randomChosenColour).fadeIn(300).fadeOut(300).fadeIn(300);

    //play sound
    playSound(randomChosenColour);
}

//button listener
$(".btn").click( function() {
    //get the id of chosen colour
    var userChosenColour = $(this).attr("id");

    //push the chosen colour to userClickedPattern array
    userClickedPattern.push(userChosenColour);

    //play sound
    playSound(userChosenColour);

    //add animation
    animatePress(userChosenColour);

    //check the answer
    checkAnswer(userClickedPattern.length-1);
});

//play sound based on colour
function playSound(name) {
    //play the sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//give animation when button clicked
function animatePress(currentColor) {
    //add class from css
    $("#" + currentColor).addClass("pressed");

    //add delay for time out
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 500);
}

//check the answer
function checkAnswer(currentLevel) {
    //check the current input with the game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //check if all pattern is correct or done
        if (userClickedPattern.length === gamePattern.length){

            //call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        //play the wrong sound
        playSound("wrong");

        //call css class
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);

        //change the title
        $("#level-title").text("Game Over, Click Here to Restart");
        
        //call the start over function
        startOver();
    }
}

//function to restart the game
function startOver() {
    //reset all variables
    level = 0;
    gamePattern = [];
    started = false;
}