const cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let timer;
let seconds = 0;
let canFlip = true;

const rightSound = new Audio("../Audio/game/rightanswer.mp3");
const wrongSound = new Audio("../Audio/game/error.wav");
const successSound = new Audio("../Audio/game/success.wav");

function initializeGame() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  cards.length = 0;
  flippedCards = [];
  matchedPairs = 0;
  score = 0;
  seconds = 0;
  canFlip = false;
  document.getElementById("score").textContent = "0";
  document.getElementById("timer").textContent = "0:00";
  document.getElementById("winMessage").style.display = "none";

  const cardImages = [];

  for (let i = 1; i <= 10; i++) {
    cardImages.push(`Food-${i.toString().padStart(2, "0")}.jpg`);
    cardImages.push(`Food-${i.toString().padStart(2, "0")}.jpg`);
  }

  shuffleArray(cardImages);

  cardImages.forEach((img, index) => {
    const card = document.createElement("div");
    card.className = "card flipped"; // Show front initially
    card.dataset.cardId = index;
    card.dataset.image = img;

    card.innerHTML = `
      <div class="card-face card-front">
        <img src="../img/Game/${img}" alt="food">
      </div>
      <div class="card-face card-back"></div>
    `;

    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
    cards.push(card);
  });

  // Show preview for 1 second, then flip all cards back
  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flipped"));
    canFlip = true;
    startTimer();
  }, 3000);
}

function flipCard(card) {
  if (
    !canFlip ||
    flippedCards.includes(card) ||
    card.classList.contains("matched")
  ) {
    return;
  }

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    canFlip = false;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const match = card1.dataset.image === card2.dataset.image;

  if (match) {
    rightSound.play();
    card1.classList.add("matched");
    card2.classList.add("matched");
    score += 10;
    matchedPairs++;

    if (matchedPairs === 10) {
      successSound.play();
      endGame();
    }
  } else {
    wrongSound.play();
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 1000);
    score = Math.max(0, score - 5);
  }

  document.getElementById("score").textContent = score;

  setTimeout(() => {
    flippedCards = [];
    canFlip = true;
  }, 1000);
}

function endGame() {
  clearInterval(timer);
  document.getElementById("finalTime").textContent = formatTime(seconds);
  document.getElementById("finalScore").textContent = score;
  document.getElementById("winMessage").style.display = "block";
}

function restartGame() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedPairs = 0;
  score = 0;
  seconds = 0;
  document.getElementById("score").textContent = "0";
  document.getElementById("timer").textContent = "0:00";
  document.getElementById("winMessage").style.display = "none";
  clearInterval(timer);
  initializeGame();
}

function startTimer() {
  clearInterval(timer);
  seconds = 0;
  timer = setInterval(() => {
    seconds++;
    document.getElementById("timer").textContent = formatTime(seconds);
  }, 1000);
}

function formatTime(secs) {
  const minutes = Math.floor(secs / 60);
  const remainingSeconds = secs % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");

  // Hide game board and restart button initially
  gameBoard.style.display = "none";
  document.querySelector(".game-controls").style.display = "none";

  // Create Start Game button
  const startBtn = document.createElement("button");
  startBtn.textContent = "開始遊戲";
  startBtn.className = "start-button mandarin-text";
  startBtn.style.padding = "12px 24px";
  startBtn.style.fontSize = "1.2rem";
  startBtn.style.margin = "auto auto";
  startBtn.style.display = "block";
  startBtn.style.borderRadius = "5px";
  startBtn.style.border = "none";
  startBtn.style.color = "white";
  startBtn.style.backgroundColor = "#4caf50";

  // When button is clicked
  startBtn.addEventListener("click", () => {
    startBtn.remove(); // Remove start button
    gameBoard.style.display = "grid"; // Show game board
    document.querySelector(".game-controls").style.display = "block"; // Show restart
    initializeGame(); // Start the game!
  });

  // Add start button before the game board
  gameBoard.parentNode.insertBefore(startBtn, gameBoard);
});

// Middle mouse Disable Test
// 阻止右鍵選單
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// 阻止 F12 和常見的開發者工具快捷鍵
document.addEventListener("keydown", function (e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey &&
      e.shiftKey &&
      (e.key === "I" || e.key === "J" || e.key === "C")) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});

// 阻止滑鼠中鍵（滾輪點擊）
document.addEventListener("mousedown", function (e) {
  if (e.button === 1) {
    e.preventDefault();
  }
});
