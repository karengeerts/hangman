var wordGuess = document.querySelector(".word_label");
var btn = document.querySelector("button");
var guesses = document.querySelector(".wrong_guesses");

var wrongGuesses = [];

var words = ["Christmas", "guillotine", "audience", "experience"];

var randomWord = function(words){
  var randomIndex = Math.floor(Math.random() * words.length);
  var randomWord = words[randomIndex];
  return randomWord;
};

var showWord = function(word){
  var wordShowed = "_  ".repeat(word.length);
  wordGuess.textContent = wordShowed;
  return wordShowed;
};

var nextImage = function(){
  var image = document.querySelector("img");
  var imageNumberLocation = image.src.length - 5;
  var imageNumberValue = image.src[imageNumberLocation];
  if (imageNumberValue < 6)
  {
    imageNumberValue ++;
    imageSource = "images/stage_" + imageNumberValue + ".jpg";
    image.src = imageSource;
  } else {
  image.src = "images/stage_7.jpg";
  endGame();
  }
};

var addLetterToWrongGuesses = function(letter){
  if (wrongGuesses.includes(letter) == false) {
  wrongGuesses.push(letter);
  document.querySelector(".wrong_guesses").textContent = wrongGuesses.sort().join(" | ");
  nextImage();
} else {
  // show somewhere what letter you've tried and already tried it!
  console.log("already tried that letter!");
}
};

var findLetterOccurences = function(letter){
  var array = [];
  for (var i = 0; i < word.length; i++){
    if (word.charAt(i) == letter){
      array.push(i);
    }
  }
  return array;
};

var showLetter =  function(letter){
  var letterOccurencesArray = findLetterOccurences(letter);
  var wordShowedArray = wordShowed.split("  ");
    for (var i = 0; i < letterOccurencesArray.length; i++){
    var position = letterOccurencesArray[i];
    wordShowedArray[position] = letter;
  }
  wordShowed = wordShowedArray.join("  ");
  wordGuess.textContent = wordShowed;
  return wordShowed;
};

var checkLetter = function(letter){
  if(word.includes(letter)){
    showLetter(letter);
  } else {
    addLetterToWrongGuesses(letter);
  }
};

var startGame = function(){
document.querySelector("img").src="images/stage_1.jpg";
wordGuess.textContent = " ";
document.querySelector(".wrong_guesses").textContent = "";
wrongGuesses = [];
word = randomWord(words);
wordShowed = showWord(word);
};

var keyPressEvent = function(event){
  var keyName = event.key;
  checkLetter(keyName);
};


var endGame = function(){
  document.removeEventListener('keypress',keyPressEvent);
};


startGame();

document.addEventListener('keypress', keyPressEvent);

btn.addEventListener('click', startGame);
