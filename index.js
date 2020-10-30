const Player = (name, symbol, score = 0) => ({ name, symbol, score });

const gameBoard = (() => {
  const board = document.getElementById('board');
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const renderCell = () => {
    for (let i = 0; i < 9; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell', 'col-4');
      cell.id = `cell-${i}`;
      board.appendChild(cell);
    }
  };

  const getCells = () => {
    const cell = document.querySelectorAll('.cell');
    return cell;
  };

  const displayPlayers = (player1, player2) => {
    const p1 = document.querySelector('.dis-player1');
    const p2 = document.querySelector('.dis-player2');

    const nameCont1 = document.querySelector('.name1-container');
    const pName1 = document.createElement('div');
    pName1.classList.add('p1name', 'absolute');
    pName1.textContent = player1.name;

    const pSymbol1 = document.createElement('div');
    pSymbol1.classList.add('p1symbol');
    pSymbol1.textContent = player1.symbol;

    const pScore1 = document.createElement('div');
    const scoreTitle1 = document.createElement('span');
    const score1 = document.createElement('div');
    pScore1.classList.add('p1score');
    scoreTitle1.classList.add('absolute');
    scoreTitle1.textContent = 'SCORE';
    score1.classList.add('score1');
    score1.textContent = player1.score;

    nameCont1.appendChild(pName1);
    p1.append(pSymbol1);
    p1.appendChild(pScore1);
    pScore1.appendChild(scoreTitle1);
    pScore1.appendChild(score1);
    p1.classList.add('d-flex', 'flex-column');

    const nameCont2 = document.querySelector('.name2-container');
    const pName2 = document.createElement('div');
    pName2.classList.add('p2name', 'absolute');
    pName2.textContent = player2.name;

    const pSymbol2 = document.createElement('div');
    pSymbol2.classList.add('p2symbol');
    pSymbol2.textContent = player2.symbol;

    const pScore2 = document.createElement('div');
    const scoreTitle2 = document.createElement('span');
    const score2 = document.createElement('div');
    pScore2.classList.add('p2score');
    scoreTitle2.classList.add('absolute');
    scoreTitle2.textContent = 'SCORE';
    score2.classList.add('score2');
    score2.textContent = player2.score;

    nameCont2.appendChild(pName2);
    p2.append(pSymbol2);
    p2.appendChild(pScore2);
    pScore2.appendChild(scoreTitle2);
    pScore2.appendChild(score2);
    p2.classList.add('d-flex', 'flex-column');
  };

  const updateStyle = (currentPlayer, player) => {
    if (currentPlayer === player) {
      document.querySelector('.dis-player1').classList.remove('player-turn');
      document.querySelector('.dis-player2').classList.add('player-turn');
    } else {
      document.querySelector('.dis-player2').classList.remove('player-turn');
      document.querySelector('.dis-player1').classList.add('player-turn');
    }
  };

  const updateScore = (currentPlayer, player1) => {
    if (currentPlayer === player1) {
      const pScore1 = document.querySelector('.score1');
      pScore1.textContent = currentPlayer.score;
    } else {
      const pScore2 = document.querySelector('.score2');
      pScore2.textContent = currentPlayer.score;
    }
  };

  return {
    winCombos, renderCell, getCells, displayPlayers, updateScore, updateStyle,
  };
})();

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

// eslint-disable-next-line no-unused-vars
const gameStart = (() => {
  document.getElementById('players-form').onsubmit = () => {
    displayController.submitBtn();
    return false;
  };
})();
