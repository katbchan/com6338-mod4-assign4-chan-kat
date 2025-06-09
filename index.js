var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

var currentWord = "";
var guessedLetters = [];
var remainingGuesses = 10;
var wins = 0;
var losses = 0;
var previousWord = "";

function startGame() {
  var randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  guessedLetters = [];
  remainingGuesses = 10;
  changeDisplay();
}

function changeDisplay() {
  var displayWord = "";
  for (var i = 0; i < currentWord.length; i++) {
    if (guessedLetters.includes(currentWord[i])) {
      displayWord += currentWord[i];
    } else {
      displayWord += "_";
    }
  }

  var wrongLetters = [];
  for (var i = 0; i < guessedLetters.length; i++) {
    if (currentWord.includes(guessedLetters[i]) === false) {
      wrongLetters.push(guessedLetters[i]);
    }
  }

  document.getElementById("word-to-guess").textContent = displayWord;
  document.getElementById("incorrect-letters").textContent = wrongLetters.join(", ");
  document.getElementById("remaining-guesses").textContent = remainingGuesses;
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("previous-word").textContent = previousWord;
}

document.onkeydown = function(event) {
    if (/^[a-z]$/i.test(event.key)) {
    var letter = event.key.toLowerCase();

    if (guessedLetters.includes(letter) === false) {
      guessedLetters.push(letter);

      if (currentWord.includes(letter) === false) {
        remainingGuesses--;
      }
  
      checkWinLose();
      changeDisplay();
    }
  }
};

function checkWinLose() {
  var won = true;
  for (var i = 0; i < currentWord.length; i++) {
    if (guessedLetters.includes(currentWord[i]) === false) {
      won = false;
      break;
    }
  }

  if (won) {
    previousWord = currentWord;
    wins++;
    changeDisplay();
    startGame();
    return;
  }

  if (remainingGuesses <= 0) {
    previousWord = currentWord;
    losses++;
    changeDisplay();
    startGame();
  }
}

window.onload = function() {
  startGame();
  changeDisplay();
}