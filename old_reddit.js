"use strict";

function updateFlairs() {
  const flairs = document.querySelectorAll(".linkflairlabel");

  for (const flair of flairs) {
    if (!flair.querySelectorAll("span").values().some((span) => {
      return span.textContent === "Silkpost";
    })) {
      continue;
    }

    const targetFlair = TARGET_FLAIRS.choose(cyrb53(getPostTitle(flair).trim()));
    buildFlairFrom(flair, targetFlair);
  }
}

function buildFlairFrom(elem, flair) {
  elem.style.backgroundColor = flair.color;
  elem.style.borderColor = flair.color;
  elem.textContent = "";

  const matches = flair.name.matchAll(/:(.*?):/g);
  let startIndex = 0;
  
  for (const match of matches) {
    let text = flair.name.slice(startIndex, match.index);

    if (text) {
      elem.appendChild(buildText(text));
    }

    elem.appendChild(buildEmoji(match[1]));

    startIndex = match.index + match[0].length;
  }
  
  let text = flair.name.slice(startIndex);
    
  if (text) {
    elem.appendChild(buildText(text));
  }
}

function getPostTitle(flairElem) {
  const elem = flairElem.parentElement.querySelector("a");

  return elem.textContent;
}

function buildEmoji(emoji) {
  const span = document.createElement("span");
  span.classList = "flairemoji";
  span.title = `:${emoji}:`
  span.style.backgroundImage = `url(${EMOJIS.get(emoji)})`;

  return span;
}

function buildText(text) {
  const span = document.createElement("span");
  span.textContent = text;

  return span;
}

updateFlairs();