// ==UserScript==
// @name        Canvas QuizBot
// @namespace   Violentmonkey Scripts
// @include     https://*instructure.com/courses/*/quizzes/*
// @grant       none
// @version     1.0
// @author      Daniel Crooks
// @description Store correct answers and autofill them when retaking the quiz
// ==/UserScript==

function storeAnswers() {
  const questions = document.querySelectorAll(".question_text.user_content.enhanced");
  const answers = document.querySelectorAll(".correct_answer");

  questions.forEach((question, i) => {
    let answer;
    if (correctAnswersHidden()) { // FIXME: calling each iteration; only need one
      if (isCorrect(i)) {
        answer = document.querySelectorAll(".selected_answer > div.select_answer > label > div.answer_text")[i].innerText;
        if (answer == 'No answer text provided.') {
          answer = document.querySelectorAll(".selected_answer > div.select_answer > label > div.answer_html")[i].innerText;
        }
      }
    } else {
      answer = answers[i].querySelector(".answer_text").innerText;
      if (answer == 'No answer text provided.') {
        answer = answers[i].querySelector(".answer_html").innerText;
      }
    }

    question = question.innerText;

    console.log({question: answer});
    localStorage.setItem(question, answer);
  });
}

function correctAnswersHidden() {
  const element = document.querySelector("div.alert > span");
  if (element && element.innerText == 'Correct answers are hidden.') {
    return true;
  } else {
    return false;
  }
}

function isCorrect(i) {
  return document.querySelectorAll("span.name.question_name")[i].querySelector(".answer_arrow.incorrect") == null;
}

function fillAnswers() {
  const questions = document.querySelectorAll(".question_text.user_content.enhanced");

  questions.forEach((question, i) => {
    const correctAnswer = localStorage.getItem(question.innerText);
    const answerOptions = document.querySelectorAll(".answers")[i].querySelectorAll(".answer_label");

    answerOptions.forEach((answerOption, j) => {
      const option = answerOption.innerText;
      if (option === correctAnswer) {
        document.querySelectorAll(".answers")[i].querySelectorAll(".answer_input")[j].click();
      }
    });
  });
}

function formatMathJaxtoText() {
  const elements = document.querySelectorAll("span.math_equation_latex.fade-in-equation");
  for (let i = 0; i < elements.length; i++) {
    let mathTex = elements[i].querySelector("script").innerText;
    elements[i].innerText = mathTex;
  }
}

const observer = new MutationObserver(function(mutationsList, observer) {
  const elements = document.querySelectorAll("span.math_equation_latex.fade-in-equation");
  if (elements.length > 0) {
    observer.disconnect();
    formatMathJaxtoText();

    try { storeAnswers(); } catch(e) { console.error(e) };
    try { fillAnswers(); } catch(e) { console.error(e) };
  }
});

observer.observe(document.documentElement, { childList: true, subtree: true });
