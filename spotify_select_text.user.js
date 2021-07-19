// ==UserScript==
// @name           Select text in Web Spotify
// @description    Removes restriction to select text in Web version of Spotify
// @version        0.1.0
// @match          https://open.spotify.com/*
// @run-at         document-end
// ==/UserScript==

let style = document.createElement("style");
style.innerHTML = `
    * {
        user-select: auto !important;
        -moz-user-select: auto !important;
        -webkit-user-select: auto !important;
        -ms-user-select: auto !important;
    }
`;
document.head.appendChild(style);