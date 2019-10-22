const { RichEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const embed = new RichEmbed()
    .setColor("#0099ff")
    .setTitle("Commandes présentes")
    .addField(
      "!refresh",
      "Met à jour les taches chez le bot (Appel API Trello)"
    )
    .addField("!dueTime", "Présente tous les jalons du Trello")
    .addField("!getAll", "Récupère toutes les taches présentes")
    .addField(
      "!ping <task number>",
      "Ping les gens qui font la tache <task number>"
    )
    .addField(
      "!getTask <task number>",
      "Comme !ping <task number>, mais sans le tag des gens"
    );
  message.channel.send(embed);
};

module.exports.help = {
  name: "help"
};
