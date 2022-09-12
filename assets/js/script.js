// var dom //
var startBtn = document.getElementById("start-btn");

var rules = document.getElementById("rules");
var continueBtn = document.getElementById("accept-rules");

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
var tryAgainBtn = document.getElementById("try-again");

let index = 0;
let timer = 0;
let interval = 0;

let correct = 0;
let totalCorrect = undefined;

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
} );

continueBtn.addEventListener("click", function() {
    rules.style.display = "none";
    quiz.style.display = "block";
    interval = setInterval(countdown, 1000);
    showQuestion();

    choices.forEach(removeActive => {
        removeActive.classList.remove("active");   
    })
    //score = `You got ${correct = 0} out of 5 Correct Answers`;//
} );

nextBtn.addEventListener("click", function() {
    if (index !== questionBank.length -1 ) {
        index++;
        choices.forEach(removeActive => {
            removeActive.classList.remove("active");
    })
    showQuestion();
    score.style.display = "block";
    // score = `You got ${correct = 0} out of 5 Correct Answers`;//
    clearInterval(interval);
    interval = setInterval(countdown, 1000);
} else {
    index = 0;
    clearInterval(interval);
    quiz.style.display = 'none';
    score = `You got ${correct} out of 5 correct answers.`;
    result.style.display = "block";
} for (i = 0; i <= 3; i++) {
    choices[i].classList.remove("disabled");
}
})

tryAgainBtn.addEventListener("click", function() {
    rules.style.display = "block";
    result.style.display = "none";
})

// Timer 
let countdown = function() {
    if(timer === 20) {
        clearInterval(interval);
        nextBtn.click();
    } else {
        timer++;
        time.innerText = timer;
    }
}

function showQuestion() {
    questionNo.innerText = questionBank[index].question;
    choice1.innerText = questionBank[index].choice1;
    choice2.innerText = questionBank[index].choice2;
    choice3.innerText = questionBank[index].choice3;
    choice4.innerText = questionBank[index].choice4;
    timer = 0;
}

for (choiceList(choiceNo) of choices) {
    choiceList.addEventListener("click", function() {
        choiceList.classList.add("active");
        if (choiceNo === questionBank[index].answer) {
            correct++;
        } else {
            correct += 0;
        } clearInterval(interval);
        for ( i = 0; i <= 3; i++) {
            choicesBtn[i].classList.add("disabled");
        }
    })
};
//choices.forEach( (choiceList, choiceNo) => {
   // choiceList.addEventListener("click", function() {
       // choiceList.classList.add("active");

      //  if (choiceNo === questionBank[index].answer) {
       //     correct++;
       // } else {
       //     correct += 0;
       // }  
       // clearInterval(interval);
       // for (i=0; i <= 3; i++) {
      //      choices[i].classList.add("disabled");
      //  }
  //  })
//});





// function selectQuestion {



//function selectNextQuestion {


