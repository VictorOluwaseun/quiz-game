const QuestionCtrl = (() => {
 //Private
 const questions = [
  {
   question: "Who invented JavaScript?",
   answers: {
    a: "Douglas Crockford",
    b: "Sheryl Sandberg",
    c: "Brendan Eich",
   },
   correctAnswer: "c",
  },
  {
   question: "Which one of these is a JavaScript package manager?",
   answers: {
    a: "Node.js",
    b: "TypeScript",
    c: "npm",
   },
   correctAnswer: "c",
  },
  {
   question: "Which tool can you use to ensure code quality?",
   answers: {
    a: "Angular",
    b: "jQuery",
    c: "RequireJS",
    d: "ESLint",
   },
   correctAnswer: "d",
  },
  {
   question:
    "The behaviour of the instances present of a class inside a method is defined by what",
   answers: {
    a: "Method",
    b: "Classes",
    c: "Interfaces",
    d: "Classes and Interfaces",
   },
   correctAnswer: "b",
  },
  {
   question:
    "The behaviour of the instances present of a class inside a method is defined by what?",
   answers: {
    a: "Method",
    b: "Classes",
    c: "Interfaces",
    d: "Classes and Interfaces",
   },
   correctAnswer: "b",
  },
 ];
 let currentQuestion = "";
 return {
  getQuestions: () => {
   return questions;
  },
  getAnswers: () => {
   return questions.answers;
  },
  setCurrentQuestion: (question) => {
   currentQuestion = question;
  },
  getCurrentQuestion: () => currentQuestion,
 };
})();

const LogicCtrl = (() => {
 //Private
 let currentIndex = 0;
 let disableQuestions = false;
 let userScore = 0;

 return {
  getCurrentIndex: () => currentIndex,
  setCurrentIndex: (num) => (currentIndex = num),
  selectNextIndex: (index) => ++index,
  selectPrevIndex: (index) => --index,
  addScore: () => userScore++,
  deductScore: () => userScore--,
  getScore: () => userScore,
  questionIterator: (questions, startAt) => {
   let nextIndex = startAt;

   return {
    next: function () {
     return nextIndex < questions.length
      ? { value: questions[nextIndex++], done: false }
      : { done: true };
    },
   };
  },
  setDisableQuestions: (bln) => {
   disableQuestions = bln;
  },
  getDisableQuestions: () => {
   return disableQuestions;
  },
 };
})();

const UICtrl = (() => {
 //Private
 const selectors = {
  quiz: "#quiz",
  question: "#question",
  questionNo: "#question-no",
  score: "#score",
  scoreDigit: "#score-digit",
  options: ".options",
  option: ".option",
  next: "#next",
  prev: "#prev",
  submit: "#submit",
  navbtns: "#nav-btns",
 };

 return {
  getSelectors: () => {
   return selectors;
  },
  displayQuestion: (question) => {
   document.querySelector(selectors.question).textContent = question.question;
   const options = document.querySelector(selectors.options);
   const answersEntries = Object.entries(question.answers); //https://zellwk.com/blog/looping-through-js-objects/ According to blog, better way to loop through an object
   //  const s = answersEntries.map((el) => {
   let optionGroup = "";
   for (const [option, value] of answersEntries) {
    optionGroup += `<div class="option" data-opt="${option}">${option.toUpperCase()}. ${value}</div>`;
   }

   options.innerHTML = optionGroup;
  },
  hideShowBtnToggle: (btn, command) => {
   document.querySelector(btn).style.display = command;
  },
  setBackgroundRight: (target) => {
   if (!LogicCtrl.getDisableQuestions()) {
    target.style.backgroundColor = "green";
    target.style.color = "white";
   } else {
    document
     .querySelectorAll(selectors.option)
     .forEach((el) => (el.style.cursor = "not-allowed"));
   }
  },
  setBackgroundWrong: (target) => {
   if (!LogicCtrl.getDisableQuestions()) {
    target.style.backgroundColor = "red";
    target.style.color = "white";
   } else {
    document
     .querySelectorAll(selectors.option)
     .forEach((el) => (el.style.cursor = "not-allowed"));
   }
  },
  showScore: function (score) {
   document.querySelector(selectors.scoreDigit).textContent = score;
  },
 };
})();

const App = ((QuestionCtrl, LogicCtrl, UICtrl) => {
 const { next, prev, option, submit, questionNo } = UICtrl.getSelectors();
 let qNo = (document.querySelector(questionNo).children[0].textContent = 1);

 const questions = QuestionCtrl.getQuestions();

 //Load EventListners
 const loadEventListners = () => {
  document.addEventListener("click", clickHandler);
 };

 const optionSelect = function ({ target }) {
  for (let i = 0; i < document.querySelectorAll(option).length; i++) {
   const element = document.querySelectorAll(option)[i];
   if (target === element) {
    console.log(target.dataset.opt);
    const answer = QuestionCtrl.getCurrentQuestion().correctAnswer;
    console.log(answer);
    if (answer === target.dataset.opt) {
     console.log(target);
     UICtrl.setBackgroundRight(target);
     LogicCtrl.setDisableQuestions(true);
     LogicCtrl.addScore();
     UICtrl.showScore(LogicCtrl.getScore());
    } else {
     LogicCtrl.deductScore();
     UICtrl.showScore(LogicCtrl.getScore());
     UICtrl.setBackgroundWrong(target);
     LogicCtrl.setDisableQuestions(true);
    }
   }
  }
 };

 const clickHandler = (e) => {
  e.preventDefault();
  if (e.target === document.querySelector(next)) {
   nextFunction();
  } else if (e.target === document.querySelector(prev)) {
   prevFunction();
  } else {
   optionSelect(e);
  }
 };

 const nextFunction = () => {
  LogicCtrl.setDisableQuestions(false);
  document.querySelector(questionNo).children[0].textContent++;
  let index = LogicCtrl.getCurrentIndex();
  const nextIndex = LogicCtrl.selectNextIndex(index);
  LogicCtrl.setCurrentIndex(nextIndex);
  const newIndex = LogicCtrl.getCurrentIndex();
  const questionDetails = LogicCtrl.questionIterator(questions, newIndex);
  const { value: question, done } = questionDetails.next();
  // const { answers } = question;
  QuestionCtrl.setCurrentQuestion(question);

  //check if no next question
  console.log(done);

  if (done) {
   UICtrl.hideShowBtnToggle(next, "none");
   UICtrl.hideShowBtnToggle(submit, "block");
  } else {
   //Display question and options
   //  const a = (document
   //   .querySelector(questionNo)
   //   .getElementById("no").textContent = nextIndex);
   //  console.log(a);

   UICtrl.hideShowBtnToggle(prev, "block");
   UICtrl.hideShowBtnToggle(next, "block");
   UICtrl.hideShowBtnToggle(submit, "none");

   UICtrl.displayQuestion(question);
  }
 };

 const prevFunction = () => {
  LogicCtrl.setDisableQuestions(false);
  document.querySelector(questionNo).children[0].textContent--;
  let index = LogicCtrl.getCurrentIndex();
  const prevIndex = LogicCtrl.selectPrevIndex(index);
  LogicCtrl.setCurrentIndex(prevIndex);
  const newIndex = LogicCtrl.getCurrentIndex();
  const questionDetails = LogicCtrl.questionIterator(questions, newIndex);
  const { value: question, done } = questionDetails.next();
  QuestionCtrl.setCurrentQuestion(question);
  //check if no next question
  console.log(done);

  if (!question) {
   UICtrl.hideShowBtnToggle(prev, "none");
   UICtrl.hideShowBtnToggle(next, "block");
  } else {
   //Display question and options
   UICtrl.displayQuestion(question);
   UICtrl.hideShowBtnToggle(prev, "block");
   UICtrl.hideShowBtnToggle(next, "block");
   UICtrl.hideShowBtnToggle(submit, "none");
  }
 };

 //Display question
 //  UICtrl.displayQuestion();

 return {
  init: () => {
   document.addEventListener("DOMContentLoaded", function () {
    LogicCtrl.setCurrentIndex(0);

    const index = LogicCtrl.getCurrentIndex();
    console.log(index);

    const questionDetails = LogicCtrl.questionIterator(questions, index);

    const { value: question, done } = questionDetails.next();
    QuestionCtrl.setCurrentQuestion(question);

    //check if no next question

    //Display question and options
    UICtrl.displayQuestion(question);

    console.log(questionDetails.next());
   });

   loadEventListners();
  },
 };
})(QuestionCtrl, LogicCtrl, UICtrl);

//Start App
App.init();
