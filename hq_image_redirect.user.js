// ==UserScript==
// @name           HQ image redirect
// @description    Redirects image url to its highest quality
// @version        0.2.1
// @match          https://pbs.twimg.com/media/*
// @match          https://media.discordapp.net/attachments/*
// @match          https://cdn.discordapp.com/attachments/*
// @match          https://cdn.discordapp.com/avatars/*
// @match          https://cdn.discordapp.com/guilds/*/users/*/avatars/*
// @match          https://static-cdn.jtvnw.net/jtv_user_pictures/*
// @run-at         document-start
// ==/UserScript==

let current_url = window.location.href;
let match_result = null;


// Twitter
if (current_url.startsWith("https://pbs.twimg.com/media/")) {
    let twitter_image_regex = /^https:\/\/pbs\.twimg\.com\/media\/[A-Za-z0-9_-]{15}(?:\.|\?format=)(?:jpg|png)/;

    match_result = current_url.match(twitter_image_regex);
    if (match_result !== null && current_url.slice(-4) !== "orig") {
        if (current_url[43] === "?") {
            window.location.assign(match_result[0] + "&name=orig");
        } else {
            window.location.assign(match_result[0] + ":orig");
        }
    }
}


// Discord
if (current_url.startsWith("https://media.discordapp.net/") || current_url.startsWith("https://cdn.discordapp.com/")) {
    let discord_attachment_regex = /^https:\/\/(?:media\.discordapp\.net|cdn\.discordapp\.com)\/attachments\/\d+\/\d+\/\S+\.(?:jpg|png|gif)\?ex=\S+&is=\S+&hm=\S{64}&/;
    let discord_avatar_regex = /^https:\/\/cdn\.discordapp\.com\/(?:avatars\/\d*|guilds\/\d*\/users\/\d*\/avatars)\/\S*\.(?:webp|gif)/;

    match_result = current_url.match(discord_attachment_regex);
    if (match_result !== null && current_url !== match_result[0]) {
        window.location.assign(match_result[0]);
    }

    match_result = current_url.match(discord_avatar_regex);
    if (match_result !== null && current_url.slice(-10) !== "?size=4096") {
        window.location.assign(match_result[0] + "?size=4096");
    }
}


// Twitch
if (current_url.startsWith("https://static-cdn.jtvnw.net/jtv_user_pictures/")) {
    let twitch_avatar_regex = /^https:\/\/static-cdn\.jtvnw\.net\/jtv_user_pictures\/[a-z0-9-]*-profile_image(?:-[a-z0-9]{16}|)-/;

    match_result = current_url.match(twitch_avatar_regex);
    if (match_result !== null) {
        let image_ext = "." + current_url.split(".").slice(-1)[0];
        if (current_url.slice(match_result[0].length, current_url.length - image_ext.length) !== "600x600") {
            window.location.assign(match_result[0] + "600x600" + image_ext);
        }
    }
}