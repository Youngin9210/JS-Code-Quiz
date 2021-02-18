let intro = document.querySelector('#intro');
let quiz = document.querySelector('#quiz');
let startQuiz = document.querySelector('#btn-start');
let choiceBtns = document.querySelectorAll('.btn');
let qChoices = [
    choice1 = document.querySelector('#choiceBtn1'),
    choice2 = document.querySelector('#choiceBtn2'),
    choice3 = document.querySelector('#choiceBtn3'),
    choice4 = document.querySelector('#choiceBtn4'),
];
let quizQuestion = document.querySelector('#quizQuestion');
let currentQuestion = 0;
const timerEl = document.querySelector('#time');
let timerLeft = 60;
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
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses'
      },
      {
          title: 'Arrays in JavaScript can be used to store ______.',
          choices: ['numbers and strings', 'other arrays', 'booleans', 'all the above'],
          answer:'all the above'
      },
      {
          title: 'String values must be enclosed within ______ when being assigned to variables.',
          choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
          answer: 'curly brackets'
      },
      {
          title: 'A very useful tool used during development and debugging for printing content to the debugger is:',
          choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
          answer: 'for loops'
      }
]

startQuiz.addEventListener('click', function () {
    intro.classList.add('hide');
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
      
      
    function showQuestion() {
        quiz.classList.remove('hide');
        
        quizQuestion.textContent = questions[currentQuestion].title;
        for (let c = 0; c < questions[currentQuestion].choices.length; c++) {
            qChoices[c].textContent = questions[currentQuestion].choices[c];
        }
        
        for (let j = 0; j < qChoices.length; j++) {
            qChoices[j].addEventListener('click', function(event) {
                console.log(this.textContent);
                if (this.textContent === questions[currentQuestion].answer) {
                    console.log('correct');
                    score += timerLeft;
                    console.log(score);
                } else {
                    console.log('wrong')
                    timerLeft -= 5;
                    console.log(timerLeft);
                }
            });
        }
    }
    
    setTime();
    showQuestion();
        
});



