// ==UserScript==
// @name         Twitch Rerun Transparency
// @namespace    Violentmonkey Scripts
// @version      0.0.1
// @description  Make Reruns from twitch live cards list transparent (works only on twitch.tv/directory/following and twitch.tv/directory/following/live)
// @author       DampyrDamp
// @include      *://www.twitch.tv/*
// @grant        GM_getResourceText
// @resource     waitForKeyElements https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// @comment      Based upon the work of Markus 'Ragowit' Persson, "Twitch Rerun Hider - https://greasyfork.org/it/scripts/40477-twitch-rerun-hider/code".
// ==/UserScript==

// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js


eval(GM_getResourceText("waitForKeyElements"));

waitForKeyElements('[data-a-target="Rerun"]', hideRerun);
waitForKeyElements(".live-channel-card", hideRerunLive);

function hideRerun(jNode) {
  console.log("hideRerun - jNode =", jNode);
  // Good streams, they tag it as a rerun
  // jNode.closest(".live-channel-card").cssText = "opacity: 0.15, background-color: dimgray";
  jNode.closest(".live-channel-card").style.opacity = 0.15;
  jNode.closest(".live-channel-card").style.background = "dimgray";

  // $(jNode).parents(".live-channel-card").css({ 'opacity' : 0.15, 'background-color': 'dimgray' });
}

function hideRerunLive(jNode) {
  console.log("hideRerunLive - jNode =", jNode);
  // Mediocre streams, they don't tag it right but at least type it in the title...
  var title = jNode.querySelector("h3").textContent.toLowerCase();

  //var title = $(jNode).find("h3").text().toLowerCase();


  var badWords = [
    "re-run",
    "rebroadcast",
    "recap",
    "rerun",
    " rr",
    "rr ",
    "!rr",
    "rewatch",
    "𝓡𝓡",
    "𝙍𝙚𝙧𝙪𝙣",
    "not live"
  ];

  if (badWords.some(x => title.includes(x))) {
    // jNode.cssText = "opacity: 0.15, background-color: dimgray";
    jNode.style.opacity = 0.15;
    jNode.style.background = "dimgray";
    console.log("title, jNode", title, jNode);

   // $(jNode).css({ 'opacity' : 0.15, 'background-color': 'dimgray' });
  }
}

