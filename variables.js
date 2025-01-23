"use strict";

function Flair(name, color) {
  this.name = name;
  this.color = color;
}

const SILKPOST_FLAIR = new Flair(":troll:Silkpost", "#FF4500");

const TARGET_FLAIRS = [
  SILKPOST_FLAIR,
  new Flair(":scream-hornet:Silksong hype!", "#EA0027"),
  new Flair(":clown:Silksong News!", "#FFD635"),
  new Flair("Datamined/Leaked Content:clown:", "#FFD635"),
  new Flair("Kinda news:chad-hornet:", "#FFB000"),
  // new Flair(":angy:Discussion/Questions", "#0079D3"),
];

TARGET_FLAIRS.choose = (digest) => {
  const dice = digest % 100;
  console.log(dice);

  if (dice < 10) {
    return TARGET_FLAIRS[0]
  }
  else if (dice < 60) {
    return TARGET_FLAIRS[1];
  } else if (dice < 85) {
    return TARGET_FLAIRS[2];
  } else if (dice < 95) {
    return TARGET_FLAIRS[3];
  } else {
    return TARGET_FLAIRS[4];
  }
}

// TODO Check if emojis' URIs change the other day.
const EMOJIS = new Map();
EMOJIS.set("scream-hornet", "https://emoji.redditmedia.com/1a4og3ejz8kb1_t5_4viev2/scream-hornet");
EMOJIS.set("angy", "https://emoji.redditmedia.com/nzujdvrwz8kb1_t5_4viev2/angy");
EMOJIS.set("clown", "https://emoji.redditmedia.com/fc7ip9dqz8kb1_t5_4viev2/clown")
EMOJIS.set("chad-hornet", "https://emoji.redditmedia.com/5804v8gyz8kb1_t5_4viev2/chad-hornet");
EMOJIS.set("troll", "https://emoji.redditmedia.com/mngg5jtrxdkb1_t5_4viev2/troll");