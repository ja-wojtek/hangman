console.log('Hangman game');

const letterLocation = document.querySelector('.container .game .letters .letters-board');
const passwordLocation = document.querySelector('.container .game .letters .password');
const endGameMessageLocation = document.querySelector('.container .game .letters .letters-split .end-game-message');
const passwordCategoryLocation = document.querySelector('.category_content');
const arrayLetters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];
const restartBtn = document.querySelector('.restartBtn');
const knownLetterLength = document.getElementsByClassName('letter-known');

let password = 'królik';
let passwordCategory = 'Zwierzęta';
let arrayPassword;
let lifePoints = 10;
let isGoodLetter;
let arrayChosenLetters = [];
let knownLetters = 0;
let isGameEnd = false;

createKeyboard()
splitPassword(password);
createPassword();
createListeners();

const canvas = document.getElementById('hangman-drawing');
const ctx = canvas.getContext('2d');

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
    //lifePoinsLocations.textContent = lifePoints;
  }
  if (arrayChosenLetters.includes(letter) === false) {
    arrayChosenLetters.push(letter);
  }
  drawHangman(lifePoints);
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
    endGameMessageLocation.textContent = 'Przegrałeś, spróbuj jeszcze raz';
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

function drawHangman(lifePoints) {
  ctx.fillStyle = "rgb(160, 160, 160)";
  ctx.strokeStyle = "rgb(160, 160, 160)";
  switch (lifePoints) {
    case 9: {
      ctx.fillRect(10, 180, 80, 2);
      break;
    }
    case 8: {
      ctx.fillRect(20, 20, 2, 160);
      break;
    }
    case 7: {
      ctx.fillRect(20, 20, 40, 2);
      break;
    }
    case 6: {
      ctx.fillRect(60, 20, 2, 10);
      break;
    }
    case 5: {
      ctx.beginPath();
      ctx.arc(61, 40, 10, 1, 360);
      ctx.stroke();
      ctx.fill();
      break;
    }
    case 4: {
      ctx.fillRect(60, 50, 2, 5);
      break;
    }
    case 3: {
      ctx.beginPath();
      ctx.moveTo(61, 55);
      ctx.lineTo(40, 70);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(61, 55);
      ctx.lineTo(80, 70);
      ctx.stroke();
      break;
    }
    case 2: {
      ctx.fillRect(60, 55, 2, 20);
      break;
    }
    case 1: {
      ctx.beginPath();
      ctx.moveTo(61, 75);
      ctx.lineTo(40, 90);
      ctx.stroke();
      break;
    }
    case 0: {
      ctx.beginPath();
      ctx.moveTo(61, 75);
      ctx.lineTo(80, 90);
      ctx.stroke();
      break;
    }
    default: {
      ctx.fillRect(0, 0, 100, 100);
    }
  }
}

restartBtn.addEventListener('click', function () { location.reload() })