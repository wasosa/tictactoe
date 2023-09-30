var gameOver = false;
var theMoves = [];
var PLAYERS = {
    0: { image: "Blank.png", name: "" },
    1: { image: "X.png", name: "X" },
    2: { image: "O.png", name: "O" },
};
var MAXMOVES = 3;

function reset()
{
    theMoves = [];
    gameOver = false;

    let board = document.getElementById("board");
    for (row of board.rows) {
        for (cell of row.cells) {
            cell.onclick = function () {
                clickCell(this);
            }
            clearCell(cell);
        }
    }
    updateStatus();
}

function setImage(cell) {
    image = PLAYERS[cell.player].image;
    cell.innerHTML = `<img src='${image}' height=100 width=100>`;
}

function clearCell(cell) {
    cell.player = 0;
    setImage(cell);
}

function updateStatus() {
    let counter = document.getElementById("move-counter");
    counter.innerHTML = `Total moves: ${theMoves.length}`;
    let next = document.getElementById("next-player");
    next.innerHTML = `Next: ${PLAYERS[getNextPlayer()].name}`;

    let status = document.getElementById("status");
    winner = checkForWinner();
    if (winner == 0) {
        status.innerHTML = `GAME IN PROGRESS`;
        return;
    } else {
        status.innerHTML = `${PLAYERS[winner].name} WINS!!`;
        gameOver = true;
    }
}

function checkForWinner()
{
    let board = document.getElementById("board");
    WINS = [
        [ { i: 0, j: 0}, { i: 0, j: 1 }, { i: 0, j: 2 }, ],
        [ { i: 1, j: 0}, { i: 1, j: 1 }, { i: 1, j: 2 }, ],
        [ { i: 2, j: 0}, { i: 2, j: 1 }, { i: 2, j: 2 }, ],
        [ { i: 0, j: 0}, { i: 1, j: 0 }, { i: 2, j: 0 }, ],
        [ { i: 0, j: 1}, { i: 1, j: 1 }, { i: 2, j: 1 }, ],
        [ { i: 0, j: 2}, { i: 1, j: 2 }, { i: 2, j: 2 }, ],
        [ { i: 0, j: 0}, { i: 1, j: 1 }, { i: 2, j: 2 }, ],
        [ { i: 2, j: 0}, { i: 1, j: 1 }, { i: 0, j: 2 }, ],
    ];
    for (win of WINS) {
        result = 1 | 2;
        for (cell of win) {
            result = result & board.rows[cell.i].cells[cell.j].player;
        }
        if (result == 1 || result == 2) {
            return result;
        }
    }
    return 0;
}

function getNextPlayer()
{
    if ((theMoves.length + 1) % 2 == 0) {
        return 2;
    } else {
        return 1;
    }
}

function forgetOldestMove()
{
    if (theMoves.length < MAXMOVES * 2) {
        return
    }
    oldest = theMoves.length - MAXMOVES * 2 - 1;
    clearCell(theMoves[oldest]);
}

function clickCell(cell)
{
    if (gameOver || cell.player != 0) {
        return;
    }
    cell.player = getNextPlayer();
    setImage(cell);
    theMoves.push(cell);
    forgetOldestMove();
    updateStatus();
}

// ---------- start of testing code ----------

function assert_equal(actual, expected)
{
    if (actual !== expected) {
        throw new Error(`\n\nExpected: ${expected}\n  Actual: ${actual}\n`)
    }
}

function test()
{
    // We are not running inside a browser!
    console.log("Not in the browser");
    console.log("Running tests!");

    console.log("All tests passed!");
}

// ---------- end of testing code ----------

if (typeof document === 'undefined') {
    test();
} else {
    reset();
}
