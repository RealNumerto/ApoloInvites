const Discord = require("discord.js");
const Database = require("../Helpers/Database");
// exports.onLoad = (client) => {};
/**
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("nemas permisiju da koristis tu komandu.");

    var victim = message.mentions.members.size > 0 ? message.mentions.members.first().id : args.length > 0 ? args[0] : undefined;
    if(!victim) return message.reply("Niste tagovali nikoga.");
    victim = message.guild.member(victim);
    if(!victim) return message.reply("Ta osoba nije na sevreru.");

    var num = Number(args[1]);
    if(isNaN(num)) return message.reply("Niste napisali validan broj.");
    const db = new Database("./Servers/" + message.guild.id, "Invites");

    var bonus = (db.sub(`invites.${victim.id}.bonus`, num) || 0), total = (db.get(`invites.${victim.id}.total`) || 0);
    message.reply(`${num} invajtova je uspesno uklonjeno ${victim}.`);

    global.onUpdateInvite(victim, message.guild.id, total + bonus);
};

exports.conf = {
    commands: ["removeinvites"],
    usage: "[p]removeinvites <member> <value>",
    enabled: true,
    guildOnly: true
};
