let intro = document.querySelector('#intro');
let showScores = document.querySelector('#showScores');
let startQuiz = document.querySelector('#btn-start');
let quiz = document.querySelector('#quiz');
let quizQuestion = document.querySelector('#quizQuestion');
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

let currentQuestion;
const timerEl = document.querySelector('#time');
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

getLastScore();

showScores.addEventListener('click', function () {
    intro.classList.add('hide');
    showHighScores();
    // getLastScore();
});


startQuiz.addEventListener('click', function () {
    currentQuestion = 0;
    score = 0;
    intro.classList.add('hide');
    complete.classList.add('hide');
    setTime();
    showQuestion();
});


function setTime() {
// timer function
    timerLeft = 75;
    timerEl.textContent = timerLeft;
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        timerLeft--;
        timerEl.textContent = timerLeft;

        if(timerLeft === 0 || currentQuestion === questions.length) {
        // Stops execution of action at set interval
        showScore();
        clearInterval(timerInterval);
        }
    }, 1000);
}

function checkAnswer(event) {
    if (event === questions[currentQuestion].answer) {
        currentQuestion++;
        result.classList.remove('hidden');
        result.textContent = 'Correct';
        score += timerLeft;
        setTimeout(function(){showQuestion()}, 500);
        setTimeout(function(){(result.classList.add('hidden'))}, 500);
    } else {
        result.classList.remove('hidden');
        result.textContent = 'Incorrect';
        timerLeft -= 10;
    }
}

qChoices[0].addEventListener('click', function () {
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


function showQuestion() {
    if (timerLeft !== 0 && currentQuestion < questions.length) {
        quiz.classList.remove('hide');
        
        quizQuestion.textContent = questions[currentQuestion].title;
        // console.log(quizQuestion);
        for (let c = 0; c < questions[currentQuestion].choices.length; c++) {
            qChoices[c].textContent = questions[currentQuestion].choices[c];
        }
    } else {
        showScore();
    }
}

function showScore() {
    quiz.classList.add('hide');
    complete.classList.remove('hide');
    finalScore.textContent = score;
    if(timerLeft === 0) {
        document.querySelector('#completeTitle').textContent = 'You ran out of time!';
    }
}

submit.addEventListener('click', function (event) {
    event.preventDefault();

    let lastInitials = initials.value;
    let lastScore = score;
    console.log(lastInitials);
    console.log(lastScore);

    if(initials.value !== ''){
        localStorage.setItem(lastInitials, lastScore);
        getLastScore();
        showHighScores();
    } else {
        error.classList.remove('hidden')
    }
});

function getLastScore() {
    for (let i = 0; i < localStorage.length; i++) {
        let keyInitials = localStorage.key(i);
        // let keyScore = localStorage.value(i);
        let valueScore = localStorage.getItem(keyInitials);
        // let lastScore = localStorage.getItem(keyScore);

        liEl = document.createElement('li');
        liEl.textContent = `${keyInitials}: ${valueScore}`;

        highScoreList.appendChild(liEl);

    }
}

goBack.addEventListener('click', function () {
    highScores.classList.add('hide');
    intro.classList.remove('hide');
});
clear.addEventListener('click', function () {
    localStorage.clear();
    highScoreList.querySelectorAll('*').forEach(n => n.remove(liEl));
});

function showHighScores() {
    complete.classList.add('hide');
    highScores.classList.remove('hide');
}



