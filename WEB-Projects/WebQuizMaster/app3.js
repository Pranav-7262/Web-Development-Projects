const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Colorful Style Sheets", correct: false },
        ],
    },
    {
        question: "Which property is used to change the background color of an element?",
        answers: [
            { text: "bgcolor", correct: false },
            { text: "background-color", correct: true },
            { text: "color", correct: false },
            { text: "background", correct: false },
        ],
    },
    {
        question: "Which property is used to set the text color in CSS?",
        answers: [
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "font-color", correct: false },
            { text: "textstyle", correct: false },
        ],
    },
    {
        question: "How can you center a block element horizontally in CSS?",
        answers: [
            { text: "margin: 0 auto;", correct: true },
            { text: "padding: 0 auto;", correct: false },
            { text: "text-align: center;", correct: false },
            { text: "center-align: middle;", correct: false },
        ],
    },
    {
        question: "Which property is used to change the font size in CSS?",
        answers: [
            { text: "text-size", correct: false },
            { text: "font-size", correct: true },
            { text: "font-style", correct: false },
            { text: "size", correct: false },
        ],
    },
    {
        question: "What is the default value of the `position` property in CSS?",
        answers: [
            { text: "fixed", correct: false },
            { text: "absolute", correct: false },
            { text: "relative", correct: false },
            { text: "static", correct: true },
        ],
    },
    {
        question: "Which of the following values is used to display a border around an element in CSS?",
        answers: [
            { text: "border-style", correct: false },
            { text: "border-color", correct: false },
            { text: "border-width", correct: false },
            { text: "border", correct: true },
        ],
    },
    {
        question: "Which property controls the space between the content and the border of an element?",
        answers: [
            { text: "padding", correct: true },
            { text: "margin", correct: false },
            { text: "border", correct: false },
            { text: "spacing", correct: false },
        ],
    },
    {
        question: "Which CSS property is used to create a gap between elements?",
        answers: [
            { text: "margin", correct: true },
            { text: "gap", correct: false },
            { text: "spacing", correct: false },
            { text: "padding", correct: false },
        ],
    },
    {
        question: "Which property is used to change the font of an element?",
        answers: [
            { text: "font-family", correct: true },
            { text: "font-size", correct: false },
            { text: "text-align", correct: false },
            { text: "text-font", correct: false },
        ],
    },

];
const questionElement = document.getElementById("question");  
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const timerElement = document.getElementById("timer");
const solveElement = document.getElementById('solve');
let solvedCount = 0; 
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval; 

function startQuiz() {
    solvedCount = 0; // Reset solved questions counter
    updateSolvedCount(); // Update display
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function startTimer() {
    clearInterval(timerInterval); 
    timeLeft = 15;
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleNextButton();
        }
    }, 1000);
}

function updateSolvedCount() {
    solveElement.innerHTML = `Solved <b>${solvedCount}</b> out of 10`; 
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        if (questionNumber == 10) {
            nextButton.innerHTML = "SUBMIT";
        }
    });

    startTimer();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    clearInterval(timerInterval); 
}

function selectAnswer(e) {
    clearInterval(timerInterval);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    solvedCount++; 
    updateSolvedCount();
    nextButton.style.display = "block";
}

function greeting() {
    if (score >= 8) {
        alert("Excellent Job!!");
    } else if (score >= 5) {
        alert("Good, Keep Trying!!");
    } else {
        alert("Need to Improve!!");
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}

function showScore() {
    greeting();
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    timerElement.innerHTML = "";
    solveElement.innerHTML = "";

}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();
