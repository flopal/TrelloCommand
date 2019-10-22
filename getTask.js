let fs = require("fs");
let path = require("path");
const { RichEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  if (args.length !== 1) {
    message.channel.send(
      `${message.author} : !getTask <number>\nSee : !getAll`
    );
    return;
  }
  let id = args[0];
  let jsonPath = path.join(__dirname, "..", "tmp", "listIdCard.json");
  let rawdata = fs.readFileSync(jsonPath);
  let student = JSON.parse(rawdata);
  let i = 0;
  const embed = new RichEmbed().setColor("#0099ff").setTitle("Tache associé");

  student.forEach(element => {
    element.forEach(elt => {
      if (i == id) {
        embed.addField(`Tache ${id}`, elt.name);
        i = -1;
      }
      if (i == -1) {
        return;
      }
      i++;
    });
  });

  message.channel.send(embed);
};

module.exports.help = {
  name: "getTask"
};
