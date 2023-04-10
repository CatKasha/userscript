// ==UserScript==
// @name           Twitter orig image
// @description    Redirects image from Twitter to its highest quality
// @version        0.2.0
// @match          https://pbs.twimg.com/media/*
// @run-at         document-start
// ==/UserScript==

let current_url = window.location.href;
let image_url_regex = /^https:\/\/pbs\.twimg\.com\/media\/[A-Za-z0-9_-]{15}(?:\?format=(?:jpg|png)|\.(?:jpg|png))/;
let new_url = "";

if (current_url.slice(-4) !== "orig" && image_url_regex.test(current_url) === true) {
    if (current_url[43] === "?") {
        new_url = current_url.match(image_url_regex)[0] + "&name=orig";
    } else {
        new_url = current_url.match(image_url_regex)[0] + ":orig";
    }

    window.location.assign(new_url);
}