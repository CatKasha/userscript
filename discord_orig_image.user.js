// ==UserScript==
// @name           Discord orig image
// @description    Get rid of width and height from url
// @version        0.2.1
// @match          https://media.discordapp.net/attachments/*
// @match          https://cdn.discordapp.com/avatars/*
// @match          https://cdn.discordapp.com/guilds/*/users/*/avatars/*
// @run-at         document-start
// ==/UserScript==

let current_url = window.location.href;

let regex_attachment = /^https:\/\/media\.discordapp\.net\/attachments\/\d*\/\d*\/\S*\.(?:jpg|png|gif)/
let regex_avatar = /^https:\/\/cdn\.discordapp\.com\/(?:avatars\/\d*|guilds\/\d*\/users\/\d*\/avatars)\/\S*\.(?:webp|gif)/


if (regex_attachment.test(current_url) === true) {
    let new_url = current_url.match(regex_attachment)[0]
    if (current_url.length > new_url.length) {
        window.location.assign(new_url);
    }
} else if (regex_avatar.test(current_url) === true) {
    let new_url = current_url.match(regex_avatar)[0];
    if (current_url.slice(new_url.length) !== "?size=2048") {
        window.location.assign(new_url + "?size=2048");
    }
}