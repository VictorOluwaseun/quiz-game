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
  next: "#next",
  prev: "#prev",
  submit: "#submit",
  navbtns: "#nav-btns",
 };

 return {
  getSelectors: () => {
   return selectors;
  },
 };
})();

const App = ((QuestionCtrl, LogicCtrl, UICtrl) => {
 const { quiz } = UICtrl.getSelectors();

 const questions = QuestionCtrl.getQuestions();

 LogicCtrl.setCurrentIndex(0);

 const index = LogicCtrl.getCurrentIndex();
 console.log(index);

 const question = LogicCtrl.questionIterator(questions, index);

 console.log(question.next());

 //Display question
 //  UICtrl.displayQuestion();

 return {
  init: () => {},
 };
})(QuestionCtrl, LogicCtrl, UICtrl);

//Start App
App.init();
