require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

let retorts = [
  "Get back to work, peasant.",
  "I am inevitable.",
  "You underestimate my power.",
  "Not enough mana.",
  "Pork chop sandwiches",
  "There can only be one sun in the sky."
];

let plankTime;

function itIsTime(channel) {
  const plankTime = setInterval(() => {
    const d = new Date();
    if (d.getHours() >= 11 && d.getHours() <= 18) {
      channel.send("It is Plank time.");
    }
  }, 1000 * 60 * 60);
  return plankTime;
}

client.on("ready", () => {
  const genChat = client.channels.get(process.env.CHANNEL);
  genChat.send("It is Plank time.");
  plankTime = itIsTime(genChat);
});

client.on("message", msg => {
  const genChat = client.channels.get(process.env.CHANNEL);

  if (msg.author.username !== "Plank Time") {
    const pattern = /plank *(\w*) *(.*)/i;
    const { content } = msg;
    const matched = content.match(pattern);
    if (matched) {
      const command = matched[1].toLowerCase();
      switch (command) {
        case "silence":
          msg.reply("Silenced.");
          plankTime = clearInterval(plankTime);
          break;
        case "summon":
          if (plankTime) {
            msg.reply("One of me is powerful enough for you.");
          } else {
            msg.reply("Summoned.");
            genChat.send("It is Plank time.");
            plankTime = itIsTime(genChat);
          }
          break;
        case "say":
          if (matched[2]) {
            retorts = [...retorts, matched[2]];
            msg.reply(matched[2]);
            msg.reply("My knowledge grows.");
          } else {
            msg.reply("Foolish mortal.");
          }
          break;
        default:
          const i = Math.floor(Math.random() * retorts.length);
          msg.reply(retorts[i]);
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
