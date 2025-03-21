const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");

const BOARD_SIZE = 20; // 20x20 grid
const CELLS_COUNT = BOARD_SIZE * BOARD_SIZE;
let snake = [{ x: 10, y: 10 }]; // Initial position
let food = { x: 5, y: 5 }; // Initial food position
let direction = { x: 0, y: 0 }; // Snake starts stationary
let score = 0;
let gameInterval;

// Initialize the board
function createBoard() {
  for (let i = 0; i < CELLS_COUNT; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    board.appendChild(cell);
  }
}

// Render the snake
function drawSnake() {
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach(cell => cell.classList.remove("snake"));

  snake.forEach(segment => {
    const index = segment.y * BOARD_SIZE + segment.x;
    cells[index].classList.add("snake");
  });
}

// Render the food
function drawFood() {
    const cells = document.querySelectorAll(".grid-cell");
    cells.forEach(cell => cell.classList.remove("food"));
    cells.forEach(cell => (cell.innerHTML = "")); // Clear any previous emoji
  
    const index = food.y * BOARD_SIZE + food.x;
    const foodCell = cells[index];
    foodCell.classList.add("food");
    foodCell.innerHTML = "🍎"; // Add apple emoji
  }
  

// Move the snake
function moveSnake() {
  const newHead = {
    x: (snake[0].x + direction.x + BOARD_SIZE) % BOARD_SIZE,
    y: (snake[0].y + direction.y + BOARD_SIZE) % BOARD_SIZE,
  };

  // Check for collisions with the snake's body
  if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    alert(`Game Over! Your score: ${score}`);
    resetGame();
    return;
  }

  snake.unshift(newHead);

  // Check if the snake eats the food
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    placeFood();
  } else {
    snake.pop();
  }

  drawSnake();
}

// Place food at a random position
function placeFood() {
  food = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };

  // Ensure the food doesn't appear on the snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  } else {
    drawFood();
  }
}

// Change direction based on key press
function changeDirection(event) {
  const key = event.key;

  if (key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (key === "ArrowRight" && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
}

// Reset the game
function resetGame() {
  clearInterval(gameInterval);
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  placeFood();
  drawSnake();
  startGame();
}

// Start the game loop
function startGame() {
  gameInterval = setInterval(() => {
    if (direction.x !== 0 || direction.y !== 0) {
      moveSnake();
    }
  }, 200);
}

// Initialize game
createBoard();
drawSnake();
drawFood();
window.addEventListener("keydown", changeDirection);
startGame();
