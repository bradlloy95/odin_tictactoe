//set up arrays

let gameBoard = [];
let gameBoardCells = [];

// winning combinations to check 
const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
//create objects for players

function Player(name, sign) {
    this.sign = sign;
    this.name = name;
}

const player1 = new Player('Player one', 'X');
const player2 = new Player('Player two', '0');
let turn = player1;

//create objects for each cell

function Cell(element, index, sign) {
    this.sign = sign;
    this.element = element;
    this.index = index;     
    this.updateSign = function(sign) {
        this.sign = sign;
    }
}

const cells = document.querySelectorAll('.cell')

let index = 0;
cells.forEach(function(cell){
    const newCell = new Cell(cell, index, null);
    index = index + 1;
    gameBoard.push(newCell.sign);      
    gameBoardCells.push(newCell); 
    
})

//create functions to chage message
const messageBox = document.getElementById('message-ctr');

function message(message){
    messageBox.textContent = message;
}
message(`${turn.name}'s Turn`)

//create a function to updste baord
function render(){
    gameBoardCells.forEach(function(cell){
        cell.element.textContent = cell.sign;
        cell.element.style.color = 'black';

    })
}

//function to delay for showing winnin g row
function delay(ms) {
    return new Promise(resolve =>
    setTimeout(resolve, ms));
}

//function that checks winning combos 
function checkWin() {
    for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        if (gameBoard[combo[0]] === gameBoard[combo[1]] && 
            gameBoard[combo[0]] === gameBoard[combo[2]] &&
            gameBoard[combo[0]] != null) {
            console.log('win');
            return [gameBoard[combo[0]], combo];
        }
    }
    return false;
}

// function to swap player when mouse is clicked
function swapTurn() {
    if (turn === player1) {
        turn = player2;
    } else {
        turn = player1;
    }
}


// funnction for event listeners fo click anf hover
gameBoardCells.forEach(function(cell){
    cell.element.addEventListener('click', async function() {
        //if not been clicked
        if (cell.sign === null) {
            //update cells sign
            cell.updateSign(turn.sign);    
            //cell.sign = turn.sign;
            //update array for gameboard
            gameBoard[cell.index] = turn.sign;
            render();
            //check win
            let ifWin = checkWin();
            if (ifWin != false) {
                winningCombo = ifWin[1];
                 for (let i = 0; i < winningCombo.length; i++){
                    gameBoardCells[winningCombo[i]].element.style.color = 'red';
                    //0.3 secs
                    await delay(300);
                }
                message(`${turn.name} wins!!`);
                return;
            }
            swapTurn();
            message(`${turn.name}'s Turn`);
        }
        
    })
    cell.element.addEventListener('mouseenter', function(){
        if (cell.sign === null) {
        cell.element.textContent = turn.sign
        cell.element.style.color = 'rgba(0, 0, 0, 0.394)'
        cell.element.style.cursor = 'pointer';
        }
    })
    cell.element.addEventListener('mouseleave', function(){
        if (cell.sign === null){
            cell.element.textContent = null
        cell.element.style.color = 'black'
        }
    })
})

//function to reset
function clearBoard() {
    gameBoardCells.forEach(function(cell){
        cell.updateSign(null);
        cell.element.style.color = 'black';
        gameBoard.push(cell.sign);
        message(`${turn.name}'s Turn`)

        
    })
}
// clear button
const clear = document.getElementById('clear-btn');

clear.addEventListener('click', function(){
    gameBoard =[];
    clearBoard();    
    render();
    turn = player1;
})




