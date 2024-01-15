const Discord = require('discord.js')
const config = require("../../config.json")

module.exports = {
    name: 'clear',
    description: '[👑 Moderação] Limpe as mensagens de um chat.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let numero = interaction.options.getNumber('quantidade')

        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
            interaction.reply({ content: `:x: | Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else

        if (parseInt(numero) > 99 || parseInt(numero) <= 0) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setDescription(`> **Digite uma quantidade de** \`1 - 99\`**.**`)
                    .setColor(config.embedcolor)
                ], ephemeral: true
            })
        } else {

        interaction.channel.bulkDelete(parseInt(numero))

        let embed = new Discord.EmbedBuilder()
            .setDescription(`> ♻️ | Limpeza concluida`)
            .setTimestamp()
            .setFooter({ text: `Limpado por: ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) }) //utilizar npm i discord.js@latest
            .setColor(config.embedcolor)

        interaction.reply({ embeds: [embed] }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
        })

    }

    }
}