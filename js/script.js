console.log('Hangman game');

const letterLocation = document.querySelector('.container .game .letters .letters-board');
const passwordLocation = document.querySelector('.container .game .letters .password');
const passwordCategoryLocation = document.querySelector('.category_content');
const arrayLetters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];
const lifePoinsLocations = document.querySelector('.counter');
const restartBtn = document.querySelector('.restartBtn');

let password = 'królik';
let passwordCategory = 'Zwierzęta';
let arrayPassword;
let lifePoints = 8;
let isGoodLetter;
let arrayChosenLetters = ['W'];

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
  isGoodLetter = false;
  for (let i = 0; i < arrayPassword.length; i++) {
    if (letter.textContent === arrayPassword[i]) {
      showUnknownLetter(letter.textContent);
      isGoodLetter = true;
    }
  }
  letter.classList.add('letter-clicked');
  updateLifPoints(isGoodLetter, letter.textContent);
}

function updateLifPoints(isGoodLetter, letter) {
  if (isGoodLetter === false && arrayChosenLetters.includes(letter) === false) {
    lifePoinsLocations.textContent -= 1;
  }
  arrayChosenLetters.push(letter);
  console.log(arrayChosenLetters);
}

function showUnknownLetter(letter) {
  let temp = document.querySelectorAll(`[letter="${letter}"]`);
  for (let i = 0; i < temp.length; i++) {
    temp[i].textContent = letter;
    temp[i].classList.add('letter-known');
  }
}

restartBtn.addEventListener('click', function () { location.reload() })

console.log(passwordCategoryLocation)