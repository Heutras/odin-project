let X_CLASS = 'x'
let CIRCLE_CLASS = 'circle'
let currentClass = X_CLASS
let circleTurn;
let removedValue; 
let speed = 1000;

const winningMessageTextElement = document.querySelector('[data-winner-text]')
const winningMessageElement = document.getElementById('winnerMessage')
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('gameBoard')
const turner = document.getElementById('turn-name')

const restartButton = document.getElementById('restartButton')
const slowButton = document.querySelector('#slowButton')
const mediumButton = document.querySelector('#mediumButton')
const fastButton = document.querySelector('#fastButton')

const CELL_1 = document.getElementById('1')
const CELL_2 = document.getElementById('2')
const CELL_3 = document.getElementById('3')
const CELL_4 = document.getElementById('4')
const CELL_5 = document.getElementById('5')
const CELL_6 = document.getElementById('6')
const CELL_7 = document.getElementById('7')
const CELL_8 = document.getElementById('8')
const CELL_9 = document.getElementById('9')

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
    [2, 5, 8]
]

let ALL_SPOTS = [
    0, 1, 2, 
    3, 4, 5, 
    6, 7, 8 
]

function removeAvailableSpot() {

    let result = Math.floor(Math.random() * ALL_SPOTS.length); 
    removedValue = ALL_SPOTS[result]
    ALL_SPOTS.splice(result, 1)
    return removedValue
}

function returnNumber() {
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    removeAvailableSpot();
     let newSpot = removedValue
     if (checkWin(currentClass) == true) {
         return;
  } else if (newSpot == 0) {
        cell = CELL_1
        placeMark(cell, currentClass)
    } else if (newSpot == 1) {
        cell = CELL_2
        placeMark(cell, currentClass)
    } else if (newSpot == 2) {
        cell = CELL_3
        placeMark(cell, currentClass)
    } else if (newSpot == 3) {
        cell = CELL_4
        placeMark(cell, currentClass)
    } else if (newSpot == 4) {
        cell = CELL_5
        placeMark(cell, currentClass)
    } else if (newSpot == 5) {
        cell = CELL_6
        placeMark(cell, currentClass)
    } else if (newSpot == 6) {
        cell = CELL_7
        placeMark(cell, currentClass)
    } else if (newSpot == 7) {
        cell = CELL_8
        placeMark(cell, currentClass)
    } else if (newSpot == 8) {
        cell = CELL_9
        placeMark(cell, currentClass)
    }
}

function playAutomatedGame() {
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    returnNumber();

    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
    if (circleTurn == true) {
        turner.innerText = "O's turn!"
    } else {
        turner.innerText = "X's turn!"
    }
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

slowButton.addEventListener('click', function(){
    
    document.getElementById("slowButton").disabled = true;
    document.getElementById("mediumButton").disabled = true;
    document.getElementById("fastButton").disabled = true;
    speed = 2000
    for (let i=0; i<9; i++) {
        task(i);   
     }
     
})
mediumButton.addEventListener('click', function(){
    document.getElementById("slowButton").disabled = true;
    document.getElementById("mediumButton").disabled = true;
    document.getElementById("fastButton").disabled = true;
    speed = 1000
    for (let i=0; i<9; i++) {
        task(i);   
     }
})

fastButton.addEventListener('click', function(){
    
    document.getElementById("slowButton").disabled = true;
    document.getElementById("mediumButton").disabled = true;
    
    document.getElementById("fastButton").disabled = true;
    speed = 250
    for (let i=0; i<9; i++) {
        task(i);   
     }
     
})
  restartButton.addEventListener('click', function(){
    
    document.getElementById("slowButton").disabled = false;
    document.getElementById("mediumButton").disabled = false;
    document.getElementById("fastButton").disabled = false;
    ALL_SPOTS = [
        0, 1, 2, 
        3, 4, 5,
        6, 7, 8 
    ]
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
    })
    
    winningMessageElement.classList.remove('show')
    turner.innerText = ''
    
})

function task(i) {
    setTimeout(function() {
     playAutomatedGame()
    }, speed * i);
  }