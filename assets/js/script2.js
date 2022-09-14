// var dom //
var startBtn = document.getElementById("start-btn");

var quiz = document.getElementById("quiz");
var time = document.getElementById("time");

var questionNo = document.getElementById("questionNo");

var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");
var choices = document.querySelectorAll(".choices");

var result = document.getElementById("result");
var score = document.getElementById("scores");
var submitBtn = document.getElementById("submit");
var initials = document.getElementById("initials");
var backBtn = document.getElementById("backbtn"); 

let index = 0;
let timer = 60;
let interval;

let correct = 0;
let userAns = undefined;

var questionBank = [
    {
        question: "What does HTML stand for?",
        choices: ["Hippo Technology Magic Link", "Hyper Motor Life", "Hyperlink Markup Language", "Hello Tyler Miller Laura"],   
        answer: "Hyperlink Markup Language"
    },

    {
        question: "What is Github?",
        choices: ["A cult", "A fan club", "A hosting platform", "A social media"],
        answer: "A hosting platform"
    },

    {
        question: "What is the git command to create and clone a remote repository?",
        choices: ["git pull", "git push", "cd", "git clone"],
        answer: "git clone",
    },

    {
        question: "What do you use to modify your site screen?",
        choices: ["Media Queries", "Font-size", "Background", "Padding"],
        answer: "Media Queries",
    },

    {
        question: "Which answer belows is a programming language?",
        choices: ["SP500", "Javascript", "FBI", "PS5"],
        answer: "Javascript",
    },
]

// Click the button
startBtn.addEventListener("click", function() {
    startBtn.style.display = "none";
    quiz.style.display = "block";
    countdown();
    showQuestion();
    });


submitBtn.addEventListener("click", function() {
if (localStorage.getItem("highscore") === null) {
    localStorage.setItem("highscore", JSON.stringify ({
        highScore: 0,
        highScoreArr: []
    }));
    }
var score = correct;
highScore = JSON.parse(localStorage.getItem("highscore")).highScoreArr;
var allScores = JSON.parse(localStorage.getItem("highscore")).highScoreArr;
if (score > highScore) {
    highScore = score;
} allScores.push(initials + score);
localStorage.setItem("highscore", JSON.stringify({
    highScore,
    highScoreArr: allScores
}));

});


backBtn.addEventListener("click", function() {
    startBtn.style.display = "block";
    result.style.display = "none";
})

// Timer 
function displayTime () {
    time.innerText = timer;
}
function countdown() {
    interval = setInterval(function() {
        timer--;
        displayTime();
        checkTime();
    }, 1000);
    // console.log(countdown);
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
    
// Show questions and answers
let currentQuestion = 0;
let count = 0;
function showQuestion() {
    document.getElementById("questionNo").innerHTML = questionBank[currentQuestion].question;
    
    // bug 1: class not id
    // document.getElementById("choicesBtn").innerHTML = "";
    document.getElementsByClassName("choicesBtn").innerHTML = "";
    questionBank[currentQuestion].choices.map((choice, i) => {
        var btn = document.createElement("button");
        var textNode = document.createTextNode(choice);
        btn.appendChild(textNode);
        document.getElementById("choicesBtn").appendChild(btn);
        btn.setAttribute("data", choice);
        btn.setAttribute("id", `btn${i}`);
        btn.setAttribute("answer", questionBank[currentQuestion].answer);

        document.querySelector(`#btn${i}`).addEventListener("click", function (e) {
            console.log(e.target.getAttribute("data"));
            if (e.target.getAttribute("data") === e.target.getAttribute("answer")) {
                rightAnswer();
        } else {
            wrongAnswer();
        }
    })
    })
}; 
function rightAnswer () {
    alert("Correct!");
                correct++;
                count++;
                if (count == questionBank.length) {
                    endGame ();
                } else {
                    showQuestion();
                } console.log (showQuestion);
            return correct;
};
function wrongAnswer () {
    alert("Wrong!");
    correct += 0;
    count++;
    deductTime(10);
    if (count == questionBank.length) {
        endGame();
    } else {
        showQuestion();
    } return correct;
};

// Enter initials
function inputInitial() {
    if (isInputValid(initials)) {
        const score = correct;
        const highScore = getNewHighScore(initials, score);
        saveHighScore(highScore);
    }
}

function getNewHighScore(initials, score) {
    const entry = {
        initials: initials,
        score: score,
    }
    return entry; 
}

function isInputValid(initials) {
    if (initials === "") {
        alert("Please enter your initial");
        return false;
    } else {
        return true;
    }
}

// Save high scores
function saveHighScore(highScore) {
    const currentScores = getScore();
    placeEntryInHighScoreList(highScore, currentScores);
    localStorage.setItem('scoreList', JSON.stringify(currentScores));
}
function getScore(){
    const currentScores = localStorage.getItem('scoreList');
    if (currentScores) {
        return JSON.parse(currentScores);
    } else {
        return [];
    }
}
function placeEntryInHighScoreList(newEntry, scoreList) {
    const newScore = getNewScore(newEntry, scoreList);
    scoreList.splice(newScore, 0, newEntry);
}
function getNewScore (newEntry, scoreList) {
    if (score.length > 0) {
        for (let i = 0; i < scoreList.length; i++) {
            if (scoreList[i].score <= newEntry.score) {
                return i;
            }
        }
    }
    return scoreList.length;
}

// end game //
function endGame() {
    clearInterval(interval);
    result.style.display = "block";
    quiz.style.display = "none";
    displayScore();
    
}
function displayScore () {
    score.textContent = "You got" + `${correct}` + "answers";
}


