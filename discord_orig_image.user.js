// ==UserScript==
// @name           Discord orig image
// @description    Get rid of width and height from url
// @version        0.1.0
// @match          https://media.discordapp.net/attachments/*
// @run-at         document-start
// ==/UserScript==

let current_url = window.location.href;

if (/^https:\/\/media\.discordapp\.net\/attachments\/\d*\/\d*\/\S*\.(?:jpg|png)\?width=\d*&height=\d*/.test(current_url) === true) {
    let new_url = current_url.match(/^https:\/\/media\.discordapp\.net\/attachments\/\d*\/\d*\/\S*\.(?:jpg|png)/)[0];
    window.location.assign(new_url);
}