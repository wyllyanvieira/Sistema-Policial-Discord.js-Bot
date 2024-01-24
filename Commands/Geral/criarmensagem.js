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
      name: 'recrutamento',
      description: '[📚 Informação] crie a mensagem a respeito do formulario de recrutamento',
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
      case 'recrutamento': {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
          interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
          let embed_2 = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.username })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
            ## Olá, Seja bem-vindo ao Sistema de Recrutamento da ROTA! 👋

            Nesta primeira fase, você preencherá um formulário de recrutamento para que possamos conhecê-lo melhor. Para garantir um processo justo e eficiente, algumas regras foram estabelecidas para este formulário.
            
            ### Regras para o Formulário de Recrutamento:
            
            1. **Veracidade das Informações:**
               Certifique-se de fornecer informações precisas e verdadeiras. Qualquer informação falsa resultará na desqualificação do processo.
            
            2. **Respeito às Normas Éticas:**
               Mantenha um tom respeitoso e ético em todas as respostas. A conduta inadequada pode impactar negativamente sua avaliação.
            
            3. **Prazo de Envio:**
               O formulário deve ser preenchido dentro do prazo estipulado. Envios fora do prazo não serão considerados.
            
            4. **Confidencialidade:**
               Todas as informações fornecidas serão tratadas com a máxima confidencialidade. Elas serão utilizadas apenas para avaliação no processo de recrutamento.
            
            Agora, por favor, preencha o formulário abaixo com cuidado e atenção:
            Agradecemos pelo seu interesse em fazer parte da ROTA! Após preencher o formulário, aguarde instruções sobre a próxima etapa do processo de recrutamento.
            
            Boa sorte! 🌟
            `)
            .setColor(config.embedcolor)
            .setFooter({ text: 'Desenvolvido por @wyllyan.br'});

          let buttonponto = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setCustomId('formulario_recrutamento')
                .setLabel('Realizar Prova')
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

            > **🦅 Outros**Abra um ticket para qualquer outro motivo diverso que não se enquadre nas categorias acima.

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