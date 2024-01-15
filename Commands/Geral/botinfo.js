const Discord = require('discord.js')
const config = require("../../config.json")

module.exports = {
    name: "botinfo",
    description: '[🦅 Utilidade] Veja info sobre mim.',

    run: async (client, interaction) => {


        const botcor = interaction.guild.members.cache.get(client.user.id)
        const up = Math.floor(client.uptime / 60000) % 60;


        const botembed = new Discord.EmbedBuilder()
            .setTitle(client.user.username)
            .setDescription(`*Veja as minhas informações abaixo!*`)
            .setColor(config.embedcolor)
            .addFields(
                {name: `Developer:`, value: `<@496079437511524352>`, inline: true},
                {name: `Nome:`, value: `${client.user.username}`, inline: true},
                {name: `Id:`, value: `${client.user.id}`, inline: true},
                {name: `Usuarios:`, value: `${client.guilds.cache.size}`, inline: true },
                {name: `Canais:`, value: `${client.channels.cache.size}`, inline: true},
                {name: `Linguagem:`, value: `Java Script / Node.js / Discord.js`, inline: true},
                {name: `Ping:`, value: `${client.ws.ping}ms de ping`, inline: true },
                {name: `Ram:`, value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB'}`, inline: true},
                {name: `Uptime:`, value: `${up} Minutos`, inline: true })
             .setThumbnail(client.user.displayAvatarURL())

            interaction.reply({ embeds: [botembed],  content: `${interaction.user}`})
      
    }
} 