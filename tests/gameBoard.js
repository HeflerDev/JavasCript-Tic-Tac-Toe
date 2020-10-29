const gameBoard = (() => {
  // const board = document.getElementById('board');
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
  const board = document.getElementById('board');
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

module.exports = gameBoard;
