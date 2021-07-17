// ==UserScript==
// @name           Twitter orig image
// @description    Redirects image from Twitter to its highest quality
// @version        0.1.0
// @match          https://pbs.twimg.com/media/*
// @run-at         document-start
// ==/UserScript==

let current_url = window.location.href;

if (current_url.match(/^https:\/\/pbs\.twimg\.com\/media\/[A-Za-z0-9_-]{15}\?format=(?:jpg|png)&name=.*$/) && current_url.split("=")[(current_url.split("=").length - 1)] !== "orig") {
    let new_url = current_url.match(/^https:\/\/pbs\.twimg\.com\/media\/[A-Za-z0-9_-]{15}\?format=(?:jpg|png)&name=/)[0] + "orig";
    window.location.assign(new_url);
}

if (current_url.match(/^https:\/\/pbs\.twimg\.com\/media\/[A-Za-z0-9_-]{15}.(?:jpg|png):.*$/) && current_url.split(":")[(current_url.split(":").length - 1)] !== "orig") {
    let new_url = current_url.match(/^https:\/\/pbs\.twimg\.com\/media\/[A-Za-z0-9_-]{15}.(?:jpg|png):/)[0] + "orig";
    window.location.assign(new_url);
}

if (current_url.match(/^https:\/\/pbs\.twimg\.com\/media\/[A-Za-z0-9_-]{15}.(?:jpg|png)$/) && current_url.split(":")[(current_url.split(":").length - 1)] !== "orig") {
    let new_url = current_url.match(/^https:\/\/pbs\.twimg\.com\/media\/[A-Za-z0-9_-]{15}.(?:jpg|png):/)[0] + "orig";
    window.location.assign(new_url);
}