"use strict";

function updateFlairs() {
  // manually escape ':' because encodeURI does not
  const flairSelector = `shreddit-post-flair:has(a[href="/r/Silksong/?f=${encodeURIComponent(`flair_name:"${SILKPOST_FLAIR.name}"`)}"]):not([x-silkpost-flair])`;

  const flairs = document.querySelectorAll(flairSelector);

  for (const flair of flairs) {
    const title = getPostTitle(flair);

    let targetFlair = SILKPOST_FLAIR;

    if (title) {
      targetFlair = TARGET_FLAIRS.choose(cyrb53(title));

      if (targetFlair === SILKPOST_FLAIR) {
        flair.setAttribute("x-silkpost-flair", "");
      }
    }
    
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

// Nullable
function getPostTitle(flairElem) {
  const postId = flairElem.getAttribute("post-id");
  let elem = document.getElementById(`post-title-${postId}`)

  return elem?.textContent?.trim();
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

let feedObserver = new MutationObserver(updateFlairs);
const appObserver = new MutationObserver(() => {
  updateFlairs();

  // Instantiate a new one every app changes because feed is app's descendent
  feedObserver.disconnect();
  feedObserver = new MutationObserver(updateFlairs);
  
  // Feed does not exist in search, but shreddit-app updates in this scenario
  // Update flair on infinite scrolling feed
  const feed = document.querySelector("shreddit-feed");
  
  if (feed) {
    feedObserver.observe(feed, {
      childList: true,
      // subtree: true,
    });
  }
});

// Update flair on various SPA change
appObserver.observe(document.querySelector("shreddit-app"), {
  childList: true,
  attributes: true,
});