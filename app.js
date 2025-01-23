let boxex = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-game");
let newbtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // playerO, playerX

// Using arrays for winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to reset the game board
const resetGame = () => {
    turnO = true;
    enabledbtn();
    msgContainer.classList.add("hide");
};

// Event listener for each box
boxex.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Button is clicked!");
        if (turnO) {
            box.innerText = "O";
            turnO = false; // Means turn is passed to player 2 "X"
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

// Function to disable all boxes
const disabledbtn = () => {
    for (let box of boxex) {
        box.disabled = true;
    }
};

// Function to enable all boxes and reset text
const enabledbtn = () => {
    for (let box of boxex) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Function to display the winner message
const showWinner = (Winner) => {
    msg.innerText = `Congratulations! Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disabledbtn();
};

// Function to check for a winner
const checkWinner = () => {
    for (let patterns of winPatterns) {
        let pos1 = boxex[patterns[0]].innerText;
        let pos2 = boxex[patterns[1]].innerText;
        let pos3 = boxex[patterns[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    // Check for a draw
    if ([...boxex].every(box => box.innerText !== "")) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disabledbtn();
    }
};

// Attach event listeners to buttons
newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
