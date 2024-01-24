const Discord = require("discord.js");
const sqlite3 = require("sqlite3");
const config = require("../config.json");

const arquivoBanco = 'recrutamento.db';
const db = new sqlite3.Database(arquivoBanco);

module.exports = async (client, interaction) => {

    if (interaction.isButton() && interaction.customId === "formulario_recrutamento") {
        const modal = new Discord.ModalBuilder()
            .setCustomId("modal_recrutamento")
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

    if (interaction.isModalSubmit() && interaction.customId === "modal_recrutamento") {
        const canalform = interaction.guild.channels.cache.get(config.RECRUTAMENTO.canal_formulario)
        const nome1 = interaction.fields.getTextInputValue("nome");
        const idade1 = interaction.fields.getTextInputValue("idade");
        const pqdevemosteaceitar1 = interaction.fields.getTextInputValue("pqdevemosteaceitar");
        const hierarquia1 = interaction.fields.getTextInputValue("hierarquia");
        const regrasrp1 = interaction.fields.getTextInputValue("regrasrp");

        interaction.reply({ content: `${interaction.user} \n<:iconscorrect:1198037618361905345> | Seu Formulario Foi enviado com sucesso`, ephemeral: true })
        const ave = await canalform.send({
            embeds: [new Discord.MessageEmbed()
                .setColor(config.embedcolor)
                .setTitle(`Formulario Recebido de ${interaction.user}` )
                .setDescription(`\n\n**Nome:** ${nome1}\n**Idade:** ${idade1}\n**Porque Deveriamos lhe aceitar?:** ${pqdevemosteaceitar1}\n**O que significa hierarquia e respeito?:** ${hierarquia1}\n**Cite-nos regras de roleplay que não podem faltar:** ${regrasrp1}
                `)
            ],
            components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Aprovar Candidato")
                            .setCustomId("aceitar_button")
                            .setEmoji("1198037618361905345")
                            .setStyle(Discord.ButtonStyle.Success)
                    )
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Reprovar Candidato")
                            .setCustomId("negar_button")
                            .setEmoji("1198037616956821515")
                            .setStyle(Discord.ButtonStyle.Danger)
                    )
            ]
        })

        // Inserir dados no banco de dados SQLite
        db.run('INSERT INTO recrutamento (mensagem_id, usuario_id) VALUES (?, ?)', [ave.id, interaction.user.id], (err) => {
            if (err) console.error(err);
        });
    }
}
