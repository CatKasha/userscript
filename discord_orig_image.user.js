// ==UserScript==
// @name           Discord orig image
// @description    Get rid of width and height from url
// @version        0.2.0
// @match          https://media.discordapp.net/attachments/*
// @match          https://cdn.discordapp.com/avatars/*
// @match          https://cdn.discordapp.com/guilds/*/users/*/avatars/*
// @run-at         document-start
// ==/UserScript==

let current_url = window.location.href;

if (/^https:\/\/media\.discordapp\.net\/attachments\/\d*\/\d*\/\S*\.(?:jpg|png)\?width=\d*&height=\d*/.test(current_url) === true) {
    window.location.assign(current_url.match(/^https:\/\/media\.discordapp\.net\/attachments\/\d*\/\d*\/\S*\.(?:jpg|png)/)[0]);
}

if (/^https:\/\/cdn\.discordapp\.com\/(?:avatars\/\d*|guilds\/\d*\/users\/\d*\/avatars)\/\S*\.(?:webp|gif)/.test(current_url) === true) {
    let new_url = current_url.match(/^https:\/\/cdn\.discordapp\.com\/(?:avatars\/\d*|guilds\/\d*\/users\/\d*\/avatars)\/\S*\.(?:webp|gif)/)[0];
    if (current_url.slice(new_url.length) !== "?size=2048") {
        window.location.assign(new_url + "?size=2048");
    }
}