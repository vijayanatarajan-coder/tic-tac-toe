let playerOne = [];
let playerTwo = [];

let currentPlayer1 = "";
let currentPlayer2 = "";

let playerOneturn = true;
let playerTwoturn = false;

const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Reset game function
function resetGame() {
    playerOne = [];
    playerTwo = [];
    playerOneturn = true;
    playerTwoturn = false;

    // Clear the board
    for (let i = 0; i < 9; i++) {
        document.getElementById("box-" + i).innerHTML = "";
        document.getElementById("box-" + i).onclick = function () {
            handleClick(i);
        };
    }

    document.getElementById('resultMessage').innerText = ""; // Clear the message

}

// Start game button event to set player names and show the board
document.getElementById('startGameBtn').addEventListener('click', function () {
    currentPlayer1 = document.getElementById('player-1').value.trim();
    currentPlayer2 = document.getElementById('player-2').value.trim();

    if (!currentPlayer1 || !currentPlayer2) {
        alert("Please enter names for both players before starting the game!");
        return; // Exit the function if names are not provided
    }

    // Display the game board
    document.getElementById('tic-tac-toe-board').style.display = "grid";
    document.getElementById('resultMessage').innerText = `${currentPlayer1}'s turn`;
    document.getElementById('resetGameBtn').style.display = "inline"; // Show reset button
    resetGame(); // Reset the game state
});

function handleClick(index) {
    // Check if the cells are already filled
    if (document.getElementById("box-" + index).innerHTML !== "") {
        alert("Cell is already occupied! Choose another cell.");
        return;
    }
    if (!currentPlayer1 || !currentPlayer2) {
        alert("Please start the game by entering both player names!");
        return;
    }
    console.log('Clicked', index);
    // Storing Values
    if (playerOneturn) {
        document.getElementById("box-" + index).innerHTML = "X";
        playerOne.push(index);
        document.getElementById('resultMessage').innerText = `${currentPlayer2}'s turn`;
    }
    if (playerTwoturn) {
        document.getElementById("box-" + index).innerHTML = "O";
        playerTwo.push(index);
        document.getElementById('resultMessage').innerText = `${currentPlayer1}'s turn`;
    }

    // Check if Player 1 wins
    if (playerOne.length >= 3) {
        checkWinner(playerOne, currentPlayer1);
    }

    // Check if Player 2 wins
    if (playerTwo.length >= 3) {
        checkWinner(playerTwo, currentPlayer2);
    }

    //Switching the players turn
    if (playerOneturn) {
        playerOneturn = false;
        playerTwoturn = true;
    } else if (playerTwoturn) {
        playerOneturn = true;
        playerTwoturn = false;
    }

    // Function to check if a player has won
    function checkWinner(playerMoves, playerName) {
        for (let i = 0; i < winningMoves.length; i++) {
            let winCombo = winningMoves[i];
            if (winCombo.every((move) => playerMoves.includes(move))) {
                document.getElementById('resultMessage').innerText = `The winner is ${playerName}!`;
                disableBoard();
                return;
            }
        }

        // Check if it's a draw
        if (playerOne.length + playerTwo.length === 9) {
            document.getElementById('resultMessage').innerText = "It's a draw!";
        }
    }

    function disableBoard() {
        for (let i = 0; i < 9; i++) {
            document.getElementById("box-" + i).onclick = null; // Remove click event from each cell
        }
    }

}