let fs = require("fs");
let path = require("path");
const { RichEmbed } = require("discord.js");

let idUserDiscord = {
  "5b8e39a2303f3d4892e9a094": "Eliot",
  "5d8c63b3e9d3b840b8c079ea": "Barazok",
  "5d8c66d270ace28cee1721ce": "florent_pal",
  "5d8c6cc643860d8e1ba39ce4": "Anou",
  "59b9c2c19ca9f90411ee8b71": "Arcanne"
};

module.exports.run = (client, message, args) => {
  if (args.length !== 1) {
    message.channel.send(
      `${message.author} : !ping <number task> \nSee : !getAll`
    );
    return;
  }
  let id = args[0];
  let jsonPath = path.join(__dirname, "..", "tmp", "listIdCard.json");
  let rawdata = fs.readFileSync(jsonPath);
  let student = JSON.parse(rawdata);

  let i = 0;
  const embed = new RichEmbed()
    .setColor("#0099ff")
    .setTitle("Ping de la tache");
  student.forEach(element => {
    element.forEach(elt => {
      if (i == id) {
        embed.addField(`Tache ${id}`, elt.name);
        for (let j = 0; j < elt.idMembers.length; j++) {
          embed.addField(
            `PING`,
            client.users.find(
              m => m.username == idUserDiscord[elt.idMembers[j]]
            )
          );
        }
        i = -1;
      }
      if (i == -1){
        return;
      }
      i++;
    });
  });
  message.channel.send(embed);
};

module.exports.help = {
  name: "ping"
};
