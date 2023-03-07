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
  const playerOne = Player("Player One", "X");
  const playerTwo = Player("Player Two", "O");
  const board = gameBoard;
  const playRound = () => {};
  return { playRound };
})();

game.play();
