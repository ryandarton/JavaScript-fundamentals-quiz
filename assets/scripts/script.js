const startButton = document.getElementById('start-btn');
const timerDisplay = document.getElementById('time-left');
let totalSeconds = document.getElementById('time-left').textContent;
let finalScore = document.getElementById('final-score').textContent;
let timeInterval;

// questions are sourced from javatpoint.com
const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<script>', correct: true },
      { text: '<scripting>', correct: false },
      { text: '<javascript>', correct: false },
      { text: '<java>', correct: false },
    ],
  },
  {
    question: 'JavaScript is the same as Java.',
    answers: [
      { text: 'False', correct: true },
      { text: 'True', correct: false },
    ],
  },
  {
    question: 'What will typeof null return?',
    answers: [
      { text: '"object"', correct: true },
      { text: '"null"', correct: false },
      { text: '"undefined"', correct: false },
      { text: '"error"', correct: false },
    ],
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: [
      { text: '<script name="xxx.js">', correct: false },
      { text: '<script href="xxx.js">', correct: false },
      { text: '<script src="xxx.js">', correct: true },
    ],
  },
  {
    question: 'What will the following code return: Boolean(10 > 9)',
    answers: [
      { text: 'false', correct: false },
      { text: 'true', correct: true },
      { text: 'NaN', correct: false },
    ],
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'msg("Hello World");', correct: false },
      { text: 'alert("Hello World");', correct: true },
      { text: 'msgBox("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false },
    ],
  },
  {
    question: 'How do you create a function in JavaScript?',
    answers: [
      { text: 'function = myFunction()', correct: false },
      { text: 'function myFunction()', correct: true },
      { text: 'function:myFunction()', correct: false },
    ],
  },
  {
    question: 'How do you call a function named "myFunction"?',
    answers: [
      { text: 'call function myFunction()', correct: false },
      { text: 'call myFunction()', correct: false },
      { text: 'myFunction()', correct: true },
    ],
  },
  {
    question: 'How to write an IF statement in JavaScript?',
    answers: [
      { text: 'if (i == 5)', correct: true },
      { text: 'if i = 5', correct: false },
      { text: 'if i = 5 then', correct: false },
      { text: 'if i == 5 then', correct: false },
    ],
  },
  {
    question: 'How can you add a comment in a JavaScript?',
    answers: [
      { text: `'This is a comment`, correct: false },
      { text: '//This is a comment', correct: true },
      { text: `<!--This is a comment-->`, correct: false },
    ],
  },
];

let currentQuestionIndex = 0;

function showQuestion(questionIndex) {
  const questionObj = questions[questionIndex];
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');

  answerButtonsElement.innerHTML = '';

  if (currentQuestionIndex > 0 && currentQuestionIndex < questions.length) {
    document.getElementById('question-feedback').classList.remove('hide');
  } else {
    document.getElementById('question-feedback').classList.add('hide');
  }

  questionElement.textContent = questionObj.question;

  questionObj.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  const trutherElement = document.getElementById('truther');
  const timerElement = document.getElementById('timer');

  trutherElement.classList.remove('correct', 'wrong');
  timerElement.classList.remove('flash-wrong');

  if (correct) {
    trutherElement.classList.add('correct');
    trutherElement.textContent = 'Correct!';
  } else {
    totalSeconds -= 5;
    updateTimerDisplay(totalSeconds);
    trutherElement.classList.add('wrong');
    trutherElement.textContent = 'Wrong, minus 5 seconds...';
    timerElement.classList.remove('flash-wrong');
    void timerElement.offsetWidth;
    timerElement.classList.add('flash-wrong');

    setTimeout(() => {
      timerElement.classList.remove('flash-wrong');
    }, 500);
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

function updateTimerDisplay(seconds) {
  timerDisplay.textContent = seconds;
}

function startTimer() {
  timeInterval = setInterval(function () {
    totalSeconds--;
    updateTimerDisplay(totalSeconds);

    if (totalSeconds <= 0) {
      endQuiz();
    }
  }, 1000);
}

function startQuiz() {
  document.getElementById('timer').classList.remove('hide');
  totalSeconds = 60;
  currentQuestionIndex = 0;
  updateTimerDisplay(totalSeconds);
  startTimer();
  const answerButtons = document.querySelectorAll('#answer-buttons button');
  answerButtons.forEach((button) => {
    button.classList.remove('selected');
    button.removeAttribute('data-selected');
  });
  showQuestion(currentQuestionIndex);
  document.getElementById('questions-card').classList.remove('hide');
  document.getElementById('intro').classList.add('hide');
  document.getElementById('final-score').textContent = totalSeconds;
}

function saveScore(initials, score) {
  const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  const newScore = { initials, score };
  highscores.push(newScore);
  highscores.sort((a, b) => b.score - a.score);
  localStorage.setItem('highscores', JSON.stringify(highscores));
}

function showScoreboard() {
  const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  const scoreList = document.getElementById('score-list');
  document.getElementById('game-over-container').classList.add('hide');
  scoreList.innerHTML = '';
  highscores.forEach((score) => {
    const li = document.createElement('li');
    li.textContent = `${score.initials} - ${score.score}`;
    scoreList.appendChild(li);
  });
  document.getElementById('scoreboard-container').classList.remove('hide');
}

document.getElementById('score-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const initials = document.getElementById('initials').value;
  saveScore(initials, totalSeconds);
  showScoreboard();
});

document.getElementById('retry-btn').addEventListener('click', function () {
  document.getElementById('scoreboard-container').classList.add('hide');
  let currentQuestionIndex = 0;
  startQuiz();
});

document.getElementById('clear-scores-btn').addEventListener('click', function () {
  localStorage.removeItem('highscores');
  showScoreboard();
});

function endQuiz() {
  updateTimerDisplay(totalSeconds);
  // finalScore = totalSeconds;
  document.getElementById('final-score').textContent = totalSeconds;
  clearInterval(timeInterval);
  document.getElementById('questions-card').classList.add('hide');
  document.getElementById('game-over-container').classList.remove('hide');
}

startButton.addEventListener('click', startQuiz);
