const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
  name: "ping", // Coloque o nome do comando
  description: "[🦅 Utilidade] Veja o ping do bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let ping = client.ws.ping;

    let embed_1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`calculando...\`.`)
    .setColor(config.embedcolor);

    let embed_2 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}ms\`.`)
    .setColor(config.embedcolor);

    interaction.reply({ embeds: [embed_1] , ephemeral : true }).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2], ephemeral : true })
        }, 2000)
    })
  }
}