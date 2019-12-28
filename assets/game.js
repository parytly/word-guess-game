var word = ["madonna", "coffee", "soccer", "godzilla", "batman", "pokemon", "sacramento"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccess = [];
var wrongLetters = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// ---------------------------------------------------------------------------
function startGame() {
    // SELECT A RANDOM WORD FROM THE ARRAY
    selectedWord = word[Math.floor(Math.random() * word.length)];
    // breaks the word into individual letters into arrays
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // RESETS THE GAME FROM EACH ROUND
    guessesLeft = 9;
    blanksAndSuccess = [];
    wrongLetters = [];

    // FORLOOP TO POPULATE THE BLANKS AND SUCCESS
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccess.push("_");
    };

    // APPENDS THE INFO ONTO THE HTML
    // .JOIN -- joins the array together with space between them
    $("#theWord").text(blanksAndSuccess.join(" "));
    $("#wrong-guesses").text(wrongLetters.join(" "));
    $("#remainingGuess").text(guessesLeft);
    $("#wins").text(winCount);
    document.querySelector("#loss").innerHTML = lossCount;

    // TESTING/ DEBUGGING
    console.log("word: " + selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccess)
};
startGame();

// ---------------------------------------------------------------------------
// CHECKS THE SELECTED LETTER BY THE USER
function checkLetters(letter) {
    var lettersInChosenWord = false;

    // checks if the selected letter exists within the array
    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] === letter) {
            lettersInChosenWord = true;
        };
    }
    // IF LETTER EXIST, POPULATE THE BLANKSANDSUCCESS ARRAY
    if (lettersInChosenWord) {
        for (var j = 0; j < numBlanks; j++) {
            if (selectedWord[j] === letter) {
                blanksAndSuccess[j] = letter;
            }
        }
        // LETTER WASNT FOUND
    } else {
        wrongLetters.push(letter);
        guessesLeft--;
    }
    // TEST/ DEBUGGING
    // console.log(letter)
    // console.log(blanksAndSuccess);
};

function roundComplete() {
    // console.log('win count: ' + winCount + 'losscount: ' + lossCount + 'guesses left :' + guessesLeft);

    // UPDATES HTML WITH NEW DATA
    $("#theWord").text(blanksAndSuccess.join(" "));
    $("#wrong-guesses").text(wrongLetters.join(" "));
    $("#remainingGuess").text(guessesLeft);

    // CHECK ID USER WON
    if (lettersInWord.toString() === blanksAndSuccess.toString()) {
        winCount++;
        alert('you won');
        
        document.querySelector("#wins").innerHTML = winCount;
        // calling startgame function to start the game again once user won
        startGame();
    }
    // CHECK IF USER LOSS
    else if (guessesLeft === 0) {
        lossCount++;
        alert('you lost')
        document.querySelector("#loss").innerHTML = lossCount;
        // calling startgame function here once user loss
        startGame();
    }

}

// ---------------------------------------------------------------------------
// LOGS THE USER INPUT
document.onkeypress = function (event) {
    // USING THE ONKEYPRESS TO LOG IN USER INPUT AND LOWER CASING IT
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

    // CALLING THE CHECK LETTER FUNCTION TO CHECK IF ONKEYPRESS MATCHES
    checkLetters(letterGuessed)
    roundComplete();

    // TESTING/ DEBUGGING
    // console.log(letterGuessed)
}