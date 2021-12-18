// Get the DOM elements

const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const message = document.getElementById('win-lose');
const notification = document.getElementById('sliding-container');
const restartButton = document.getElementById('restart');

const hangmanParts = document.querySelectorAll('.hangman-part'); // Will be saved in an array

// An array of words to select from
const wordPool = ['javascript', 'computer', 'hangman', 'facebook', 'youtube'];

// Selecting a word at random from the wordpool
let selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

// Arrays to classify the input of the user
const correctLetters = [];
const incorrectLetters = [];

// Function to display the word on the screen
function displaySelectedWord() {
    word.innerHTML = `
        ${selectedWord.split('').map(letter => `
        <span class = "letter">
            ${correctLetters.includes(letter) ? letter : '' }
        </span>`).join('')}
    `;

    console.log(word.innerText);
    // 24:57
}

displaySelectedWord();