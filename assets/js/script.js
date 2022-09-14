var questionBank = [
    {
        question: "What does HTML stand for?",
        choices: ["Hippo Technology Magic Link", "Hyper Motor Life", "Hyperlink Markup Language", "Hello Tyler Miller Laura"],   
        answer: "Hyperlink Markup Language",
    },

    {
        question: "What is Github?",
        choices: ["A cult", "A fan club", "A hosting platform", "A social media"],
        answer: "A hosting platform",
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

// click start btn
var startBtn = document.getElementById("start-btn")
var quizEL = document.getElementById("quiz")

startBtn.addEventListener("click", function() {
    startBtn.style.display = "none"
    quiz.style.display = "block"
    countdown();
    startQuiz();
});

//function Start quiz

var index = 0;
document.getElementById("questionNo").innerHTML = questionBank[index].question;
document.getElementById("option1").innerHTML = questionBank[index].choices[0];
document.getElementById("option2").innerHTML = questionBank[index].choices[1];
document.getElementById("option3").innerHTML = questionBank[index].choices[2];
document.getElementById("option4").innerHTML = questionBank[index].choices[3];
var userChoice = undefined;
var choices = document.querySelectorAll(".choicesBtn");
var nextBtn = document.getElementById("next-btn");

function startQuiz() {
    questionNo.innerText = questionBank[index].question;
    option1.innerText = questionBank[index].choices[0];
    option2.innerHTML = questionBank[index].choices[1];
    option3.innerHTML = questionBank[index].choices[2];
    option4.innerHTML = questionBank[index].choices[3];
    var currentQ = questionBank[index];
    // console.log(currentQ);

    // bug 1: syntax - for loop not completed
    //for (var i = 0; i < currentQ.choices[i]; i++)
}

nextBtn.addEventListener("click", function() {
    if (index !== questionBank.length - 1) {
        index++;

        // bug 2: removeActive is a function, not object or element => no remove property
        choices.forEach(function removeActive(selectedChoice) {
            console.log("selected choice: " + selectedChoice.textContent);

            // bug 3: there is no active class???
            // selectedChoice.classList.remove("active");
            // continue working from line 88 in sample
        })

        startQuiz();
        result.style.display = "block"
    } else {
        index = 0;
    } 
    // bug 4: what does it for?
    for (i = 0; i <= 3; i++) {
        // bug 5: same as bug 3: there is no disabled class
        //choices.classList.remove("disabled");
    }
})
// function right or wrong

var scores = document.getElementById("scores");
var correct = 0;
var count = 0;

function rightAnswer() {
    correct++;
    count++;
    if (count == questionBank.length) {
        endGame ();
    } else {
        startQuiz();
    } console.log (startQuiz);
    return correct;
}

function wrongAnswer() {
    correct += 0;
    count++;
    deductTime(10);
    if (count == questionBank.length) {
        endGame();
    } else {
        startQuiz();
    } return correct
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

// function end quiz
function endGame() {
    clearInterval(interval);
    result.style.display = "block";
    quiz.style.display = "none";

    // bug 6: typo 'scores' not 'score'
    scores.textContent = "You got" + `${correct}` + "answers";
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

