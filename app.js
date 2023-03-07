/* eslint-disable prefer-destructuring */
//gameBoard module
const gameBoard = (() => {
  let board = [];
  const reset = () => {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  };
  const placePiece = (marker, position) => {
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
  reset();

  return { reset, getBoard, placePiece };
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
  const play = () => {};
  const checkThree = (positionOne, positionTwo, positionThree) => {
    const currentBoard = board.getBoard();
    return (
      (currentBoard[positionOne] === currentBoard[positionTwo]) ===
      currentBoard[positionThree]
    );
  };

  //return winningPlayer if finished, otherwise false
  const gameFinished = () => {
    let currentBoard = board.getBoard();
    let winningPlayerMarker = "";
    //win involving first piece
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
    } else {
      return false;
    }
    if (winningPlayerMarker === playerOne.marker) {
      return playerOne;
    }
    return playerTwo;
  };
})();

game.play();
