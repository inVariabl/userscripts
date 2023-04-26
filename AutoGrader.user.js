// ==UserScript==
// @name        BlackBoard Automatic Grader
// @namespace   Violentmonkey Scripts
// @include     https://*.blackboard.com/webapps/bb-selfpeer-*/contentType/marking/evaluation.jsp*
// @grant       none
// @version     1.0
// @author      inVariabl
// @description Expedites the grading process by automatically filling in the maximum point values for text inputs and checking all checkboxes.
// ==/UserScript==

function getMaxPointsFromLabel(id) {
  return parseInt(document.querySelector(`label[for="${id}"]`).innerText.split(" ").at(-1));
}

function setMaxPointsForInput(id, point) {
  document.querySelector(`input[id="${id}"]`).value = point;
}

function setCheckboxValue(id, value) {
  document.querySelector(`input[id="${id}"]`).checked = value;
}

function givePoints(type) {
  const inputElements = Array.from(document.querySelectorAll(`input[type="${type}"]`));
  inputElements.forEach((input) => {
    const id = input.id;
    if (type === "text") {
      const point = getMaxPointsFromLabel(id);
      setMaxPointsForInput(id, point);
    } else if (type === "checkbox") {
      setCheckboxValue(id, true);
    }
  });
}

givePoints("text");
givePoints("checkbox");
document.querySelector("#containerdiv > form > p > input.submit").click(); // submit
