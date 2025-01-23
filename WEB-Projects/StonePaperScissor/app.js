let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorepara = document.querySelector("#userscore");
const computerpara = document.querySelector("#compscore");
const resetgame = document.querySelector("#reset");
const startgame = document.querySelector("#start");

const resetGame = () => {
  userScore=0;
  compScore=0;
  userScorepara.innerText =userScore ;
  computerpara.innerText = compScore;
  msg.innerText = "Play Your Move";
  msg.style.backgroundColor = "#081b31";

};
const startGame = () => {
    userScore=0;
    compScore=0;
    userScorepara.innerText =userScore ;
    computerpara.innerText = compScore;
    msg.innerText = "Play Your Move";
    msg.style.backgroundColor = "#081b31";


};

resetgame.addEventListener("click", resetGame);
startgame.addEventListener("click",startGame);

const getcompchoice = () => {
    const option = ["Rock","Paper","Scissor"];
    const randidx = Math.floor(Math.random()*3);
    return option[randidx];

};
const gamedraw = () => {
    // console.log("The game is Draw");
    msg.innerText = "The Game Was Draw!!";
    msg.style.backgroundColor = "#081b31";
};
const showWinner = (userWin,userchoice,compChoice) => {//call the userwin 
    if(userWin){
        userScore++;
        userScorepara.innerText = userScore;
        // console.log("You Won!");
        msg.innerText = `You Won! ${userchoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        computerpara.innerText = compScore;
        // console.log("You lose");
        msg.innerText =`You lose! ${compChoice} beats Your ${userchoice}`;
        msg.style.backgroundColor = "red";
    }
};

const playgame = (userchoice) => {
//   console.log("user choice is:",userchoice);
  //generate computer choice
  const compChoice = getcompchoice();
//   console.log("comp choice is:",compChoice);

  if(userchoice == compChoice){
    gamedraw();//call for draw the game
    }
    else{
        let userWin = true;
        if(userchoice=="Rock"){
            userWin = compChoice == "Paper" ? false:true;
        }
        else if(userchoice=="Paper"){
            userWin = compChoice == "Rock" ? true:false;
        }
        else {
         userWin  = compChoice == "Rock" ? false:true;
    }
    showWinner(userWin,userchoice,compChoice);
}
};
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice= choice.getAttribute("id");
        // console.log("choice is clicked!!",userchoice);
        playgame(userchoice);
    });
});