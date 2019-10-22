let fs = require("fs");
let path = require("path");
const { RichEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let jsonPath = path.join(__dirname, "..", "tmp", "listIdCard.json");
  let rawdata = fs.readFileSync(jsonPath);
  let student = JSON.parse(rawdata);

  const embed = new RichEmbed()
    .setColor("#0099ff")
    .setTitle("Toutes les taches");
  let i = 0;
  student.forEach(element => {
    element.forEach(elt => {
      embed.addField(`Tache ${i++}`, elt.name);
    });
  });
  message.channel.send(embed);
};

module.exports.help = {
  name: "getAll"
};
