const capitalsQuiz = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "What is the capital of Italy?", options: ["Rome", "Madrid", "Athens", "Paris"], answer: "Rome" },
    { question: "What is the capital of Spain?", options: ["Paris", "Madrid", "Athens", "Berlin"], answer: "Madrid" },
    { question: "What is the capital of Greece?", options: ["Rome", "Athens", "Berlin", "London"], answer: "Athens" },
    { question: "What is the capital of Germany?", options: ["Berlin", "Paris", "London", "Madrid"], answer: "Berlin" }
];

const quizContainer = document.getElementById("quiz-container");
const quiz = document.getElementById("quiz");
const questionText = document.getElementById("question");
const choices = document.getElementById("choices");
const timer = document.getElementById("timer");
const timeRemaining = document.getElementById("time-remaining");
const gameOver = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const initials = document.getElementById("initials");
const submitScore = document.getElementById("submit-score");
const highScores = document.getElementById("high-scores");
const highScoreList = document.getElementById("high-score-list");
const goBack = document.getElementById("go-back");
const clearScores = document.getElementById("clear-scores");
const startQuizButton = document.getElementById("start-quiz");
const viewScoresButton = document.getElementById("view-scores");
const homeButton = document.getElementById("home");

let currentQuestion = 0;
let score = 0;
let time = 60;
let timerInterval;

function startCapitalQuiz() {
    quiz.style.display = "block";
    startTimer();
    showQuestion();
    startQuizButton.style.display = "none"; 
    viewScoresButton.style.display = "none"; 
}

function showQuestion() {
    if (currentQuestion < capitalsQuiz.length) {
        const currentQuestionData = capitalsQuiz[currentQuestion];
        questionText.textContent = currentQuestionData.question;
        choices.innerHTML = "";

        for (const option of currentQuestionData.options) {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", handleAnswer);
            choices.appendChild(button);
        }
    } else {
        endCapitalQuiz();
    }
}

function handleAnswer(event) {
    const userChoice = event.target.textContent;
    const correctAnswer = capitalsQuiz[currentQuestion].answer;

    if (userChoice === correctAnswer) {
        score += 10;
    } else {
        time -= 10;
    }

    currentQuestion++;
    showQuestion();
}

function startTimer() {
    timeRemaining.textContent = time;
    timerInterval = setInterval(() => {
        time--;
        timeRemaining.textContent = time;
        if (time <= 0 || currentQuestion >= capitalsQuiz.length) {
            clearInterval(timerInterval);
            endCapitalQuiz();
        }
    }, 1000);
}

function endCapitalQuiz() {
    quiz.style.display = "none";
    gameOver.style.display = "block";
    finalScore.textContent = score;
}

submitScore.addEventListener("click", () => {
    const userInitials = initials.value;
    if (userInitials) {
        const highScore = { initials: userInitials, score };
        saveHighScore(highScore);
        displayHighScores();
    }
});

function saveHighScore(highScore) {
    const highScoresData = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresData.push(highScore);
    highScoresData.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScoresData));
}

function displayHighScores() {
    const highScoresData = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoreList.innerHTML = "";

    highScoresData.forEach((highScore, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${highScore.initials} - ${highScore.score}`;
        highScoreList.appendChild(li);
    });

    highScores.style.display = "block";
    quizContainer.style.display = "none";
}

goBack.addEventListener("click", () => {
    highScores.style.display = "none";
    quizContainer.style.display = "block";
    restartCapitalQuiz();
});

clearScores.addEventListener("click", () => {
    clearHighScores();
    highScoreList.innerHTML = "";
});

homeButton.addEventListener("click", () => {
    highScores.style.display = "none";
    startQuizButton.style.display = "block"; 
    viewScoresButton.style.display = "block"; 
});

function restartCapitalQuiz() {
    currentQuestion = 0;
    score = 0;
    time = 60;
    clearInterval(timerInterval);
    
    quiz.style.display = "none";
    gameOver.style.display = "none";
    startQuizButton.style.display = "block";
    viewScoresButton.style.display = "block";
    quizContainer.style.display = "block";
}

startQuizButton.addEventListener("click", startCapitalQuiz);

viewScoresButton.addEventListener("click", () => {
    displayHighScores();
    startQuizButton.style.display = "none"; 
    viewScoresButton.style.display = "none"; 
});
