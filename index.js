// script.js

const gameBoard = document.getElementById("game-board");
const cards = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = cards.length / 2;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const shuffledCards = shuffle([...cards]);
  shuffledCards.forEach((cardValue) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div class="front">${cardValue}</div>
            <div class="back"></div>
        `;
    card.dataset.value = cardValue;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    disableCards();
    matchedPairs++;
    checkForWin();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkForWin() {
  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      alert("Congratulations! You have completed the game!");
      resetGame();
    }, 500);
  }
}

function resetGame() {
  gameBoard.innerHTML = "";
  matchedPairs = 0;
  createBoard();
}

createBoard();
