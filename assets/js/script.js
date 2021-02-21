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

function hide (w) {
    w.classList.add('hide')
}

function show (x) {
    x.classList.remove('hide')
}

function addHidden (y) {
    y.classList.add('hidden');
}

function removeHidden (z) {
    z.classList.remove('hidden');
}

getLastScore();

showScores.addEventListener('click', function () {
    hide(intro);
    showHighScores();
});


startQuiz.addEventListener('click', function () {
    currentQuestion = 0;
    score = 0;
    hide(intro, complete);
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
        removeHidden(result);
        result.textContent = 'Correct';
        score += timerLeft;
        setTimeout(function(){showQuestion()}, 500);
        setTimeout(function(){(addHidden(result))}, 500);
    } else {
        removeHidden(result);
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
        show(quiz);
        
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
    hide(quiz);
    show(complete);
    finalScore.textContent = score;
    if(timerLeft === 0) {
        document.querySelector('#completeTitle').textContent = 'You ran out of time!';
    }
}

submit.addEventListener('click', function (event) {
    event.preventDefault();

    let lastInitials = initials.value;
    let lastScore = score;
    clearScoresUl();


    if(initials.value !== ''){
        localStorage.setItem(lastInitials, lastScore);
        getLastScore();
        showHighScores();
    } else {
        removeHidden(error);
    }
});

function getLastScore() {
    for (let i = 0; i < localStorage.length; i++) {
        // clearScoresUl();
        let keyInitials = localStorage.key(i);
        let valueScore = localStorage.getItem(keyInitials);

        liEl = document.createElement('li');
        liEl.textContent = `${keyInitials}: ${valueScore}`;

        highScoreList.appendChild(liEl);

    }
}

// ****** clearing highScore ul element ******
let clearScoresUl = function () {
    highScoreList.querySelectorAll('li').forEach(n => n.remove(liEl));
}

// ******* GO BACK *******
goBack.addEventListener('click', function () {
    hide(highScores);
    show(intro);
});

// ******* CLEAR *******
clear.addEventListener('click', function () {
    localStorage.clear();
    clearScoresUl();
});

function showHighScores() {
    hide(complete);
    show(highScores);
}



