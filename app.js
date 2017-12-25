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
  imageNumberValue ++;
  imageSource = "images/stage_" + imageNumberValue + ".jpg";
  image.src = imageSource;
};

var addLetterToWrongGuesses = function(letter){
  wrongGuesses.push(letter);
  document.querySelector(".wrong_guesses").textContent = wrongGuesses.sort().join(" | ");
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
    nextImage();
    addLetterToWrongGuesses(letter);
  }
};

word = randomWord(words);
var wordShowed = showWord(word);

document.addEventListener('keypress', (event) => {
  var keyName = event.key;
  checkLetter(keyName);
  //alert('keypress event\n\n' + 'key: ' + keyName);
});
