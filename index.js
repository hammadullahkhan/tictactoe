const cells = Array.from(document.querySelectorAll('.cell'));
const message = document.querySelector('.message');
const playAgainBtn = document.querySelector('.action button');
const playerX = 'X';
const playerO = 'O';
const winComb = [
    // Horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // Vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // Diagonal
    [0,4,8],
    [2,4,6]
];
let board;
let activeGame;
let currentUser;

const getCurrentUser = () => {
    return currentUser;
};
const setCurrentUser = (user) => {
    currentUser = user;
};

const setGameStatus = (boolStatus) => {
    activeGame = boolStatus;
};
const isGameActive = () => {
    return activeGame;
};

const checkTieGame = () => {
    if (!board.includes('')) {
        setMessage('tie','tie game');
    }
};

const checkWin = (user) => {
    let flag = false;
    for(let i=0; i < winComb.length; i++) {
        const comb = winComb[i];
        const a = board[comb[0]];
        const b = board[comb[1]];
        const c = board[comb[2]];
        if (( a + b + c !== '') && a === b && b === c) {
            setGameStatus(false);
            setMessage('won', `player ${user} won the game`);
            flag = true;
            break;
        }
    }
    return flag;
};

const setMessage = (clsName, msg) => {
    message.innerHTML = msg;
    if (clsName !== '') message.classList.add(clsName);
    else message.classList.remove('won', 'tie');
}

const setCell = (cell) => {
    cell.innerHTML = getCurrentUser();
};

const togglePlayer = () => {
    const user = getCurrentUser() === playerX ? playerO : playerX;
    setCurrentUser(user);
};

const handleClick = (cell, index) => {
    if (board[index] === '' && isGameActive()) {
        board[index] = getCurrentUser();
        setCell(cell);
        setCellNotAllowed(cell);
        if ( !checkWin(getCurrentUser()) ) {
            checkTieGame();
            togglePlayer();
        }            
    }
};

const setCellNotAllowed = (cell) => {
    cell.classList.add('not-allowed');
};

const handleHover = (cell, index) => {
    if (board[index] !== '') {
        setCellNotAllowed(cell);        
    }
};

const clearCells = () => {
    cells.forEach((cell, index) => {
        cell.innerHTML = '';
    }); 
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index))
    cell.addEventListener('mouseover', () => handleHover(cell, index))
});

playAgainBtn.addEventListener('click', () => startGame());

const startGame = () => {
    board = Array(9).fill('');
    setGameStatus(true);
    setCurrentUser(playerX);
    clearCells();
    setMessage('', '');
};

startGame();