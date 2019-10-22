let shell = require("shelljs");
let path = require("path");
let cmdPath = path.join(__dirname, "getListTrello.sh");

module.exports.run = (client, message, args) => {
  if (shell.exec("bash " + cmdPath).code === 0) {
    message.channel.send("Done");
  } else {
    message.channel.send("Error");
  }
};

module.exports.help = {
  name: "refresh"
};
