/* eslint-disable prefer-destructuring */
//gameBoard module
const gameBoard = (() => {
  let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  const reset = () => {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  };
  const placePiece = (position, marker) => {
    if (
      marker !== " " &&
      position < board.length &&
      position >= 0 &&
      board[position] === " "
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
  const board = gameBoard;

  const checkThree = (positionOne, positionTwo, positionThree) => {
    const currentBoard = board.getBoard();
    return (
      currentBoard[positionOne] !== " " &&
      currentBoard[positionOne] === currentBoard[positionTwo] &&
      currentBoard[positionTwo] === currentBoard[positionThree]
    );
  };

  const gameFinished = () => {
    const currentBoard = board.getBoard();
    let winningPlayerMarker = "";

    if (checkThree(0, 1, 2) || checkThree(0, 3, 6) || checkThree(0, 4, 8)) {
      winningPlayerMarker = currentBoard[0];
    } else if (
      checkThree(1, 4, 7) ||
      checkThree(3, 4, 5) ||
      checkThree(6, 4, 2)
    ) {
      winningPlayerMarker = currentBoard[4];
    } else if (checkThree(6, 7, 8) || checkThree(2, 5, 8)) {
      winningPlayerMarker = currentBoard[8];
    } else if (!currentBoard.includes(" ")) {
      return true;
    } else {
      return false;
    }
    winner = playerTwo;
    if (winningPlayerMarker === playerOne.marker) {
      winner = playerOne;
    }
    return true;
  };

  const getPosition = () => {
    let response = NaN;
    while (Number.isNaN(response) || response < 0 || response > 8) {
      response = parseInt(prompt("Enter a position"), 10);
    }
    return response;
  };

  const play = () => {
    console.log(board.displayBoard());
    while (!gameFinished()) {
      let playerPlaced = false;
      while (!playerPlaced) {
        playerPlaced = board.placePiece(getPosition(), playerOne.marker);
      }

      if (gameFinished()) {
        break;
      }
      console.log(board.displayBoard());

      playerPlaced = false;
      while (!playerPlaced) {
        playerPlaced = board.placePiece(getPosition(), playerTwo.marker);
      }
      console.log(board.displayBoard());
    }
    console.log(board.displayBoard());
    if (winner === undefined) {
      console.log("Tie Game!");
    } else {
      console.log(`${winner.name} Wins!`);
    }
  };
  return { play };
})();

game.play();
