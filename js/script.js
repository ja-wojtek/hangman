console.log('Hangman game');

const letterLocation = document.querySelector('.container .game .letters .letters-board');
const passwordLocation = document.querySelector('.container .game .letters .password');
const endGameMessageLocation = document.querySelector('.container .game .letters .letters-split .end-game-message');
const passwordCategoryLocation = document.querySelector('.category_content');
const arrayLetters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];
const lifePoinsLocations = document.querySelector('.counter');
const restartBtn = document.querySelector('.restartBtn');
const knownLetterLength = document.getElementsByClassName('letter-known');

let password = 'królik';
let passwordCategory = 'Zwierzęta';
let arrayPassword;
let lifePoints = 8;
let isGoodLetter;
let arrayChosenLetters = [];
let knownLetters = 0;
let isGameEnd = false;

createKeyboard()
splitPassword(password);
createPassword();
createListeners();

function splitPassword(word) {
  arrayPassword = word.toUpperCase().split("");
}

function createKeyboard() {
  for (let i = 0; i < arrayLetters.length; i++) {
    const keyboard = document.createElement('div');
    keyboard.textContent = arrayLetters[i];
    letterLocation.append(keyboard);
    keyboard.classList.add('letter');
    keyboard.setAttribute("id", i)
  }
}

function createPassword() {
  for (let i = 0; i < arrayPassword.length; i++) {
    const passwordLetters = document.createElement('div');
    passwordLetters.textContent = '?';
    passwordLocation.append(passwordLetters);
    passwordLetters.setAttribute("letter", arrayPassword[i])
    passwordLetters.classList.add('letter');
    passwordLetters.classList.add('letter-unknown');
    passwordCategoryLocation.textContent = passwordCategory;
  }
}

function createListeners() {
  for (let i = 0; i < arrayLetters.length; i++) {
    const letter = document.getElementById(`${i}`)
    letter.closest('div').addEventListener('click', function () { compareLetter(letter) });
  }
}

function compareLetter(letter) {
  if (isGameEnd === false) {
    isGoodLetter = false;
    for (let i = 0; i < arrayPassword.length; i++) {
      if (letter.textContent === arrayPassword[i]) {
        showUnknownLetter(letter.textContent);
        isGoodLetter = true;
      }
    }
    letter.classList.add('letter-clicked');
    updateLifPoints(isGoodLetter, letter.textContent);
    wonGame();
  }
}

function updateLifPoints(isGoodLetter, letter) {
  if (isGoodLetter === false && arrayChosenLetters.includes(letter) === false && isGameEnd === false) {
    lifePoints -= 1;
    lifePoinsLocations.textContent = lifePoints;
  }
  if (arrayChosenLetters.includes(letter) === false) {
    arrayChosenLetters.push(letter);
  }
  endGame();
}

function showUnknownLetter(letter) {
  let temp = document.querySelectorAll(`[letter="${letter}"]`);
  if (isGameEnd === false) {
    for (let i = 0; i < temp.length; i++) {
      temp[i].textContent = letter;
      temp[i].classList.add('letter-known');
    }
  }
}

function endGame() {
  if (lifePoints <= 0) {
    endGameMessageLocation.textContent = 'Przegrałeś, spróbój jeszcze raz';
    isGameEnd = true;
    showPassword();
    restartBtn.classList.add('restartBtnEnd');
  }
}

function wonGame() {
  if (knownLetterLength.length === arrayPassword.length) {
    endGameMessageLocation.textContent = 'Gratulację!';
    isGameEnd = true;
  }
}

function showPassword() {
  let temp = document.querySelectorAll('.container .game .letters .password .letter-unknown');
  if (isGameEnd === true) {
    for (let i = 0; i < temp.length; i++) {
      temp[i].classList.add('letter-showed');
      temp[i].textContent = arrayPassword[i];
    }
  }
}

restartBtn.addEventListener('click', function () { location.reload() })