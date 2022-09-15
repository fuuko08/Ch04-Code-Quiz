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
        answerBtn.addEventListener('click', function() {
            var currentQuestion = questionBank.find(el => el.question == questionNo.innerText);
            var currrentAnswer = currentQuestion.answer.find(el => el.text == this.innerText);
            let useranswer = currrentAnswer.correct;
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
            } return score;
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
    footer.setAttribute('style', 'color: #a44a3f, font-size: 22px, font-weight: bold');
}

function wrongAnswer() {
    footer.textContent = 'Wrong!';
    footer.setAttribute('style', 'color: #a44a3f, font-size: 22px, font-weight: bold');
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
var ranking = document.getElementById("high-score");

function endGame() {
    clearInterval(interval);
    result.style.display = "block";
    quiz.style.display = "none";
    submitBtn.addEventListener("click", saveScore)   
    scores.textContent = score;
}

// function save score
var initials = document.getElementById("initials");

function saveScore(event) {
    event.preventDefault();
    let init = initials.value;
    localStorage.setItem("init", init); 
    console.log(init);
    if (init.length <= 1) {
        alert("Enter your initials!");
        return;
    }
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    var newScore = {
        name: init,
        score: scores,
    } 
    highScores.push(newScore);
    highScores.sort( (a,b) => b.newScore - a.newScore);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.href = './ranking.html';   
}; console.log(highScores); 

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function showHighScore() {
    highScores.sort(function(a,b) {
        return b.score - a.score;
    })
    highScores.forEach(function(highScores) {
        let liEL = document.createElement('li');
        liEL.textContent = highScores.init + " - " + highScores.scores;
        let showScores = document.getElementById("highscores-list");
        console.log(showScores);
        showScores.appendChild(liEL);
    })
};