// ==UserScript==
// @name           Bandcamp volume control
// @description    Adds volume control in Bandcamp
// @version        0.1.0
// @match          https://*.bandcamp.com/*
// @run-at         document-idle
// ==/UserScript==

let volume_control = document.createElement("div");
volume_control.id = "volume_control";
volume_control.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 0px 10px 0px;
`;

let bandcamp_player = document.getElementsByClassName("inline_player")[0];
bandcamp_player.parentNode.insertBefore(volume_control, bandcamp_player.nextSibling);
volume_control.innerHTML = `
    <div>Volume:</div>
    <input id="volume_slider" type="range" min="0" value="50" max="100" step="1">
    <input id="mute_button" type="button" value="Mute">
`;


let bandcamp_audio = document.getElementsByTagName("audio");
let volume_slider = document.getElementById("volume_slider");
let mute_button = document.getElementById("mute_button");

mute_button.style.width = "80px";
volume_slider.value = bandcamp_audio[0].volume * 100;

function mute_audio() {
    for (var i = 0; i < bandcamp_audio.length; i++) {
        bandcamp_audio[i].muted = true;
    }
    mute_button.value = "Unmute";
}

function unmute_audio() {
    for (var i = 0; i < bandcamp_audio.length; i++) {
        bandcamp_audio[i].muted = false;
    }
    mute_button.value = "Mute";
}

volume_slider.oninput = function () {
    if (bandcamp_audio[0].muted === true) {
        unmute_audio();
    }
    for (var i = 0; i < bandcamp_audio.length; i++) {
        bandcamp_audio[i].volume = parseInt(volume_slider.value) / 100;
    }
};

mute_button.onclick = function () {
    if (bandcamp_audio[0].muted === true) {
        unmute_audio();
    }
    else if (bandcamp_audio[0].muted === false) {
        mute_audio();
    }
};