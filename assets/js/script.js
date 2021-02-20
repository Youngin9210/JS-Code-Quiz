let intro = document.querySelector('#intro');
let quiz = document.querySelector('#quiz');
let result = document.querySelector('#result');
let startQuiz = document.querySelector('#btn-start');
let complete = document.querySelector('#complete');
let finalScore = document.querySelector('#finalScore');
let qChoices = [
    choice1 = document.querySelector('#choiceBtn1'),
    choice2 = document.querySelector('#choiceBtn2'),
    choice3 = document.querySelector('#choiceBtn3'),
    choice4 = document.querySelector('#choiceBtn4'),
];

let quizQuestion = document.querySelector('#quizQuestion');
let currentQuestion = 0;
const timerEl = document.querySelector('#time');
let timerLeft = 75;
let score = 0;

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

function setTime() {
// timer function
    timerEl.textContent = timerLeft;
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timerLeft--;
      timerEl.textContent = timerLeft;
  
      if(timerLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
      }
    }, 1000);
  }

function checkAnswer(event) {
    if (event === questions[currentQuestion].answer) {
        result.classList.remove('hidden');
        result.textContent = 'Correct';
        score += timerLeft;
        currentQuestion++;
        setTimeout(function(){showQuestion()}, 500);
        setTimeout(function(){(result.classList.add('hidden'))}, 500);
    } else {
        result.classList.remove('hidden');
        result.textContent = 'Incorrect';
        timerLeft -= 5;
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
        quiz.classList.add('hide');
        console.log('oops');
    }
}

function showScore() {
    complete.classList.remove('hide');
    finalScore.textContent = score;
}

function getLastScore() {
    let lastScore = localStorage.getItem("lastScore");
    let lastInitials = localStorage.getItem("lastInitials");
  
    if (!lastScore || !lastInitials) {
      return;
    }
  
    
  }

startQuiz.addEventListener('click', function () {
    intro.classList.add('hide');
    setTime();
    showQuestion();
      

    
});



