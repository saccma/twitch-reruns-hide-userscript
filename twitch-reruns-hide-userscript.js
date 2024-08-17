// ==UserScript==
// @name         Twitch Rerun Transparency
// @namespace    Violentmonkey Scripts
//
// @version      0.2.0
//
// @description  Make Reruns from twitch live cards list transparent (works only on twitch.tv/directory/following and twitch.tv/directory/following/live)
// @homepage     https://github.com/saccma/twitch-reruns-hide-userscript
// @author       Dampyr
//
// @include      *://www.twitch.tv/*
//
// @grant        GM_getResourceText
// @resource     waitForKeyElements https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
//
// @comment      Based upon the work of Markus 'Ragowit' Persson, "Twitch Rerun Hider - https://greasyfork.org/it/scripts/40477-twitch-rerun-hider/code".
// ==/UserScript==

eval(GM_getResourceText("waitForKeyElements"));

waitForKeyElements("article", hideRerunLive, false);

function hideRerunLive(jNode) {
var title = jNode.querySelector("h3")?.textContent?.toLowerCase();
  if (!title) {
    return;
  }
  // Good streams, they tag it as a rerun
  var rerunTagEl = jNode.querySelector('[data-a-target="Rerun"]');
  if (rerunTagEl) {
    hideCard(jNode);
  } else {
  // Mediocre streams, they don't tag it right but at least type it in the title...
  var badWords = [
    "re-run",
    "rebroadcast",
    "recap",
    "rerun",
    "!rr",
    "rewatch",
    "𝓡𝓡",
    "𝙍𝙚𝙧𝙪𝙣",
    "not live"
  ];

  if (badWords.some(x => title.includes(x))) {
      hideCard(jNode);
    }
  }
}

function hideCard(node) {
    node.style.opacity = 0.15;
    node.style.background = "dimgray";
}
