const discordTranscripts = require("discord-html-transcripts");
const config = require("../config.json"); // Substitua pelo caminho real do seu arquivo de configuração
const Discord = require("discord.js");

module.exports = async (client, interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId.includes('fechar_ticket')) {
            interaction.deferUpdate()
            if (interaction.member.roles.cache.has(config.TICKET.cargo)) {

                const embedLogs = new Discord.EmbedBuilder()
                    .setAuthor({ name: `${interaction.guild.name} | Ticket`, iconURL: `${client.user.displayAvatarURL()}` })
                    .addFields(
                )
                    .setColor(config.embedcolor)

                let messages = []

                let channellogs = interaction.guild.channels.cache.get(config.TICKET.ticketlogs)

                interaction.channel.messages.fetch().then(async msgs => {
                    msgs.forEach((msg) => {
                        messages.push(`${msg.author.username}: ${msg.content}`)
                    })

                    const attachment = await discordTranscripts.createTranscript(interaction.channel);

                    embedLogs.addFields(
                        { name: 'Fechou:', value: `${interaction.user.username}`, inline: true },
                        { name: 'Ticket:', value: `${interaction.channel.name}`, inline: true },
                    )

                    channellogs.send({ embeds: [embedLogs], files: [attachment] })
                    interaction.channel.send({ content: `<:refresh:1197986033594269778> | Ação Solicitada! este ticket será excluído em 5 segundos...` })

                    setTimeout(() => {
                        try {
                            interaction.channel.delete()
                        } catch (e) {
                            return;
                        }
                    }, 5000)
                });
            }
        }
    }

};
