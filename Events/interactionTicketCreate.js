const config = require("../config.json"); // Substitua pelo caminho real do seu arquivo de configuração
const Discord = require("discord.js");

module.exports = async (client, interaction) => {
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "painel_ticket") {
        let opc = interaction.values[0]
        if (opc === "upamento") {
  
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // Nova opção
  
          let nome = `⭐・${interaction.user.username}`;
          let categoria = config.TICKET.categoria
  
          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
  
          if (interaction.guild.channels.cache.find(c => c.name === nome)) {
            interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
              name: nome,
              type: Discord.ChannelType.GuildText,
              parent: categoria,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [
                    Discord.PermissionFlagsBits.ViewChannel
                  ]
                },
                {
                  id: interaction.user.id,
                  allow: [
                    Discord.PermissionFlagsBits.ViewChannel,
                    Discord.PermissionFlagsBits.SendMessages,
                    Discord.PermissionFlagsBits.AttachFiles,
                    Discord.PermissionFlagsBits.EmbedLinks,
                    Discord.PermissionFlagsBits.AddReactions
                  ]
                }
              ]
            }).then((ch) => {
              interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
              let embed = new Discord.EmbedBuilder()
                .setColor(config.embedcolor)
                .setAuthor({ name: `${interaction.user.username} | Ticket` })
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`Olá ${interaction.user}, você abriu um ticket referente a upamento por favor seja especifico e seja o mais breve possivel, pedimos que não fique mencionando o Auto Escalao sem nessecidade.`);
              let botao = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId("fechar_ticket")
                  .setLabel("Fechar Ticket")
                  .setEmoji("1197986783808471171")
                  .setStyle(Discord.ButtonStyle.Danger),
                //  new Discord.ButtonBuilder()
                //  .setCustomId("addmemberchannel")
                //  .setLabel("Adcionar Usuario")
                //  .setEmoji("1197986072039264266")
                //  .setStyle(Discord.ButtonStyle.Danger)
              );
  
              ch.send({ embeds: [embed], components: [botao] }).then(m => {
                m.pin()
              })
            })
          }
  
        } else if (opc === "denuncia") {
  
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // Nova opção
  
          let nome = `🚨・${interaction.user.username}}`;
          let categoria = config.TICKET.categoria
  
          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
  
          if (interaction.guild.channels.cache.find(c => c.name === nome)) {
            interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
              name: nome,
              type: Discord.ChannelType.GuildText,
              parent: categoria,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [
                    Discord.PermissionFlagsBits.ViewChannel
                  ]
                },
                {
                  id: interaction.user.id,
                  allow: [
                    Discord.PermissionFlagsBits.ViewChannel,
                    Discord.PermissionFlagsBits.SendMessages,
                    Discord.PermissionFlagsBits.AttachFiles,
                    Discord.PermissionFlagsBits.EmbedLinks,
                    Discord.PermissionFlagsBits.AddReactions
                  ]
                }
              ]
            }).then((ch) => {
              interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
              let embed = new Discord.EmbedBuilder()
                .setColor(config.embedcolor)
                .setAuthor({ name: `${interaction.user.username} | Ticket` })
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`Olá ${interaction.user}, você abriu o ticket referente a denuncia pedimos que seja especifico e apresente suas provas, lembrando que as denunicas e um assunto serio e pedimos que mantenha a forma.`);
              let botao = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId("fechar_ticket")
                  .setLabel("Fechar Ticket")
                  .setEmoji("1197986783808471171")
                  .setStyle(Discord.ButtonStyle.Danger),
                 // new Discord.ButtonBuilder()
                 // .setCustomId("addmemberchannel")
                 // .setLabel("Adcionar Usuario")
                 // .setEmoji("1197986072039264266")
                 // .setStyle(Discord.ButtonStyle.Danger)
              );
  
              ch.send({ embeds: [embed], components: [botao] }).then(m => {
                m.pin()
              })
            })
          }
  
        } else if (opc === "outros") {
  
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // Nova opção
  
          let nome = `📨・${interaction.user.username}`;
          let categoria = config.TICKET.categoria
  
          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
  
          if (interaction.guild.channels.cache.find(c => c.name === nome)) {
            interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
              name: nome,
              type: Discord.ChannelType.GuildText,
              parent: categoria,
              permissionOverwrites: [
                {
                  id: interaction.guild.id,
                  deny: [
                    Discord.PermissionFlagsBits.ViewChannel
                  ]
                },
                {
                  id: interaction.user.id,
                  allow: [
                    Discord.PermissionFlagsBits.ViewChannel,
                    Discord.PermissionFlagsBits.SendMessages,
                    Discord.PermissionFlagsBits.AttachFiles,
                    Discord.PermissionFlagsBits.EmbedLinks,
                    Discord.PermissionFlagsBits.AddReactions
                  ]
                }
              ]
            }).then((ch) => {
              interaction.reply({ content: `<:iconscorrect:1198037618361905345> | Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
  
              let embed = new Discord.EmbedBuilder()
                .setColor(config.embedcolor)
                .setAuthor({ name: `${interaction.user.username} | Ticket` })
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`Olá ${interaction.user}, você abriu o ticket por assuntos diversos seja especifico para podermos resolver seu poblema o mais rapido possivel.`);
              let botao = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId("fechar_ticket")
                  .setLabel("Fechar Ticket")
                  .setEmoji("1197986783808471171")
                  .setStyle(Discord.ButtonStyle.Danger),
                //  new Discord.ButtonBuilder()
                //  .setCustomId("addmemberchannel")
                //  .setLabel("Adcionar Usuario")
                //  .setEmoji("1197986072039264266")
                //  .setStyle(Discord.ButtonStyle.Danger)
  
              );
  
              ch.send({ embeds: [embed], components: [botao] }).then(m => {
                m.pin()
              })
            })
          }
  
        }
      }
    }
  
  }
  