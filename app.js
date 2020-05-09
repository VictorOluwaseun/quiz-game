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
 ];
 return {
  getQuestions: () => {
   return questions;
  },
 };
})();

const LogicCtrl = (() => {
 //Private
 let currentIndex = 0;

 return {
  getCurrentIndex: () => currentIndex,
  setCurrentIndex: (num) => (currentIndex = num),
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
 };
})();

const UICtrl = (() => {
 //Private
 const selectors = {
  quiz: "#quiz",
  question: "#question",
  questionNo: "#question-no",
  score: "#score",
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
 };
})();

const App = ((QuestionCtrl, LogicCtrl, UICtrl) => {
 const { quiz, next } = UICtrl.getSelectors();

 //Load EventListners
 const loadEventListners = () => {
  document.addEventListener("click", clickHandler);
 };

 const clickHandler = (e) => {
  e.preventDefault();
  if (e.target === document.querySelector(next)) {
   nextFunction();
  }
 };

 const questions = QuestionCtrl.getQuestions();

 LogicCtrl.setCurrentIndex(0);

 const index = LogicCtrl.getCurrentIndex();
 console.log(index);

 const questionDetails = LogicCtrl.questionIterator(questions, index);

 const { value: question, done } = questionDetails.next();

 //check if no next question

 //Display question and options
 UICtrl.displayQuestion(question);

 console.log(questionDetails.next());

 //Display question
 //  UICtrl.displayQuestion();

 return {
  init: () => {
   loadEventListners();
  },
 };
})(QuestionCtrl, LogicCtrl, UICtrl);

//Start App
App.init();
