// ==UserScript==
// @name        Nitter Tweaks
// @namespace   Violentmonkey Scripts
// @include     https://nitter.net/*
// @include     https://n.asak.gg/*
// @grant       none
// @version     1.0
// @author      Daniel Crooks
// @description UI Tweaks to clean up Nitter
// ==/UserScript==

console.log("Nitter Mods Loading...");

function changeText() {
    document.body.style.fontFamily = "Atkinson Hyperlegible";
}

function changeBorder() {
    const timelineDivs = document.querySelectorAll('.timeline>div:not(:first-child)');
    timelineDivs.forEach(div => { div.style.borderTop = '5px solid var(--bg_color)'; });
}

function changeHeaderIcon() {
    document.querySelector("body > nav > div > div:nth-child(1) > a").innerText = "🐦"; // "nitter" to bird emoji

    let username = "";
    try {
        username = document.querySelector("body > div > div > div.profile-tab.sticky > div.profile-card > div.profile-card-info > div > a.profile-card-username").innerText;
    } catch (err) {
        console.error("Username not found.");
    }

    document.querySelector("body > nav > div > a").innerHTML = username;
}

function changeSuspensionMessage() {
    try {
        var statusText = document.querySelector("body > div > div > div > span").innerText;
        var accountUnavailableRegex= /User ".*?" not found/;
        if (statusText == 'User "" has been suspended') {
            document.querySelector("body > div > div > div > span").innerText = "Account Suspended.";
        } else if (statusText == 'Tweet not found') {
            document.querySelector("body > div > div > div > span").innerText = "Tweet Deleted.";
        } else if (accountUnavailableRegex.test(statusText)) {
            document.querySelector("body > div > div > div > span").innerText = "Account Unavailable.";
        }
    } catch (err) {
        //console.error("User not Suspended.");
    }
}

function changeSearchBar() {
    document.querySelector(".search-bar > form").style.background = "#000";
}

changeText();
changeBorder();
changeHeaderIcon();
changeSuspensionMessage();
changeSearchBar();
