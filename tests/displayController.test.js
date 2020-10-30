const displayController = require('./displayController');
const gameBoard = require('./gameBoard');

const setScenario = (string) => { document.body.innerHTML = string; };

describe('when player play', () => {
  beforeEach(() => {
    setScenario('<div id="board"></div>');
    gameBoard.renderCell();
  });
  test('add player symbol', () => {
    displayController.playerMove();
    const paramOne = document.querySelector('#cell-0');
    const paramTwo = document.querySelector('#cell-1');
    expect(paramOne.textContent).toBe('');
    paramOne.click();
    expect(paramOne.textContent).toBe('X');
    paramTwo.click();
    expect(paramTwo.textContent).toBe('O');
  });
  test('player win when combo', () => {
    const cellOne = document.querySelector('#cell-0');
    cellOne.textContent = 'X';
    const cellTwo = document.querySelector('#cell-1');
    cellTwo.textContent = 'X';
    const cellThree = document.querySelector('#cell-2');
    cellThree.textContent = 'X';

    expect(cellOne.className).not.toMatch(/win/);
    expect(cellTwo.className).not.toMatch(/win/);
    expect(cellThree.className).not.toMatch(/win/);

    displayController.checkWins(document.querySelectorAll('.cell'));

    expect(cellOne.className).toMatch(/win/);
    expect(cellTwo.className).toMatch(/win/);
    expect(cellThree.className).toMatch(/win/);
  });
});

describe('when game ends', () => {
  beforeEach(() => {
    setScenario(
      '<div class="message"></div>'
            + '<div class="result-message"></div>'
            + '<div class="new-game"></div>'
            + '<div class="reset-game"></div>',
    );
  });
  test('display text correctly', () => {
    displayController.gameOverMessage('Game Over');

    const gameOverText = document.querySelector('.result-message').textContent;
    const newGameText = document.querySelector('.new-game').textContent;
    const resetGameText = document.querySelector('.reset-game').textContent;

    expect(gameOverText).toMatch(/Game Over/);
    expect(newGameText).toMatch(/New Game/);
    expect(resetGameText).toMatch(/Reset Game/);
  });

  test('display screen styling', () => {
    displayController.gameOverMessage('Game Over');

    const messageContainerStyle = document.querySelector('.message').style.display;
    expect(messageContainerStyle).toMatch(/flex/);
  });
});

describe('when buttons are called', () => {
  beforeEach(() => {
    setScenario(
      '<div id="new-game"></div> '
            + '<div id="board"></div>',
    );
    gameBoard.renderCell();
    document.querySelector('#cell-0').classList.add('win');
    document.querySelector('#cell-1').classList.add('win');
    document.querySelector('#cell-2').classList.add('win');
  });
  test('reset board', () => {
    displayController.resetBoard();
    document.querySelector('#new-game').click();
    const result = document.querySelectorAll('.win');

    expect(result[0]).toBeUndefined();
    expect(result[1]).toBeUndefined();
    expect(result[2]).toBeUndefined();

    document.querySelectorAll('.cell').forEach((item) => {
      expect(item.textContent).toBe('');
    });
  });
});
