const gameBoard = require('./gameBoard')

const resetHTML = (string) => document.body.innerHTML = string;

test('renderCell should display unique cells', () => {
    resetHTML('<div id="board"></div>');
    gameBoard.renderCell();
    const board = Array.from(gameBoard.getCells());
    const result = board.map(item => item.id);
    // Test result
    expect(Array.isArray(result)).toBeTruthy();
    for (let i = 0; i < 9; i++) {
        expect(result).toContain(`cell-${i}`);
    }
});

test('should update class on player turn', () => {
    // Scenario
    const resetScenario = () => {
        resetHTML(
            "<div class='dis-player1'></div>" +
            "<div class='dis-player2'></div>"
        )
    };
    resetScenario();

    const player1 = {
        'name':'p1',
        'score':10
    }
    const player2 = {
        'name':'p2',
        'score':20
    }
    // p1
    gameBoard.updateStyle(player1, player2);
    const resultOne = document.querySelector('.dis-player1').className;
    expect(resultOne).toMatch(/player-turn/);
    resetScenario();
    // p2
    gameBoard.updateStyle(player1, player1);
    const resultTwo = document.querySelector('.dis-player2').className;
    expect(resultTwo).toMatch(/player-turn/);
});


