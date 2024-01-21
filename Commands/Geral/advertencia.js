const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
    name: "advertencia", // Coloque o nome do comando
    description: "[👑 Moderação] Painel de comandos do sistema policial.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuario",
            description: "Mencione o Oficial Advertido",
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "motivo",
            description: "Escreva o Motivo da Advertencia",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "provas",
            description: "Forneça uma evidência para o aviso. Você pode enviar essas imagens para um site.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        },
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            let usuario2 = interaction.options.getUser("usuario");
            let target = interaction.guild.members.cache.get(usuario2.id)
            let reason = interaction.options.getString("motivo")
            let evidence = interaction.options.getString("provas") || "Nenhuma Prova Anexada"


            let embed_principal = new Discord.EmbedBuilder()
                .setColor(config.embedcolor)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
                .setDescription(`MTD Policia: Informe qual advertencia o oficial: ${target}, receber.`);

            // mensagem de anuncio da advertencia verba no usuario
            let embed_advv = new Discord.EmbedBuilder()
                .setColor(config.embedcolor)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
                .setDescription(`MTD Policia informa o Oficial  ${target}, recebeu uma : **Advertencia Verbal**`)
                .addFields(
                    { name: 'Oficial Advertido:', value: `${target}` },
                    { name: 'Motivo da Advertencia', value: `${reason}` },
                    { name: 'Provas', value: `${evidence}` },
                );
            // mensagem de anuncio da advertencia verba no usuario
            let embed_adv1 = new Discord.EmbedBuilder()
                .setColor(config.embedcolor)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
                .setDescription(`MTD Policia informa o Oficial  ${target}, recebeu uma :  **Advertencia 1/3**`)
                .addFields(
                    { name: 'Oficial Advertido:', value: `${target}` },
                    { name: 'Motivo da Advertencia', value: `${reason}` },
                    { name: 'Provas', value: `${evidence}` },
                );
            // mensagem de anuncio da advertencia verba no usuario
            let embed_adv2 = new Discord.EmbedBuilder()
                .setColor(config.embedcolor)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
                .setDescription(`MTD Policia informa o Oficial  ${target}, recebeu uma :  **Advertencia 2/3**`)
                .addFields(
                    { name: 'Oficial Advertido:', value: `${target}` },
                    { name: 'Motivo da Advertencia', value: `${reason}` },
                    { name: 'Provas', value: `${evidence}` },
                );

            let painel = new Discord.ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId("painelprincipal")
                    .setPlaceholder("Clique aqui!")
                    .addOptions(
                        {
                            label: "Advertencia Verbal",
                            description: "Aplique a advertencia verbal ao oficial.",
                            emoji: "🚫",
                            value: "advertenciav"
                        },
                        {
                            label: "Advertencia 1º",
                            description: "Aplique a advertencia 1/3 ao oficial.",
                            emoji: "🚫",
                            value: "advertencia1"
                        },
                        {
                            label: "Advertencia 2º",
                            description: "Aplique a advertencia 2/3 ao oficial.",
                            emoji: "🚫",
                            value: "advertencia2"
                        },
                    )
            )

            interaction.reply({ embeds: [embed_principal], components: [painel], ephemeral: true }).then(() => {
                interaction.channel.createMessageComponentCollector().on("collect", (c) => {
                    let valor = c.values[0];
                    let canallogadv = interaction.guild.channels.cache.get(config.ADVERTENCIAS.advertanciacanal);


                    if (valor === "advertenciav") {
                        if (!target.roles.cache.has(config.ADVERTENCIAS.cargoadv_verbal)) {
                            c.deferUpdate()
                            canallogadv.send({ embeds: [embed_advv] })
                            target.roles.add(config.ADVERTENCIAS.cargoadv_verbal);
                        } else {
                            interaction.channel.send({ content: `<:icons_Wrong75:1198037616956821515> | O Oficial ja possue essa advertencia!.`, ephemeral: true })
                        }
                    } else if (valor === "advertencia1") {
                        if (!target.roles.cache.has(config.ADVERTENCIAS.cargoadv_1)) {
                            c.deferUpdate()
                            canallogadv.send({ embeds: [embed_adv1] })
                            target.roles.add(config.ADVERTENCIAS.cargoadv_1);
                        } else {
                            interaction.channel.send({ content: `<:icons_Wrong75:1198037616956821515> | O Oficial ja possue essa advertencia!.`, ephemeral: true })
                        }
                    } else if (valor === "advertencia2") {
                        if (!target.roles.cache.has(config.ADVERTENCIAS.cargoadv_2)) {
                            c.deferUpdate()
                            canallogadv.send({ embeds: [embed_adv2] })
                            target.roles.add(config.ADVERTENCIAS.cargoadv_2);
                        } else {
                            interaction.channel.send({ content: `<:icons_Wrong75:1198037616956821515> | O Oficial ja possue essa advertencia!.`, ephemeral: true })
                        }
                    }
                })
            })



        }
    }
}