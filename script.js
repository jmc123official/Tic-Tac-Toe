document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const gameStatus = document.getElementById('game-status');
    const currentPlayerSpan = document.getElementById('current-player');
    const resetButton = document.getElementById('reset-button');
    const startButton = document.getElementById('start-button');
    const player1Input = document.getElementById('player1-name');
    const player2Input = document.getElementById('player2-name');
    const gameContainer = document.querySelector('.game-container');
    const gameBoardContainer = document.querySelector('.game-board-container');
    const winnerContainer = document.querySelector('.winner-container');
    const winnerMessage = document.getElementById('winner-message');
    const countdownMessage = document.getElementById('countdown-message');
    let currentPlayer = 'X';
    let gameActive = false;
    let player1Name = 'Player 1';
    let player2Name = 'Player 2';
    let countdown = 5; // Countdown time in seconds
    const gameState = Array(9).fill(null);

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        if (!gameActive) return;

        const cell = event.target;
        const cellIndex = Array.from(cells).indexOf(cell);

        if (gameState[cellIndex]) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            displayWinnerMessage();
            gameActive = false;
            startResetCountdown();
        } else if (gameState.every(cell => cell)) {
            gameStatus.textContent = `It's a tie!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerSpan.textContent = currentPlayer;
            updateGameStatus();
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === currentPlayer);
        });
    }

    function displayWinnerMessage() {
        const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
        winnerMessage.textContent = `Player ${winnerName} wins!`;
        winnerContainer.style.display = 'block';
    }

    function resetGame() {
        location.reload()
    }

    function startGame() {
        player1Name = player1Input.value || 'Player 1';
        player2Name = player2Input.value || 'Player 2';
        gameActive = true;
        gameBoardContainer.style.display = 'block';
        document.querySelector('.player-inputs').style.display = 'none';
        document.getElementById('start-button').style.display = 'none';
        updateGameStatus();
    }

    function updateGameStatus() {
        gameStatus.textContent = `Current Player: ${currentPlayer === 'X' ? player1Name : player2Name}`;
    }

    function startResetCountdown() {
        let intervalId = setInterval(() => {
            countdown--;
            countdownMessage.textContent = `Game reset in ${countdown} secs!`;
            if (countdown === 0) {
                clearInterval(intervalId);
                resetGame();
                countdown = 5; // Reset countdown
                countdownMessage.textContent = ''; // Clear countdown message
            }
        }, 1000);
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    startButton.addEventListener('click', startGame);
});
