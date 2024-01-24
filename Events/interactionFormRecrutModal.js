const Discord = require("discord.js");
const config = require("../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB({ table: "staff" });

module.exports = async (client, interaction) => {

    if (interaction.isButton() && interaction.customId === "formulario_staff") {
        const modal = new Discord.ModalBuilder()
            .setCustomId("modal_staff")
            .setTitle(`FORMULARIO RECRUTAMENTO`);

        const nome = new Discord.TextInputBuilder()
            .setCustomId('nome')
            .setLabel('Qual é o seu nome?')
            .setPlaceholder('Escreva aqui.')
            .setStyle(Discord.TextInputStyle.Short)
        const idade = new Discord.TextInputBuilder()
            .setCustomId('idade')
            .setLabel('Qual sua idade?')
            .setPlaceholder('Escreva aqui.')
            .setStyle(Discord.TextInputStyle.Short)
        const pqdevemosteaceitar = new Discord.TextInputBuilder()
            .setCustomId('pqdevemosteaceitar')
            .setLabel('Por que Deseja Entrar para nossa corporação?')
            .setPlaceholder('Escreva aqui?')
            .setStyle(Discord.TextInputStyle.Paragraph)
        const regrasrp = new Discord.TextInputBuilder()
            .setCustomId('regrasrp')
            .setLabel('Cite-nos duas regras de roleplay importantes?')
            .setPlaceholder('Escreva aqui.')
            .setStyle(Discord.TextInputStyle.Paragraph)
        const hierarquia = new Discord.TextInputBuilder()
            .setCustomId('hierarquia')
            .setLabel('Nos explique o que é hierarquia?')
            .setPlaceholder('Escreva aqui.')
            .setStyle(Discord.TextInputStyle.Paragraph)

        modal.addComponents(
            new Discord.ActionRowBuilder().addComponents(nome),
            new Discord.ActionRowBuilder().addComponents(idade),
            new Discord.ActionRowBuilder().addComponents(pqdevemosteaceitar),
            new Discord.ActionRowBuilder().addComponents(hierarquia),
            new Discord.ActionRowBuilder().addComponents(regrasrp)
        );
        return interaction.showModal(modal);
    };

    if (interaction.isModalSubmit() && interaction.customId === "modal_staff") {
        const canalform = interaction.guild.channels.cache.get(config.RECRUTAMENTO.canal_formulario)
        const nome1 = interaction.fields.getTextInputValue("nome");
        const idade1 = interaction.fields.getTextInputValue("idade");
        const pqdevemosteaceitar1 = interaction.fields.getTextInputValue("pqdevemosteaceitar");
        const hierarquia1 = interaction.fields.getTextInputValue("hierarquia");
        const regrasrp1 = interaction.fields.getTextInputValue("regrasrp");


        interaction.reply({ content: `${interaction.user} \n<:iconscorrect:1198037618361905345> | Seu Formulario Foi enviado com sucesso`, ephemeral: true })
        const ave = await canalform.send({
            embeds: [new Discord.EmbedBuilder()
                .setColor(config.embedcolor)
                .setDescription(`\n\n**Nome:** ${nome1}\n\n**Idade:** ${idade1}\n\n**Porque Deveriamos lhe aceitar?:** ${pqdevemosteaceitar1}\n\n**O que significa hierarquia e respeito?:** ${hierarquia1}\n\n**Cite-nos regras de roleplay que não podem faltar:** ${regrasrp1}
                `)
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Aceitar")
                            .setCustomId("aceitar_button")
                            .setEmoji("1198037618361905345")
                            .setStyle(Discord.ButtonStyle.Success)
                    )
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Negar")
                            .setCustomId("negar_button")
                            .setEmoji("1198037616956821515")
                            .setStyle(Discord.ButtonStyle.Danger)
                    )
            ]
        })
        await db.set(ave.id, {
            usuario: interaction.user.id,
        });

    }
}