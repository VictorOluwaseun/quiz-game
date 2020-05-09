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
 function QuestionIterator(questions) {
  let nextIndex = 0;

  return {
   next: function () {
    return nextIndex < questions.length
     ? { value: questions[nextIndex++], done: false }
     : { done: true };
   },
  };
 }
 return {
  pickQuestion: (questions) => {},
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

 const question = LogicCtrl.questionIterator(questions, 0);
 console.log(question.next());

 //Display question
 //  UICtrl.displayQuestion();

 return {
  init: () => {},
 };
})(QuestionCtrl, LogicCtrl, UICtrl);

//Start App
App.init();
