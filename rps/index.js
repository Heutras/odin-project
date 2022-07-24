const playerButtons = document.getElementsByClassName("player");
for (let i = 0; i < playerButtons.length; i++) {
    playerButtons[i].addEventListener("click", playerSelect);
}

function playerSelect(e) {
    playerSelection = e.target.textContent;
    submitButton.removeAttribute("disabled")
    for (let i = 0; i < playerButtons.length; i++) {
        let string = playerButtons[i].textContent;
        playerButtons[i].classList.remove("selected")
        if (string = playerSelection) {
            e.target.classList.add("selected");
        }
    }
    for (let i = 0; i < computer.length; i++) {
        computer[i].classList.remove("selected");
    }
}

const submitButton = document.querySelector("#submit")
submitButton.addEventListener("click", submitSelection);

function submitSelection(e) {
    computerPlay();
    playRound(playerSelection, computerSelection)
    endGame()
}

let computerSelection;
const computer = document.getElementsByClassName("computer")
function computerPlay() {
    computerSelection = Math.floor(Math.random() * 3 + 1);
    switch (computerSelection) {
        case 1:
            computerSelection = "Rock";
            break;
        case 2:
            computerSelection = "Paper";
            break;
        case 3:
            computerSelection = "Scissors";
            break;
    }

    for (let i = 0; i < computer.length; i++) {
        let string = computer[i].textContent;

        if (string == computerSelection) {
            computer[i].classList.add("selected");


        }
        else {
            computer[i].classList.remove("selected")
        }
    }
    return computerSelection;
}

const pResult = document.createElement("p");
const pScore = document.createElement("p");
const result = document.querySelector("#result")
let playerSelection;
let playerScore = 0;
let computerScore = 0;
function playRound(playerSelection, computerSelection) {

    switch (true) {
        case playerSelection == "Rock" && computerSelection == "Paper":
        case playerSelection == "Paper" && computerSelection == "Scissors":
        case playerSelection == "Scissors" && computerSelection == "Rock":
            pResult.innerText = `YOU LOSE! ${computerSelection} beats ${playerSelection}`
            result.insertBefore(pResult, null)
            computerScore++;
            pScore.innerText = `${playerScore} - ${computerScore}`
            result.insertBefore(pScore, null)
            break;
        case playerSelection == "Paper" && computerSelection == "Rock":
        case playerSelection == "Scissors" && computerSelection == "Paper":
        case playerSelection == "Rock" && computerSelection == "Scissors":
            pResult.innerText = `YOU WIN! ${playerSelection} beats ${computerSelection}`
            result.insertBefore(pResult, null)
            playerScore++;
            pScore.innerText = `${playerScore} - ${computerScore}`
            result.insertBefore(pScore, null)
            break;
        default:
            pResult.innerText = "TIE GAME!"
            pScore.innerText = `${playerScore} - ${computerScore}`
            result.insertBefore(pResult, null)
            result.insertBefore(pScore, null)
    }
}

const playAgainButton = document.querySelector("#play-again")
playAgainButton.addEventListener("click", playAgain);
function endGame() {
    if (playerScore == 5) {
        playAgainButton.removeAttribute("disabled");
        submitButton.disabled = true;
        alert("YOU WIN THE GAME!");
    }
    else if (computerScore == 5) {
        playAgainButton.removeAttribute("disabled");
        submitButton.disabled = true;
        alert("DANG! THE COMPUTER WON THE GAME!");
    }
    else return;
};

function playAgain() {
    playerScore = 0;
    computerScore = 0;
    pResult.innerText = ""
    pScore.innerText = ""
    playAgainButton.disabled = true;
    for (let i = 0; i < computer.length; i++) {
        computer[i].classList.remove("selected");
    }
    for (let i = 0; i < playerButtons.length; i++) {
        playerButtons[i].classList.remove("selected");

    }
}