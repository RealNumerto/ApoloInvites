const Discord = require("discord.js");
const fs = require("fs");
const Settings = global.Settings = require("./Settings/Settings.json");

console.log("Launching bot...");
let _client = new Discord.Client();
if (Settings.Private_Server === true) {
    _client = new Discord.Client({
        fetchAllMembers: true
    });
}
const client = global.client = _client;
const Commands = global.Commands = new Map();

console.log("--------------------------------");
console.log("Loading commands...");
fs.readdirSync("./Commands", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`./Commands/${file}`);
    if (prop.conf.commands == undefined || prop.run == undefined) return console.error(`[COMMAND] ${file} is not load.`);
    if (prop.conf.commands && prop.conf.commands.length > 0) {
        prop.conf.commands.forEach(aliase => Commands.set(aliase, prop));
    }
    if (prop.onLoad != undefined && typeof (prop.onLoad) == "function") prop.onLoad(client);
    console.log(`[COMMAND] A total of ${prop.conf.commands.length} supporters have been installed for ${file}.`);
});
console.log("--------------------------------");
console.log("Loading events...");
fs.readdirSync("./Events", { encoding: "utf-8" }).filter(file => file.endsWith(".js")).forEach(file => {
    let prop = require(`./Events/${file}`);
    client.on(prop.conf.event, prop.execute);
    console.log(`[EVENT] ${file} is loaded.`);
});

console.log("--------------------------------");
console.log("| Preparation has been completed. Starting the bot now |");

require("./bot.js");

const Dlang = require('discordbot-script')
const discordScript = require("discordbot-script")
const bot = new discordScript({
  token: process.env.TOKEN,
  prefix: ["+"]
});

bot.Status({
        0: {
            description: "👑Apolo Kingdom™👑 | +help", 
            type: "WATCHING" 
        }
    }, 13000)

bot.MessageEvent()
bot.MessageEditEvent()

bot.Command({
  name: "help",
  code: `
  $title[Help]
  $footer[Da dobijete pomoc za +config kuracjte +help config]
  $description[
  $addField[Admin;\`+config\` **|** \`+removeinvites\` **|** \`+addinvites\`]
  $addField[General;\`+leaderboard\` **|** \`+invites\`]]
  $onlyIf[$message[1]!=config;{execute:config}]
  `
})

bot.ExecutableCommand({
  name: "config",
  code: `
  $title[Help Config]
  $description[Config ima dosta opcija:
  \`+config channel <channelID>\` - Da setujete welcome/leave channel (Ne moze se iskljuciti Leave Message!!!).
  \`+config welcomeMessage <text>\` - Da vidite ponudjene opcije za textove kucajte: \`+help config text\`.
  \`+config leaveMessage <text>\` - Da vidite ponudjene opcije za textove kucajte: \`+help config text\`.
  \`+config defaultMessage\` - Komanda sa kojom stavite da bot salje obicnu Welcome Message (Na engleskom).]
  $onlyIf[$message[2]!=text;{execute:text}]
  $onlyPerms[admin;]
  `
})

bot.ExecutableCommand({
  name: "text",
  code: `
  $title[Help Welcome Message]
  $description[Ponudjene funkcije za Welcome i Leave Message su:
  \`-member-\`: Taguje novog clana u poruci.
  \`-target-\`: Napise ko je pozvao novog clana. Primer: <@452811602723471390> je usao na server. Pozvan od strane Numerto#2542 .
  \`-total-\`: Broj invajtova osobe koja je pozvala novog clana sa dodanim invajtovima.
  \`-regular-\`: Broj invajtova osobe koja je pozvala novog clana bez dodanih invajtova.
  \`-fakecount-\`: Broj fake invajtova osobe koja je pozvala novog clana.
  \`-fake-\`: Pokazije da li je novi clan fake user ili ne.]
  $onlyPerms[admin;]
  `
})

/*

MIT License



Copyright (c) 2020 Serendia Squad



Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN */
