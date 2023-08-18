console.log('Hangman game');

const letterLocation = document.querySelector('.container .game .letters .letters-board');

const passwordLocation = document.querySelector('.container .game .letters .password');
const arrayLetters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'];
let password = 'królik';
let arrayPassword;


createKeyboard()
splitPassword(password);
createPassword();

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
  }
}

for (let i = 0; i < arrayLetters.length; i++) {
  const letter = document.getElementById(`${i}`)
  letter.closest('div').addEventListener('click', function () { compareLetter(letter.textContent) });
}

function compareLetter(letter) {
  for (let i = 0; i < arrayPassword.length; i++) {
    if (letter === arrayPassword[i]) {
      showUnknownLetter(letter);
    }
  }
}

function showUnknownLetter(letter) {
  document.querySelector(`[letter="${letter}"]`).textContent = letter;
}



