// ==UserScript==
// @name           HQ image redirect
// @description    Redirects image url to its highest quality
// @version        0.1.0
// @match          https://pbs.twimg.com/media/*
// @match          https://media.discordapp.net/attachments/*
// @match          https://cdn.discordapp.com/avatars/*
// @match          https://cdn.discordapp.com/guilds/*/users/*/avatars/*
// @match          https://static-cdn.jtvnw.net/jtv_user_pictures/*
// @run-at         document-start
// ==/UserScript==


// Twitter
let current_url = window.location.href;
let twitter_image_regex = /^https:\/\/pbs\.twimg\.com\/media\/[A-Za-z0-9_-]{15}(?:\.|\?format=)(?:jpg|png)/;

if (current_url.slice(-4) !== "orig" && twitter_image_regex.test(current_url) === true) {
    if (current_url[43] === "?") {
        window.location.assign(current_url.match(twitter_image_regex)[0] + "&name=orig");
    } else {
        window.location.assign(current_url.match(twitter_image_regex)[0] + ":orig");
    }
}


// Discord
let discord_attachment_regex = /^https:\/\/(?:media\.discordapp\.net|cdn\.discordapp\.com)\/attachments\/\d*\/\d*\/\S*\.(?:jpg|png|gif)\?\S*?(?:width|height)=/;
let discord_avatar_regex = /^https:\/\/cdn\.discordapp\.com\/(?:avatars\/\d*|guilds\/\d*\/users\/\d*\/avatars)\/\S*\.(?:webp|gif)/;

if (discord_attachment_regex.test(current_url) === true) {
    let new_url = current_url.match(discord_attachment_regex)[0];
    if (current_url.length > new_url.length) {
        window.location.assign(new_url);
    }
}
if (discord_avatar_regex.test(current_url) === true) {
    let new_url = current_url.match(discord_avatar_regex)[0];
    if (current_url.slice(new_url.length) !== "?size=4096") {
        window.location.assign(new_url + "?size=4096");
    }
}


// Twitch
let twitch_avatar_regex = /^https:\/\/static-cdn\.jtvnw\.net\/jtv_user_pictures\/[a-z0-9-]*-profile_image(?:-[a-z0-9]{16}|)-/;

if (twitch_avatar_regex.test(current_url) === true) {
    let new_url = current_url.match(twitch_avatar_regex)[0];
    let image_ext = "." + current_url.split(".").slice(-1)[0];
    if (current_url.slice(new_url.length, current_url.length - image_ext.length) !== "600x600") {
        window.location.assign(new_url + "600x600" + image_ext);
    }
}