// ==UserScript==
// @name        Quizlet JSON
// @namespace   Violentmonkey Scripts
// @include     https://quizlet.com/*/*
// @grant       none
// @version     1.0
// @author      Daniel Crooks
// @description View Quizlets in a clean table, easily searchible
// ==/UserScript==

function getQuizletJSON() {
	const data = document.getElementsByClassName("TermText");
	let term, definition;
	let flashcards = []; // [[term, definition], [term, definition]]
	for (let i = 0; i < data.length; i += 2) {
		term = data[i].innerText.replace("\n-", " ");
		definition = data[i+1].innerText.replace("\n-", " ");
		//console.log({term, definition});
		flashcards.push([term, definition]);
	}
	return flashcards;
}

function displayAsTable(flashcards) {
	const newTab = window.open();
	let content;
	const style = `<style>
	html {
		background: #0a092d;
		color: #f6f7fb;
	}
	table {
		font-family: Atkinson Hyperlegible, sans-serif;
  		border-collapse: collapse;
  		width: 100%;
	}
	td, th {
  		text-align: center;
  		padding: 15px;
	}
	tr:nth-child(even) {
  		background-color: #2e3856;
	}</style>`;

	const tableHeader = `<table><tr><th>Term</th><th>Definition</th></tr>`;

	for (let i = 0; i < flashcards.length; i++) {
		content += `<tr><td>${flashcards[i][0]}</td><td>${flashcards[i][1]}</td></tr>`;
	}

	let html = style + tableHeader + content + `</table>`;

	newTab.document.write(html);
	newTab.document.close();
}

const flashcards = getQuizletJSON();
displayAsTable(flashcards);
