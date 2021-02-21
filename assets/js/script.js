//  declaring variables to be used by using querySelector 
let intro = document.querySelector('#intro');
let showScores = document.querySelector('#showScores');
let startQuiz = document.querySelector('#btn-start');
let quiz = document.querySelector('#quiz');
let quizQuestion = document.querySelector('#quizQuestion');

// quiz answer choices
let qChoices = [
    choice1 = document.querySelector('#choiceBtn1'),
    choice2 = document.querySelector('#choiceBtn2'),
    choice3 = document.querySelector('#choiceBtn3'),
    choice4 = document.querySelector('#choiceBtn4'),
];

let result = document.querySelector('#result');
let submit = document.querySelector('#btn-submit');
let complete = document.querySelector('#complete');
let finalScore = document.querySelector('#finalScore');
let initials = document.querySelector('#initials');
let error = document.querySelector('#error');
let highScores = document.querySelector('#highScores');
let highScoreList = document.querySelector('#highScoreList');
let liEl;
let goBack = document.querySelector('#btn-goBack');
let clear = document.querySelector('#btn-clear');
const timerEl = document.querySelector('#time');

let currentQuestion;
let timerLeft;
let score;


// questions to be shown during quiz
let questions = [
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts'
      },
      {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'parentheses', 'curly brackets', 'square brackets'],
        answer: 'parentheses'
      },
      {
        title: 'Arrays in JavaScript can be used to store ______.',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all the above'],
        answer:'all the above'
      },
      {
        title: 'String values must be enclosed within ______ when being assigned to variables.',
        choices: ['commas', 'parentheses', 'curly brackets', 'quotes'],
        answer: 'quotes'
      },
      {
        title: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['console.log', 'JavaScript', 'terminal/bash', 'for loops'],
        answer: 'console.log'
      }
]

// adding class hide to an element to hide that element
function hide (w) {
    w.classList.add('hide')
}

// removing class hide from an element to show that element
function show (x) {
    x.classList.remove('hide')
}

// adding class hidden to an element to hide that element
function addHidden (y) {
    y.classList.add('hidden');
}

// removing class hidden from an element to show that element
function removeHidden (z) {
    z.classList.remove('hidden');
}

// getting last scores from localStorage
getLastScore();

// adding click listener to 'View High Scores' link
showScores.addEventListener('click', function () {
    // hiding intro section
    hide(intro);
    // showing high scores section
    showHighScores();
});

// adding click listener to start quiz btn
startQuiz.addEventListener('click', function () {
    // setting currentQuestion variable to 0 everytime start quiz is clicked
    currentQuestion = 0;
    // setting score variable to 0 everytime start quiz is clicked
    score = 0;
    // hiding intro and complete sections
    hide(intro, complete);
    // setting time interval to countdown
    setTime();
    // showing question section
    showQuestion();
});

// timer function to countdown timer by 1 sec
function setTime() {
// timer function
    timerLeft = 75;
    timerEl.textContent = timerLeft;
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        timerLeft--;
        timerEl.textContent = timerLeft;
        // if time left DOES NOT equal 0 OR currentQuestion EQUALS 5
        if(timerLeft === 0 || currentQuestion === questions.length) {
            showScore();
            // Stops execution of action at set interval
            clearInterval(timerInterval);
        }
    }, 1000);
}

// function to check if answer selected is true
function checkAnswer(event) {
    // if statement to determine if answer selected is true
    if (event === questions[currentQuestion].answer) {
        currentQuestion++;
        // then show correct
        removeHidden(result);
        result.textContent = 'Correct';
        // then score = score + time left
        score += timerLeft;
        // setting timeout to wait .5 secs before showing next question
        setTimeout(function(){showQuestion()}, 500);
        // setting timeout to wait .5 secs before hiding result
        setTimeout(function(){(addHidden(result))}, 500);
    } else {
        // then display incorrect
        removeHidden(result);
        result.textContent = 'Incorrect';
        // then time left = time left - 10sec
        timerLeft -= 10;
    }
}

// adding click listeners to answer choices for question
qChoices[0].addEventListener('click', function () {
    // verifying if answer chosen is correct
    checkAnswer(this.textContent); 
});
qChoices[1].addEventListener('click', function () {
    checkAnswer(this.textContent); 
});
qChoices[2].addEventListener('click', function () {
    checkAnswer(this.textContent); 
});
qChoices[3].addEventListener('click', function () {
    checkAnswer(this.textContent); 
});

// function to show next question
function showQuestion() {
    // if there is time left AND not the last question
    if (timerLeft !== 0 && currentQuestion < questions.length) {
        // then show quiz section
        show(quiz);
        // set textContent of current question
        quizQuestion.textContent = questions[currentQuestion].title;
        // looping through choice buttons to set textContent
        for (let c = 0; c < questions[currentQuestion].choices.length; c++) {
            qChoices[c].textContent = questions[currentQuestion].choices[c];
        }
    } else {
        // then show score section
        showScore();
    }
}

// function to show score at end of quiz
function showScore() {
    // hide quiz section and show complete section
    hide(quiz);
    show(complete);
    // displaying score
    finalScore.textContent = score;
    // if there no time left
    if(timerLeft === 0) {
        // then display 'You ran out of time!'
        document.querySelector('#completeTitle').textContent = 'You ran out of time!';
    }
}

// click listener on submit button
submit.addEventListener('click', function (event) {
    // preventing default action of event
    event.preventDefault();
    // declaring variabls to be used to store into localStorage
    let lastInitials = initials.value;
    let lastScore = score;
    clearScoresUl();
    // if initials input is filled out
    if(initials.value !== ''){
        // then setItem into localStorage
        localStorage.setItem(lastInitials, lastScore);
        getLastScore();
        showHighScores();
    } else {
        // then display error message
        removeHidden(error);
    }
});

// getting last scores from local storage and printing them to the page
function getLastScore() {
    // looping through keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        let keyInitials = localStorage.key(i);
        let valueScore = localStorage.getItem(keyInitials);
        // creating an li element for every key in local storage
        liEl = document.createElement('li');
        // setting textContent of li element(s) that was created
        liEl.textContent = `${keyInitials}: ${valueScore}`;
        // appending li element to be a child element of highScoreList ul element
        highScoreList.appendChild(liEl);

    }
}

//  clearing highScore li elements inside ul element 
let clearScoresUl = function () {
    highScoreList.querySelectorAll('li').forEach(n => n.remove(liEl));
}

//  GO BACK (to intro) 
goBack.addEventListener('click', function () {
    hide(highScores);
    show(intro);
});

//  CLEAR 
clear.addEventListener('click', function () {
    // clearing local storage
    localStorage.clear();
    // clearing li elements
    clearScoresUl();
});

//  shows high scores 
function showHighScores() {
    hide(complete);
    show(highScores);
}



