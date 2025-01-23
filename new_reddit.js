"use strict";

function updateFlairs() {
  // manually escape ':' because encodeURI does not
  const flairSelector = `shreddit-post-flair:has(a[href="/r/Silksong/?f=${encodeURIComponent(`flair_name:"${SILKPOST_FLAIR.name}"`)}"])`;
  console.log(flairSelector);

  const flairs = document.querySelectorAll(flairSelector);

  for (const flair of flairs) {
    const targetFlair = TARGET_FLAIRS.choose(cyrb53(getPostTitle(flair).trim()));

    const a = flair.querySelector("a");
    a.href = `/r/Silksong/?f=${encodeURIComponent(`flair_name:"${targetFlair.name}"`)}`;

    a.querySelector("span").style.backgroundColor = targetFlair.color;
    const container = a.querySelector(".flair-content > div");
    container.textContent = "";
    buildContent(container, targetFlair.name);
  }
}

function buildContent(parent, content) {
  const matches = content.matchAll(/:(.*?):/g);

  let startIndex = 0;
  
  for (const match of matches) {
    parent.append(content.slice(startIndex, match.index));
    parent.appendChild(getFaceplateImg(match[1]));

    startIndex = match.index + match[0].length;
  }
  
  parent.append(content.slice(startIndex));
}

function getPostTitle(flairElem) {
  let elem = flairElem.parentElement.querySelector("[aria-describedby]");
  return elem.textContent;
}

function getFaceplateImg(emoji) {
  const elem = document.createElement("faceplate-img");
  elem.classList = "flair-image object-contain";
  elem.setAttribute("loading", "lazy");
  elem.setAttribute("width", "16");
  elem.setAttribute("height", "16");
  elem.setAttribute("src", EMOJIS.get(emoji));
  elem.setAttribute("alt", `emoji:${emoji}:`);

  return elem;
}

updateFlairs();

const observer = new MutationObserver(updateFlairs);


// Feed does not exist in search, but shreddit-app updates in this scenario
try {
  // Update flair on infinite scrolling feed
  observer.observe(document.querySelector("shreddit-feed"), {
    childList: true,
  });
} catch (e) {

}

// Update flair on various SPA change
observer.observe(document.querySelector("shreddit-app"), {
  childList: true,
  attributes: true,
  attributeFilter: [ "referrer" ],
});