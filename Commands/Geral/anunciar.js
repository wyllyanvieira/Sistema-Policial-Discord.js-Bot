const Discord = require("discord.js")
const config = require("../../config.json");

module.exports = {
  name: "anunciar", // Coloque o nome do comando
  description: "[👑 Moderação]  Anuncie algo em uma mensagem formal.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "título",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "descrição",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "chat",
        description: "Mencione um canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `❌ | Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let titulo = interaction.options.getString("título")
        let desc = interaction.options.getString("descrição")
        let chat = interaction.options.getChannel("chat")
        if (Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`❌ | Este canal não é um canal de texto para enviar uma mensagem.`)

        let embed = new Discord.EmbedBuilder()
        .setTitle(titulo)
        .setDescription(desc)
        .setColor(config.embedcolor);

        chat.send({  content: `${interaction.user}`, embeds: [embed] }).then( () => { 
            interaction.reply({ content: `✅ | Seu anúncio foi enviado em ${chat} com sucesso.`, ephemeral: true})
        }).catch( (e) => {
            interaction.reply({ content: `❌ | Algo deu errado verifique com desenvolvedor do BOT.`, ephemeral: true})
        })
    }

  }
}