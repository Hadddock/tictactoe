/* eslint-disable prefer-destructuring */
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  const placePiece = (position, marker) => {
    if (
      marker !== "" &&
      position < board.length &&
      position >= 0 &&
      board[position] === ""
    ) {
      board[position] = marker;
      return true;
    }
    return false;
  };
  const getBoard = () => [...board];
  const displayBoard = () =>
    `${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`;
  reset();

  return { reset, getBoard, placePiece, displayBoard };
})();

const Player = (playerName, playerMarker) => {
  const marker = playerMarker;
  const name = playerName;
  return { marker, name };
};

const playerTurn = document.getElementById("playerTurn");

const game = (() => {
  const playerOne = Player("Player One", "X");
  const playerTwo = Player("Player Two", "O");
  let winner;
  let currentPlayer = playerOne;
  const board = gameBoard;

  const getCurrentPlayer = () =>
    Player(currentPlayer.name, currentPlayer.marker);
  const getWinner = () => winner.name;
  const setPlayerNames = (playerOneName, playerTwoName) => {
    playerOne.name = playerOneName;
    playerTwo.name = playerTwoName;
  };

  const checkThree = (positionOne, positionTwo, positionThree) => {
    const currentBoard = board.getBoard();
    return (
      currentBoard[positionOne] !== "" &&
      currentBoard[positionOne] === currentBoard[positionTwo] &&
      currentBoard[positionTwo] === currentBoard[positionThree]
    );
  };

  const reset = () => {
    winner = undefined;
    board.reset();
    currentPlayer = playerOne;
  };

  const gameFinished = () => {
    const currentBoard = board.getBoard();
    if (
      checkThree(0, 1, 2) ||
      checkThree(0, 3, 6) ||
      checkThree(0, 4, 8) ||
      checkThree(1, 4, 7) ||
      checkThree(3, 4, 5) ||
      checkThree(6, 4, 2) ||
      checkThree(6, 7, 8) ||
      checkThree(2, 5, 8)
    ) {
      winner = currentPlayer;
      return true;
    }
    if (!currentBoard.includes("")) {
      return true;
    }
    return false;
  };

  const playRound = (position) => {
    board.placePiece(position, currentPlayer.marker);
    if (!gameFinished()) {
      currentPlayer = currentPlayer === playerTwo ? playerOne : playerTwo;
    }
  };

  return {
    playRound,
    getCurrentPlayer,
    gameFinished,
    reset,
    setPlayerNames,
    getWinner,
  };
})();

const htmlBoard = document.getElementById("board");
const resetButton = document.getElementById("reset");
const form = document.getElementById("nameForm");

const styleController = (() => {
  const squares = [];
  const resetBoard = () => {
    squares.forEach((square) => {
      square.textContent = "";
      playerTurn.textContent = `${game.getCurrentPlayer().name}'s Turn!`;
    });
  };

  const renamePlayers = (e) => {
    if (e.preventDefault) e.preventDefault();
    let playerOneName = document.getElementById("playerOneName").value;
    let playerTwoName = document.getElementById("playerTwoName").value;
    playerOneName = playerOneName === "" ? "Player One" : playerOneName;
    playerTwoName = playerTwoName === "" ? "Player Two" : playerTwoName;
    game.setPlayerNames(playerOneName, playerTwoName);
    playerTurn.textContent = `${game.getCurrentPlayer().name}'s Turn!`;
    return false;
  };

  const callPlayRound = (e) => {
    if (e.target.textContent === "" && !game.gameFinished()) {
      e.target.textContent = game.getCurrentPlayer().marker;
      game.playRound(e.target.id);
      playerTurn.textContent = `${game.getCurrentPlayer().name}'s Turn!`;
      if (game.gameFinished()) {
        if (game.getWinner() === undefined) {
          playerTurn.textContent = `Tie game!`;
        } else {
          playerTurn.textContent = `${game.getWinner()} Wins!`;
        }
      }
    }
  };
  return { resetBoard, squares, callPlayRound, renamePlayers };
})();

form.addEventListener("submit", styleController.renamePlayers);

resetButton.addEventListener("click", game.reset);
resetButton.addEventListener("click", styleController.resetBoard);

for (let i = 0; i < 9; i += 1) {
  const button = document.createElement("button");
  button.id = i;
  button.addEventListener("click", styleController.callPlayRound);
  styleController.squares.push(button);
  htmlBoard.appendChild(button);
}
styleController.resetBoard();
