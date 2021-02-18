const timerEl = document.querySelector('#time');
let startQuiz = document.querySelector('#btn-start');
let timerLeft = 60;

let quiestions = [
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
      setTime();


});

