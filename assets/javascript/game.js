var wordBank = ["Giants", "Redskins", "Cowboys", "Steelers", "Packers", "QB", "Referee", "Touchdown", "Fumble", "Sack", "Interception", "Tackle"],
    arrLength = wordBank.length;


var winnerMessage = "Congrats, you win!",
    loserMessage = "Sorry, out of tries. Press any key to try again.",
    letterAlreadyPicked = "Sorry, that letter was already used.",
    letterNotExist = "Sorry, that letter does not exist in the word.";


var targetGameMessage = document.getElementById('gameMessage'),
    targetWrongLetters = document.getElementById('usedLettersWrong'),
    targetGameSpace = document.getElementById('userGameSpace'),
    targetTriesMessage = document.getElementById('triesMessage');


var losesCounter = 0,
    winsCounter = 0,
    guessesCounter = 0,
    wordCounter = 0,
    incorrectTries = 5;

var selectedWord = wordBank[Math.floor(Math.random() * arrLength)];
var splitWord = selectedWord.split("");
var selectedWordLength = selectedWord.length;
console.log(selectedWord);

var placeholder = "";
for (var i = 0; i < selectedWordLength; i++) {
    placeholder += "-";
}
var placeholderSplit = placeholder.split('');
targetGameSpace.innerHTML = placeholder;

var usedWrongLetters = [],
    correctLetters = [];

function winnerNotification() {
    if (wordCounter === selectedWordLength) {
   
        targetGameMessage.innerHTML = winnerMessage;
    }
}

function loseGameNotify() {
    targetGameMessage.innerHTML = loserMessage;
}


function refreshPage() {
    window.location.reload(true);
}

document.onkeyup = function () {

    var letter = event.key

    if (letter.charCodeAt(0) > 96 && letter.charCodeAt(0) < 123) {
        var userInput = event.key
            
        if (incorrectTries <= 0) {
            incorrectTries = 0;

            targetTriesMessage.innerHTML = incorrectTries;
            targetWrongLetters.innerHTML = usedWrongLetters;

            refreshPage();

        } else if (incorrectTries === 1) {
            usedWrongLetters.push(userInput);
            targetWrongLetters.innerHTML = usedWrongLetters;
            incorrectTries -= 1;
            targetTriesMessage.innerHTML = incorrectTries;
            loseGameNotify();
        } else if ((splitWord.indexOf(userInput) > -1) && (correctLetters.indexOf(userInput) === -1)) {
            

            for (let i = 0; i < splitWord.length; i++) {

                if (userInput === selectedWord.charAt(i)) {
                    placeholderSplit.splice(i, 1, userInput.toUpperCase());
                 
                    targetGameSpace.innerHTML = placeholderSplit.join("");
                    wordCounter += 1;
                    correctLetters.push(userInput);
                   
                    targetGameMessage.innerHTML = "Correct Letter!";
                    winnerNotification();
                }
            }
        } else if (((splitWord.indexOf(userInput > -1)) && (correctLetters.indexOf(userInput) > -1)) || (usedWrongLetters.indexOf(userInput) > -1)) {
           
            targetGameMessage.innerHTML = letterAlreadyPicked;
        } else {
            targetGameMessage.innerHTML = letterNotExist;
            incorrectTries -= 1;
            targetTriesMessage.innerHTML = incorrectTries;
            usedWrongLetters.push(userInput);
            console.log(usedWrongLetters);
            targetWrongLetters.innerHTML = usedWrongLetters;
            
        }
    }
}