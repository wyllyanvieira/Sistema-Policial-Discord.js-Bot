const fs = require("fs")


module.exports = async (client) => {

const SlashsArray = []

  fs.readdir(`./Commands`, (error, folder) => {
  folder.forEach(subfolder => {
fs.readdir(`./Commands/${subfolder}/`, (error, files) => { 
  files.forEach(files => {
      
  if(!files?.endsWith('.js')) return;
  files = require(`../Commands/${subfolder}/${files}`);
  if(!files?.name) return;
  client.slashCommands.set(files?.name, files);
   
  SlashsArray.push(files)
  });
    });
  });
});
  client.on("ready", async () => {
  client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray))
    });
};

