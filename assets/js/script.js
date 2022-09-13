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

var nextBtn = document.getElementById("next-btn");

var result = document.getElementById("result");
var score = document.getElementById("scores");
var submitBtn = document.getElementById("submit");
var initials = document.getElementById("initials");
var backBtn = document.getElementById("backbtn"); 

let index = 0;
let timer = 60;
let interval = 0;

let correct = 0;
let userAns = undefined;

var questionBank = [
    {
        question: "What does HTML stand for?",
        choice1: "Hippo Technology Magic Link",
        choice2: "Hyper Motor Life",
        choice3: "Hyperlink Markup Language",
        choice4: "Hello Tyler Miller Laura",
        answer: 3
    },

    {
        question: "What is Github?",
        choice1: "A cult",
        choice2: "A fan club",
        choice3: "A hosting platform",
        choice4: "A social media",
        answer: 3
    },

    {
        question: "What is the git command to create and clone a remote repository?",
        choice1: "git pull",
        choice2: "git push",
        choice3: "cd",
        choice4: "git clone",
        answer: 4
    },

    {
        question: "What do you use to modify your site screen?",
        choice1: "Media Queries",
        choice2: "Font-size",
        choice3: "Background",
        choice4: "Padding",
        answer: 1
    },

    {
        question: "Which answer belows is a programming language?",
        choice1: "SP500",
        choice2: "Javascript",
        choice3: "FBI",
        choice4: "PS5",
        answer: 2
    },
]

// Click the button
startBtn.addEventListener("click", function() {
    startBtn.style.display = "none";
    rules.style.display = "block";
    countdown();
    showQuestion();
    choices.forEach(removeActive => {
        removeActive.classList.remove("active");   
    })
} );

nextBtn.addEventListener("click", function() {
    if (index !== questionBank.length -1 ) {
        index++;
        choices.forEach(removeActive => {
            removeActive.classList.remove("active");
    })
    showQuestion();
} else {
    index = 0;
    endGame();
    clearInterval(interval);
    quiz.style.display = 'none';
    score = `You got ${correct} out of 5 correct answers.`;
    result.style.display = "block";
} for (i = 0; i <= 3; i++) {
    choices[i].classList.remove("disabled");
}
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
    console.log(countdown);
}
function checkTime() {
    if (timer <= 0) {
        timer = 0;
        endGame();
    }
}
function deductTime(seconds) {
    totalTime -= seconds;
    checkTime();
    displayTime();
}
    
// Show questions and answers
function showQuestion() {
    questionNo.innerText = questionBank[index].question;
    choice1.innerText = questionBank[index].choice1;
    choice2.innerText = questionBank[index].choice2;
    choice3.innerText = questionBank[index].choice3;
    choice4.innerText = questionBank[index].choice4;
    timer = 60;
    console.log (showQuestion);
}

choices.forEach((options, choiceNo) => {
    options.addEventListener("click", () => {
        options.classList.add("active");
        if (choiceNo === questionBank[index].answer) {
            correct++;
        } else {
            correct += 0;
            deductTime(10);
        }
        for (i = 0; i <= 3; i++) {
            choices[i].classList.add("disabled");
        }
        console.log(choices);
    }) 
});

// Enter initials
function inputInitial(event) {
    event.preventDefault();
    var initials = initials.value.toUpperCase();
    if (isInputValid(initials)) {
        const score = totalTime;
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

function endGame() {
    clearInterval(interval);
    result.style.display = "block";
    displayScore();
    
}
function displayScore () {
    score.textContent = totalTime;
}


