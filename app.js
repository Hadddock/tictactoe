/* eslint-disable prefer-destructuring */
//gameBoard module
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

//player factory
const Player = (playerName, playerMarker) => {
  const marker = playerMarker;
  const name = playerName;
  return { marker, name };
};

//game module
const game = (() => {
  let playerOne = Player("Player One", "X");
  let playerTwo = Player("Player Two", "O");
  let winner;
  let currentPlayer = playerOne;
  const board = gameBoard;

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

  const getPosition = () => {
    let response = NaN;
    while (Number.isNaN(response) || response < 0 || response > 8) {
      response = parseInt(prompt("Enter a position"), 10);
    }
    return response;
  };

  // const play = () => {
  //   console.log(board.displayBoard());
  //   while (!gameFinished()) {
  //     let playerPlaced = false;
  //     while (!playerPlaced) {
  //       playerPlaced = board.placePiece(getPosition(), playerOne.marker);
  //     }

  //     if (gameFinished()) {
  //       break;
  //     }
  //     console.log(board.displayBoard());

  //     playerPlaced = false;
  //     while (!playerPlaced) {
  //       playerPlaced = board.placePiece(getPosition(), playerTwo.marker);
  //     }
  //     console.log(board.displayBoard());
  //   }
  //   console.log(board.displayBoard());
  //   if (winner === undefined) {
  //     console.log("Tie Game!");
  //   } else {
  //     console.log(`${winner.name} Wins!`);
  //   }
  // };

  const getCurrentPlayer = () =>
    Player(currentPlayer.name, currentPlayer.marker);

  const playRound = (position) => {
    board.placePiece(position, currentPlayer.marker);

    if (gameFinished()) {
      if (winner === undefined) {
        console.log("Tie Game!");
      } else {
        console.log(`${currentPlayer.name} Wins!`);
      }
    }
    currentPlayer = currentPlayer === playerTwo ? playerOne : playerTwo;
  };

  return { playRound, getCurrentPlayer, gameFinished, reset };
})();

const htmlBoard = document.getElementById("board");

const resetButton = document.getElementById("reset");

function callPlayRound(e) {
  if (e.target.textContent === "" && !game.gameFinished()) {
    e.target.textContent = game.getCurrentPlayer().marker;
    game.playRound(e.target.id);
  }
}
const squares = [];

for (let i = 0; i < 9; i += 1) {
  const button = document.createElement("button");
  button.id = i;
  button.addEventListener("click", callPlayRound);
  squares.push(button);
  htmlBoard.appendChild(button);
}

function resetBoard() {
  squares.forEach((square) => {
    square.textContent = "";
  });
}

resetButton.addEventListener("click", game.reset);
resetButton.addEventListener("click", resetBoard);
