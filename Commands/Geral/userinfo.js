const { EmbedBuilder, ApplicationCommand, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const axios = require('axios');
const config = require("../../config.json")

module.exports = {
    name: 'user',
    description: '[📚 Informação] Veja informações sobre um usuário',
    options: [
            {
                name: 'info',
                description: '[📚 Informação] Veja informações sobre um usuário',
                type: ApplicationCommandOptionType.Subcommand,
                options: [{
                    name: 'user',
                    description: 'Selecione um usuário, ou envie um ID',
                    type: ApplicationCommandOptionType.User,
                    required: false
                }],
            },
            {
                name: 'avatar',
                description: '[📚 Informação] Veja o avatar de um usuário',
                type: ApplicationCommandOptionType.Subcommand,
                options: [{
                    name: 'user',
                    description: 'Selecione um usuário, ou envie um ID',
                    type: ApplicationCommandOptionType.User,
                    required: false
                }]
            },
            {
                name: 'banner',
                description: '[📚 Informação] Veja o banner de um usuário',
                type: ApplicationCommandOptionType.Subcommand,
                options: [{
                    name: 'user',
                    description: 'Selecione um usuário, ou envie um ID',
                    type: ApplicationCommandOptionType.User,
                    required: false
                }]
            }
    ],
    run: async(client, interaction) => {
        switch (interaction.options.getSubcommand()) {
            case 'info': {
                let userInfo = interaction.options.getUser('user') || interaction.user;
                let InfoAvatar = userInfo.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })
                let data = userInfo.createdAt.toLocaleDateString("pt-br");

                let embedInfo = new EmbedBuilder()
                    .setColor(config.embedcolor)
                    .setAuthor({ name: `${userInfo.username}`, iconURL: userInfo.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(InfoAvatar)
                    .setFields(
                        {
                            name: '<:user:1048987512493850634> Tag',
                            value: `\`${userInfo.tag}\``,
                            inline: true
                        },
                        {
                            name: '🆔 ID',
                            value: `\`${userInfo.id}\``,
                            inline: true
                        },
                        {
                            name: '🗓️ Data de criação da conta',
                            value: `\`${data}\``,
                            inline: false
                        }
                    );

                    interaction.reply({ embeds: [embedInfo] });

                

                break;
            }
            case 'avatar': {

                let userAvatar = interaction.options.getUser('user') || interaction.user;
                let AvatarUser = userAvatar.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })

                let EmbedAvatar = new EmbedBuilder()
                    .setColor(config.embedcolor)
                    .setTitle(`🖼 ${userAvatar.username}`)
                    .setFooter({ text: 'Apesar de tudo, ainda é você.'})
                    .setImage(AvatarUser);

                let ButtonAvatar = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Abrir imagem no navegador')
                    .setURL(AvatarUser)
                );

                interaction.reply({ embeds: [EmbedAvatar] });

                break;
            }
            case 'banner': {

                let userBanner = interaction.options.getUser('user') || interaction.user;

                axios
                    .get(`https://discord.com/api/users/${userBanner.id}`, {
                        headers: {
                            Authorization: `Bot ${client.token}`,
                        },
                    })
                    .then((res) => {
                        const { banner } = res.data;

                        if (banner) {
                            const extension = banner.startsWith("a_") ? '.gif?size=4096' : '.png?size=4096';
                            const url = `https://cdn.discordapp.com/banners/${userBanner.id}/${banner}${extension}`;

                            let embedBanner = new EmbedBuilder()
                            .setColor(config.embedcolor)
                            .setTitle(`🖼 ${userBanner.username}`)
                            .setImage(url);

                            const buttonBanner = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                .setStyle(ButtonStyle.Link)
                                .setURL(url)
                                .setLabel('Abrir no navegador')
                            )

                            interaction.reply({ embeds: [embedBanner], components: [buttonBanner] })
                        } else { interaction.reply({ content: `:x: | ${userBanner} não tem um banner no perfil! Talvez ele não tenha Discord Nitro... Ou talvez ele só teve muita preguiça de colocar um banner bonitinho.`, ephemeral: true }) }
                    })
            }
        }

    }
}