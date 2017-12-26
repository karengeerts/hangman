/*TO DO:
- add animation every time Hangman image gets updated
- link to dictionary array and make it possible to link to dictionary to read meaning of word
- if word is not guesses: show the correct solution
- if word is guessed correctly: add congrats message
- if word is guessed correctly: add "share on social media" function
*/
var wordGuess = document.querySelector(".word_label");
var btn = document.querySelector("button");
var guesses = document.querySelector(".wrong_guesses");
var solution = document.querySelector(".correct_word");

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
  image.classList.remove("animated", "fadeInDown");
  image.src = "images/empty.png";
  if (imageNumberValue < 6)
  {
    imageNumberValue ++;
    image.classList.add("animated","fadeInDown");
    imageSource = "images/stage_" + imageNumberValue + ".png";
    image.src = imageSource;
  } else {
  image.src = "images/stage_7.png";
  image.classList.add("animated","fadeInDown");
  endGame();
  }
};

var addLetterToWrongGuesses = function(letter){
  if (wrongGuesses.includes(letter.toUpperCase()) == false) {
  wrongGuesses.push(letter.toUpperCase());
  document.querySelector(".wrong_guesses").textContent = wrongGuesses.sort().join(" | ");
  nextImage();
} else {
  // show somewhere what letter you've already tried
  console.log("already tried that letter!");
}
};

var findLetterOccurences = function(letter){
  var array = [];
  for (var i = 0; i < word.length; i++){
    if (word.toLowerCase().charAt(i) == letter.toLowerCase()){
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
    wordShowedArray[position] = letter.toUpperCase();
  }
  wordShowed = wordShowedArray.join("  ");
  wordGuess.textContent = wordShowed;
  if (wordShowed.includes("_") == false){
    endGame();
  } else {
  return wordShowed;
  }
};

var checkLetter = function(letter){
  if(word.toLowerCase().includes(letter.toLowerCase())){
    showLetter(letter);
  } else {
    addLetterToWrongGuesses(letter.toLowerCase());
  }
};

var startGame = function(){
document.querySelector("img").src="images/stage_1.png";
wordGuess.textContent = " ";
guesses.textContent = "";
solution.textContent = "";
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
  solution.textContent = "The word was: " + word.toUpperCase();
  // show the solution!
};


startGame();

document.addEventListener('keypress', keyPressEvent);

btn.addEventListener('click', startGame);
