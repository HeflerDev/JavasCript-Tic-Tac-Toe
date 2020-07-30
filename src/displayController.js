import Player from './player';
import gameBoard from './gameBoard';

const displayController = (() => {
  let message;
  let countMarks = 0;
  let currentPlayer;
  let messageContainer;
  let newButton;
  let resetButton;

  const gameOverMessage = (string) => {
    messageContainer = document.querySelector('.message');
    messageContainer.style.display = 'flex';

    message = document.querySelector('.result-message');
    message.textContent = `${string}`;

    newButton = document.querySelector('.new-game');
    newButton.textContent = 'New Game';

    resetButton = document.querySelector('.reset-game');
    resetButton.textContent = 'Reset Game';
  };

  const resetGame = () => {
    document.getElementById('reset-game').addEventListener('click', () => {
      window.location.reload();
    });
  };

  const resetBoard = () => {
    document.getElementById('new-game').addEventListener('click', () => {
      const cell = gameBoard.getCells();
      for (let i = 0; i < 9; i += 1) {
        cell[i].textContent = '';
        cell[i].classList.remove('win');
      }
      document.querySelector('.message').style.display = 'none';
    });
  };

  const checkWins = (cell) => {
    gameBoard.winCombos.forEach((combo) => {
      const elem1 = combo[0];
      const elem2 = combo[1];
      const elem3 = combo[2];

      if (
        cell[elem1].innerHTML
        && cell[elem1].innerHTML === cell[elem2].innerHTML
        && cell[elem1].innerHTML === cell[elem3].innerHTML
      ) {
        cell[elem1].classList.add('win');
        cell[elem2].classList.add('win');
        cell[elem3].classList.add('win');

        gameOverMessage(`${currentPlayer.name} wins`);
        resetGame();
        resetBoard();
        currentPlayer.score += 1;
        countMarks = 0;
      }
    });
  };


  const checkTie = (countMarks) => {
    if (countMarks === 9) {
      gameOverMessage('It\'s a tie');
      resetGame();
      resetBoard();
      countMarks = 0;
    }
  };


  const getPlayersData = () => {
    const pname1 = document.getElementById('player1').value;
    const pname2 = document.getElementById('player2').value;
    const player1 = Player(pname1, 'X');
    const player2 = Player(pname2, 'O');
    return [player1, player2];
  };

  const playerMove = () => {
    const players = getPlayersData();
    const player1 = players[0];
    const player2 = players[1];
    gameBoard.displayPlayers(player1, player2);
    const cell = gameBoard.getCells();


    for (let i = 0; i < 9; i += 1) {
      // eslint-disable-next-line no-loop-func
      cell[i].addEventListener('click', () => {
        if (cell[i].textContent === '') {
          if (countMarks % 2 === 0) {
            cell[i].textContent = player1.symbol;
            currentPlayer = player1;
          } else {
            cell[i].textContent = player2.symbol;
            currentPlayer = player2;
          }
          countMarks += 1;
        }
        gameBoard.updateStyle(currentPlayer, player1);
        displayController.checkWins(cell);
        gameBoard.updateScore(currentPlayer, player1);
        displayController.checkTie(countMarks);
      });
    }
  };

  const submitBtn = () => {
    gameBoard.renderCell();
    playerMove();
    const form = document.getElementById('players-form');
    form.style.display = 'none';
  };

  return {
    checkWins, checkTie, getPlayersData, submitBtn, playerMove,
  };
})();

export default displayController;