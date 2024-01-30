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
