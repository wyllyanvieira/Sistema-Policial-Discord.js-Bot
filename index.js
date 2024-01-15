const Discord = require("discord.js");
const sqlite3 = require('sqlite3');
const config = require("./config.json");
const fs = require("fs");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds
  ]
});




client.on("ready", () => {
  console.log(`📡 Estou online como ${client.user.username}, tudo menos RECEBA pq o thomas não gosta!`)
})


client.login(config.token)

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Handlers _______________________________________


client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////TICEKT SYSTEM////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const discordTranscripts = require('discord-html-transcripts');
client.on("interactionCreate", (interaction) => {
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "painel_ticket") {
      let opc = interaction.values[0]
      if (opc === "upamento") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `⭐・${interaction.user.username}`;
        let categoria = "1173693036975362209" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
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
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
              .setColor(config.embedcolor)
              .setAuthor({ name: `${interaction.user.username} | Ticket` })
              .setThumbnail(client.user.displayAvatarURL())
              .setDescription(`Olá ${interaction.user}, você abriu um ticket referente a upamento por favor seja especifico e seja o mais breve possivel, pedimos que não fique mencionando o Auto Escalao sem nessecidade.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("fechar_ticket")
                .setLabel("Fechar Ticket")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)
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
        let categoria = "1173692895644110848" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
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
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
              .setColor(config.embedcolor)
              .setAuthor({ name: `${interaction.user.username} | Ticket` })
              .setThumbnail(client.user.displayAvatarURL())
              .setDescription(`Olá ${interaction.user}, você abriu o ticket referente a denuncia pedimos que seja especifico e apresente suas provas, lembrando que as denunicas e um assunto serio e pedimos que mantenha a forma.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("fechar_ticket")
                .setLabel("Fechar Ticket")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)
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
        let categoria = "1173692895644110848" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
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
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })

            let embed = new Discord.EmbedBuilder()
              .setColor(config.embedcolor)
              .setAuthor({ name: `${interaction.user.username} | Ticket` })
              .setThumbnail(client.user.displayAvatarURL())
              .setDescription(`Olá ${interaction.user}, você abriu o ticket por assuntos diversos seja especifico para podermos resolver seu poblema o mais rapido possivel.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("fechar_ticket")
                .setLabel("Fechar Ticket")
                .setLabel("Fechar Ticket")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)

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
)

client.on("interactionCreate", async (interaction) => {
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
          interaction.channel.send({ content: `⏳ | Ação Solicitada! este ticket será excluído em 5 segundos...` })

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
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////RELATORIO PRENDER SYSTEM////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId.startsWith('buttonprisao')) {
    let textinput_id = new Discord.TextInputBuilder()
      .setCustomId('textinput_id')
      .setLabel('Digite nome e passaporte do cidadão')
      .setStyle(Discord.TextInputStyle.Short)
      .setPlaceholder('Digite ID e Nome (In-Game)')
      .setRequired(true)

    let textinput_descricao = new Discord.TextInputBuilder()
      .setCustomId('textinput_descricao')
      .setLabel('Descreva o ocorrido para execultar a prisão')
      .setStyle(Discord.TextInputStyle.Paragraph)
      .setMinLength(2) // Minimo de 2 digitos.
      .setMaxLength(2500) // Max de 25 digitos, aumente se precisar.
      .setPlaceholder('Digite até 2500 Caracteres.')
      .setRequired(true)

    let textinput_pena = new Discord.TextInputBuilder()
      .setCustomId('textinput_pena')
      .setLabel('Descreva quantos meses foram aplicados ')
      .setStyle(Discord.TextInputStyle.Short)
      .setMinLength(1) // Minimo de 1 digitos.
      .setMaxLength(100) // Max de 25 digitos, aumente se precisar.
      .setPlaceholder('Digite apenas numeros')
      .setRequired(true)

    let textinput_multa = new Discord.TextInputBuilder()
      .setCustomId('textinput_multa')
      .setLabel('Descreva os Artigos que foi aplicado')
      .setStyle(Discord.TextInputStyle.Short)
      .setMinLength(1) // Minimo de 1 digitos.
      .setMaxLength(100) // Max de 25 digitos, aumente se precisar.
      .setPlaceholder('Digite apenas numeros')
      .setRequired(true)

    let textinput_oficiais = new Discord.TextInputBuilder()
      .setCustomId('textinput_oficiais')
      .setLabel('Descreva o codigo do distintivo dos oficiais')
      .setStyle(Discord.TextInputStyle.Short)
      .setMinLength(1) // Minimo de 1 digitos.
      .setMaxLength(1000) // Max de 25 digitos, aumente se precisar.
      .setPlaceholder('Digite apenas numeros')
      .setRequired(true)

    const modal_sugest = new Discord.ModalBuilder()
      .setCustomId('modal_sugest')
      .setTitle('Sistema de relatorio de prisão')

    const umActionRow = new Discord.ActionRowBuilder().addComponents(textinput_id);
    const doisActionRow = new Discord.ActionRowBuilder().addComponents(textinput_descricao);
    const tresActionRow = new Discord.ActionRowBuilder().addComponents(textinput_oficiais);
    const quatroActionRow = new Discord.ActionRowBuilder().addComponents(textinput_pena);
    const cincoActionRow = new Discord.ActionRowBuilder().addComponents(textinput_multa);

    modal_sugest.addComponents(umActionRow, doisActionRow, tresActionRow, quatroActionRow, cincoActionRow);

    await interaction.showModal(modal_sugest)
  }


})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'modal_sugest') {
    let canalModel = "1196457721982103703"; // Coloque o ID do canal
    let channelModal = client.channels.cache.get(canalModel)  // Enviar a avaliação pro canal


    const ftextinput_idname = interaction.fields.getTextInputValue("textinput_id");
    const ftextinput_desc = interaction.fields.getTextInputValue("textinput_descricao");
    const ftextinput_oficiais = interaction.fields.getTextInputValue("textinput_oficiais");
    const ftextinput_pena = interaction.fields.getTextInputValue("textinput_pena");
    const ftextinput_multa = interaction.fields.getTextInputValue("textinput_multa");


    interaction.reply({
      content: `Olá ${interaction.user}, seu realtorio foi computado. Agradecemos pelo apoio!`,
      ephemeral: true
    });

    channelModal.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor("#2f3136")
          .setAuthor({ name: `📃 Documentação enviada por — ${interaction.user.username}` })
          .setThumbnail(interaction.user.displayAvatarURL({ dinamyc: true }))
          .setFields(
            {
              name: '🆔 Passaporte e nome do Cidadão',
              value: `\`${ftextinput_idname}\``,
              inline: true
            },
            {
              name: '<:handcuffs:1067036336709713970> Pena de Prisão',
              value: `\`${ftextinput_pena} Meses\``,
              inline: true
            },
            {
              name: '<:money:1067066860530581624> Artigos Aplicada',
              value: `\`Arts. ${ftextinput_multa}\``,
              inline: true
            },
            {
              name: '👮‍♂️ Policiais que participaram da QRU (DISTINTIVO)',
              value: `\`${ftextinput_oficiais}\``,
              inline: true
            },
            {
              name: '📃 Descrição da QRU',
              value: `\`\`\`${ftextinput_desc}\`\`\``,
              inline: false
            },
          )

      ]
    });
  }


})

const arquivoBanco = 'pontos.db';
const canalLogId = '1171428420194926653'; // Substitua com o ID do canal de log

const db = new sqlite3.Database(arquivoBanco);

// Cria a tabela se ela não existir
db.run(`
  CREATE TABLE IF NOT EXISTS pontos (
    usuario_id TEXT PRIMARY KEY,
    aberto INTEGER,
    intervalos TEXT
  )
`);

function formatarTempo(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;

  return `${horas}h ${minutos}m ${segundosRestantes.toFixed(0)}s`;
}


client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  const idUsuario = interaction.user.id;

  // Verifica se o usuário existe no banco de dados
  db.get('SELECT * FROM pontos WHERE usuario_id = ?', [idUsuario], async (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

    if (!row) {
      // Se o usuário não existir, adiciona ao banco de dados
      db.run('INSERT INTO pontos (usuario_id, aberto, intervalos) VALUES (?, NULL, "[]")', [idUsuario]);
    }

    if (interaction.customId === 'abrir_ponto') {
      // Atualiza o campo 'aberto' no banco de dados
      db.run('UPDATE pontos SET aberto = ? WHERE usuario_id = ?', [Date.now(), idUsuario], (err) => {
        if (err) console.error(err);
      });

      await interaction.reply({ content: '✅ | Ponto aberto!', ephemeral: true });
      const canalLog = client.channels.cache.get(canalLogId);

      let rowpontoc = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("fechar_ponto")
          .setLabel("Fechar Ponto")
          .setEmoji("❌")
          .setStyle(Discord.ButtonStyle.Danger),
      )
      if (canalLog) {
        canalLog.send({ content: `> ✅ | Ponto do usuário ${interaction.user} aberto.`, components: [rowpontoc] });
      }
    } else if (interaction.customId === 'fechar_ponto' ) {
      if (row.aberto) {
        const fechado = new Date();
        const aberto = new Date(row.aberto);
        const intervalo = (fechado - aberto) / 1000;

        // Atualiza o banco de dados com o intervalo
        const novosIntervalos = JSON.parse(row.intervalos);
        novosIntervalos.push(intervalo);

        db.run('UPDATE pontos SET aberto = NULL, intervalos = ? WHERE usuario_id = ?', [JSON.stringify(novosIntervalos), idUsuario], (err) => {
          if (err) console.error(err);
        });

        await interaction.reply({ content: `> 🙋 | Ponto fechado! Intervalo: ${formatarTempo(intervalo)}`, ephemeral: true });
        const canalLog = client.channels.cache.get(canalLogId);
        if (canalLog) {
          canalLog.send(`> 🙋 | Ponto do usuário ${interaction.user} fechado com ${formatarTempo(intervalo)}.`);
        }
      } else {
        await interaction.reply({ content: '> :x: | Você não tem um ponto aberto.', ephemeral: true });
      }
    }
  });
});