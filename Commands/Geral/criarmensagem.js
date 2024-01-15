const Discord = require("discord.js")
const config = require("../../config.json")


module.exports = {
  name: 'criarmensagem',
  description: 'subcommand de user',
  options: [
    {
      name: 'relatorio',
      description: '[📚 Informação] crie a mensagem a respeito da criação do relatorio',
      type: Discord.ApplicationCommandOptionType.Subcommand,

    },
    {
      name: 'ticket',
      description: '[📚 Informação] crie a mensagem a respeito da criação do ticket',
      type: Discord.ApplicationCommandOptionType.Subcommand,

    },
    {
      name: 'ponto',
      description: '[📚 Informação] crie a mensagem a respeito da criação do ticket',
      type: Discord.ApplicationCommandOptionType.Subcommand,

    },
  ],
  run: async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
      case 'relatorio': {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
          interaction.reply({ content: `:x: | Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
          let embed_1 = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
            Como toda policia nós precisamos documentar toda e qualquer prisão use o botão e preencha o formulario para realizar um relato do cidadão que sofreu uma prisão
            `)
            .setColor(config.embedcolor);

          let buttonprisao = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('buttonprisao')
                .setEmoji("1067036336709713970")
                .setLabel('Realize um relatorio!')
                .setStyle(3),
            );
          interaction.reply({ content: `✅ | Mensagem enviada com sucesso.`, ephemeral: true })
          interaction.channel.send({ embeds: [embed_1], components: [buttonprisao] })


        }
        break;
      }
      case 'ponto': {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
          interaction.reply({ content: `:x: | Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
          let embed_2 = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
            Como toda policia nós precisamos documentar o bate-ponto.
            Clique para abrir ou fechar o ponto:
            `)
            .setColor(config.embedcolor);

          let buttonponto = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('abrir_ponto')
                .setLabel('Abrir Ponto')
                .setStyle(3),
              new Discord.ButtonBuilder()
                .setCustomId('fechar_ponto')
                .setLabel('Fechar Ponto')
                .setStyle(4)
            );
          interaction.reply({ content: `✅ | Mensagem enviada com sucesso.`, ephemeral: true })
          interaction.channel.send({ embeds: [embed_2], components: [buttonponto] })


        }
        break;
      }
      case 'ticket': {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
          interaction.reply({ content: `:x: | Você não possui permissão para utilzar este comando!`, ephemeral: true })
        } else {
          let embed = new Discord.EmbedBuilder()
            .setColor(config.embedcolor)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(`🤖 **Sistema de suporte ao oficial:**\n
              Para ter acesso direto a nossa equipe de vendas / atendimento, reaja no botão abaixo e aguarde algum membro da equipe responder o seu ticket.\n
              📃 **Tópicos de atendimentos:** Upamentos, Denuncia & Outros.`);

          let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
              .setCustomId("painel_ticket")
              .setPlaceholder("Clique aqui!")
              .addOptions(
                {
                  label: "⭐ Upamentos",
                  description: "Abra um Ticket para realização de upamento.",
                  value: "upamento"
                },
                {
                  label: "🚨 Denuncias",
                  description: "Abra um ticket para realizar um denuncia referete a um oficial",
                  value: "denuncia"
                },
                {
                  label: "🦅 Outros",
                  description: "Abra um ticket para um motivo diverso.",
                  value: "outros"
                }
              )
          );

          interaction.reply({ content: `✅ | Mensagem enviada com sucesso.`, ephemeral: true })
          interaction.channel.send({ embeds: [embed], components: [painel] })
        }

      }
    }
  }
}