let fs = require("fs");
let path = require("path");
const { RichEmbed } = require("discord.js");

let jsonPath = path.join(__dirname, "..", "tmp", "listIdCard.json");

function dateDiff(date1, date2) {
  var diff = {}; // Initialisation du retour
  var tmp = date2 - date1;

  tmp = Math.floor(tmp / 1000); // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60; // Extraction du nombre de secondes

  tmp = Math.floor((tmp - diff.sec) / 60); // Nombre de minutes (partie entière)
  diff.min = tmp % 60; // Extraction du nombre de minutes

  tmp = Math.floor((tmp - diff.min) / 60); // Nombre d'heures (entières)
  diff.hour = tmp % 24; // Extraction du nombre d'heures

  tmp = Math.floor((tmp - diff.hour) / 24); // Nombre de jours restants
  diff.day = tmp;

  return diff;
}

module.exports.run = (client, message, args) => {
  let rawdata = fs.readFileSync(jsonPath);
  let student = JSON.parse(rawdata);
  let start = new Date();

  const embed = new RichEmbed().setColor("#0099ff").setTitle("Jalons restants");
  student.forEach(element => {
    element.forEach(elt => {
      if (elt.due != null) {
        let end = new Date(elt.due);
        let diff = dateDiff(start, end);
        if (diff.day <= 0 && diff.hour <= 0 && diff.min <= 0 && diff.sec <= 0) {
          return;
        }
        embed.addField(
          elt.name + " reste :",
          diff.day +
            "j " +
            diff.hour +
            "h " +
            diff.min +
            "min " +
            diff.sec +
            "sec ",
          true
        );
      }
    });
  });
  message.channel.send(embed);
};
module.exports.help = {
  name: "dueTime"
};
