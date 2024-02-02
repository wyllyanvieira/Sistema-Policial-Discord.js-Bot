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
    {
      name: 'ausencia',
      description: '[📚 Informação] crie a mensagem a respeito do formulario de ausencia',
      type: Discord.ApplicationCommandOptionType.Subcommand,

    },
  ],
  run: async (client, interaction) => {
    switch (interaction.options.getSubcommand()) {
      case 'relatorio': {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
          interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
          let embed_1 = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
            ## Sistema de Relatório de Prisão 🚔

            Prezado(a) Oficial,
            
            Este é o sistema de relatório de prisão, projetado para fornecer uma maneira eficiente e segura de documentar eventos relacionados a prisões. Por favor, utilize as opções abaixo para relatar qualquer ocorrência:
            Se você precisa verificar informações específicas em um relatório já existente, consulte um Comandante.

            Lembramos que a precisão e a veracidade das informações são essenciais para manter a integridade do sistema. Siga as instruções de forma clara e objetiva.
            Para iniciar, utilize o botão abaixo para abertura de um formulario de prisão. Nossa equipe está disponível para auxiliá-lo no processo de relatório de prisão.
            
            Agradecemos pela colaboração na manutenção da segurança e ordem. 🛡️
            `)
            .setColor(config.embedcolor)
            .setFooter({ text: 'Desenvolvido por @wyllyan.br'});

          let buttonprisao = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('buttonprisao')
                .setEmoji("1198037614087909416")
                .setLabel('Realize um relatorio!')
                .setStyle(3),
            );
          interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Mensagem enviada com sucesso.`, ephemeral: true })
          interaction.channel.send({ embeds: [embed_1], components: [buttonprisao] })


        }
        break;
      }
      case 'ponto': {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
          interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
          let embed_2 = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
            ## Olá, Oficial! 👋

            Seja bem-vindo ao sistema de controle de ponto automatizado. Aqui, você pode registrar seu horário de trabalho de forma rápida e eficiente. Utilize os botões abaixo para realizar as operações desejadas:

            <:newmember:1197986072039264266> **Abrir Ponto** 
            Clique neste botão para iniciar o registro do seu expediente. Lembre-se de fazer isso no início do seu dia de trabalho.

            <:member:1197986380781985903> **Fechar Ponto** 
            Ao encerrar suas atividades diárias, clique neste botão para registrar o término do expediente.

            Mantenha seus registros em dia e garanta uma gestão eficiente do seu tempo de trabalho. Em caso de dúvidas, entre em contato com os Comandantes ou a equipe de desenvolvimento do BOT.
            `)
            .setColor(config.embedcolor)
            .setFooter({ text: 'Desenvolvido por @wyllyan.br'});

          let buttonponto = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('abrir_ponto')
                .setLabel('Abrir Ponto')
                .setEmoji('1197986072039264266')
                .setStyle(3),
              new Discord.ButtonBuilder()
                .setCustomId('fechar_ponto')
                .setLabel('Fechar Ponto')
                .setEmoji('1197986380781985903')
                .setStyle(4)
            );
          interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Mensagem enviada com sucesso.`, ephemeral: true })
          interaction.channel.send({ embeds: [embed_2], components: [buttonponto] })


        }
        break;
      }
      case 'ausencia': {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
          interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
          let embed_2 = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
            ## Olá, Bem-vindo ao Sistema de Ausência! 👋
            Nesta etapa, por favor, informe a data do seu afastamento. Após preenchimento, sua presença no bate-ponto será desabilitada temporariamente.
            
            **Regras para Solicitação de Ausência:**
            Precisão da Data:
            Forneça a data precisa do início e término do seu afastamento. Erros podem acarretar em problemas na gestão do seu tempo de ausência.
            
            **Antecedência:**
            Solicite sua ausência com antecedência mínima estipulada pela empresa. Pedidos tardios podem não ser considerados.
            
            **Atenção aos Detalhes:**
            Certifique-se de preencher todos os campos corretamente. Informações incompletas podem atrasar o processamento do seu pedido.
            
            **Confirmação de Envio:**
            Após preencher o formulário, aguarde a confirmação do sistema sobre o recebimento do seu pedido de ausência.
            
            Por favor, preencha a data do seu afastamento abaixo:
            Agradecemos sua colaboração para manter o registro preciso da sua presença.

            `)
            .setColor(config.embedcolor)
            .setFooter({ text: 'Desenvolvido por @wyllyan.br'});

          let buttonponto = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('formausencia')
                .setLabel('Solicitar Ausencia')
                .setEmoji('1197986061750632598')
                .setStyle(2)
            );
          interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Mensagem enviada com sucesso.`, ephemeral: true })
          interaction.channel.send({ embeds: [embed_2], components: [buttonponto] })


        }
        break;
      }
      case 'ticket': {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
          interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilzar este comando!`, ephemeral: true })
        } else {
          let embed = new Discord.EmbedBuilder()
            .setColor(config.embedcolor)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(`Sistema de Tickets - Central de Suporte 🎫

            Olá, Oficial! Estamos aqui para te ajudar. Selecione a opção que melhor descreve a natureza do seu problema e abra um ticket para receber suporte personalizado.
            
            > **⭐ Upamentos**
            Abra um Ticket para solicitar upamentos. Estamos prontos para ajudar a melhorar sua experiência.

            > **🚨 Denúncias**
            Abra um ticket para reportar qualquer incidente ou realizar uma denúncia referente a um oficial. Sua segurança é nossa prioridade.

            > **🦅 Outros**
            Abra um ticket para qualquer outro motivo diverso que não se enquadre nas categorias acima.

            Estamos aqui para resolver suas dúvidas e problemas.
            Para abrir um ticket, reaja a esta mensagem com o emoji correspondente à sua escolha. Nossa equipe estará pronta para atender sua solicitação e fornecer a assistência necessária.
            
            Agradecemos por escolher nossos serviços! 🌟`)
            .setFooter({ text: 'Desenvolvido por @wyllyan.br'});
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

          interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Mensagem enviada com sucesso.`, ephemeral: true })
          interaction.channel.send({ embeds: [embed], components: [painel] })
        }

      }
    }
  }
}