const gameBoard = require('./gameBoard')

const resetHTML = () => document.body.innerHTML = '<div id="board"></div>';

test('renderCell should display unique cells', () => {
    resetHTML();
    gameBoard.renderCell();
    const board = Array.from(gameBoard.getCells());
    const result = board.map(item => item.id);
    expect(Array.isArray(result)).toBeTruthy();
    for (let i = 0; i < 9; i++) {
        expect(result).toContain(`cell-${i}`);
    }
});


