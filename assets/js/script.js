var questionBank = [
    {
        question: "What does HTML stand for?",
        answer: [
            { text: "Hippo Technology Magic Link", correct: false },
            { text: "Hyper Motor Life", correct: false },
            { text:"Hyperlink Markup Language", correct: true } , 
            { text: "Hello Tyler Miller Laura", correct: false },
        ]
    },

    {
        question: "What is Github?",
        answer: [
            { text: "A cult", correct: false },
            { text: "A fan club", correct: false}, 
            { text: "A hosting platform", correct: true },
            { text: "A social media", correct: false },
        ]
        
    },

    {
        question: "What is the git command to create and clone a remote repository?",
        answer: [
            { text: "git pull",  correct: false },
            { text: "git push",  correct: false },
            { text: "cd",  correct: false },
            { text: "git clone", correct: true },
        ]      
    },
    {
        question: "What do you use to modify your site screen?",
        answer: [
            { text: "Media Queries", correct: true }, 
            { text: "Font-size",  correct: false },
            { text: "Background",  correct: false },
            { text: "Padding", correct: false },
        ]
    },
 
    {
        question: "Which answer belows is a programming language?",
        answer: [
            { text: "SP500",  correct: false },
            { text: "Javascript", correct: true }, 
            { text: "FBI",  correct: false },
            { text: "PS5", correct: false },
        ]
    },
]

// click start btn
var startBtn = document.getElementById("start-btn")
var quizEL = document.getElementById("quiz")
let shuffleQuestions, currentQ;
var score = 0;

startBtn.addEventListener("click", function() {
    startBtn.style.display = "none"
    quiz.style.display = "block"
    shuffleQuestions = questionBank.sort(() => Math.random() - .5);
    currentQ = 0;
    countdown();
    setQuestion();
});

//function Start quiz
var answers = document.getElementById("answers");
var questionNo = document.getElementById("questionNo");

function resetAnswer() {
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
};
function setQuestion() {
    resetAnswer();
    showQuestion(shuffleQuestions[currentQ]);
}
function showQuestion(question) {
    questionNo.innerText = question.question;
    for ( var i = 0; i < question.answer.length; i++) {
        let answerBtn = document.createElement("button");
        answerBtn.innerText = question.answer[i].text;
        answerBtn.classList.add('btn');
        console.log (question.answer[i].correct);
        answerBtn.addEventListener('click', function(question) {
            let useranswer = question.answer[i].correct;
            if (useranswer) {
                rightAnswer();
                score++;
            } else {
                wrongAnswer();
                deductTime(10);
            }
            if (shuffleQuestions.length > currentQ + 1) {
                currentQ++;
                setQuestion();
            } else {
                endGame();
            }
            // timer function? //
        });
        answers.appendChild(answerBtn);
    }
}
// function right or wrong

var scores = document.getElementById("scores");
var footer = document.getElementById("quiz-footer");

function rightAnswer() {
    footer.textContent = 'Correct!';
    footer.setAttribute('style', 'color: #dee2ff')
}

function wrongAnswer() {
    footer.textContent = 'Wrong!';
    footer.setAttribute('style', 'color: #a44a3f')
}


// Timer 
var time = document.getElementById("time");
let timer = 60;
let interval;

function displayTime () {
    time.innerText = timer;
}
function countdown() {
    interval = setInterval(function() {
        timer--;
        displayTime();
        checkTime();
    }, 1000);
    
}
function checkTime() {
    if (timer <= 0) {
        timer = 0;
        endGame();
    }
}
function deductTime(seconds) {
    timer -= seconds;
    checkTime();
    displayTime();
}

// function end quiz
var submitBtn = document.getElementById("submit");
var scores = document.getElementById("scores");
var backBtn = document.getElementById("backbtn");
var ranking = document.getElementById("high-score");

function endGame() {
    clearInterval(interval);
    result.style.display = "block";
    quiz.style.display = "none";
    submitBtn.addEventListener("click", saveHighScore)   
}

// function save score
function saveScore() {
    
}

// function input initials
var initials = document.getElementById("initials");

function inputInitial() {
    if (isInputValid(initials)) {
    let scores = correct;
    var highScore = getNewHighScore(initials, scores);
    saveHighScore(highScore);
    }
}
function isInputValid(initials) {
    if (initials === "") {
        alert("Please enter your initial");
        return false;
    } else {
        return true;
    }
}
function getNewHighScore(initials, score) {
    let entry = {
        initials: initials,
        scores: scores,
    }
    return entry;
}

