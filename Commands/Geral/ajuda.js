const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
  name: "ajuda", // Coloque o nome do comando
  description: "[🦅 Utilidade] Painel de comandos do sistema policial.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let embed_painel = new Discord.EmbedBuilder()
    .setColor(config.embedcolor)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Olá ${interaction.user}, veja meus comandos interagindo com o painel abaixo:`)

    let embed_utilidade = new Discord.EmbedBuilder()
    .setColor(config.embedcolor)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Olá ${interaction.user}, veja meus comandos de **utilidade** abaixo:`)
    .addFields(
        { name: '</ajuda:1048932333937500200>', value: 'Comando destinado a descobrimento de novos comandos' },
        { name: '</ping:1048925084141764699>', value: 'Verifique a Latencia do bot e vejá se está com algum poblema' },
        { name: '</ponto:1048932333937500201>', value: 'Você pode gerencia seu ponto policial utilizando este comando' },
    );

    let embed_informacao = new Discord.EmbedBuilder()
    .setColor(config.embedcolor)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Olá ${interaction.user}, veja meus comandos de **Utilidades diversas** abaixo:`)
    .addFields(
        { name: '</botinfo:1048974880361689198>', value: 'Comando destinado a verificação de informações do bot.' },
        { name: '</user info:1048985205316259981>', value: 'Verifique as informações de um usuario' },
        { name: '</user banner:1048985205316259981>', value: 'Consiga Fazer Download do banner de um usuario especifico' },
        { name: '</user avatar:1048985205316259981>', value: 'Consiga Fazer Download do avatar de um usuario especifico' },
    
        );

    let embed_adm = new Discord.EmbedBuilder()
    .setColor(config.embedcolor)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Olá ${interaction.user}, veja meus comandos de **administração** abaixo:`)
    .addFields(
        { name: '</exonerar:1050082148910108732>', value: 'Realize o banimento de algum usuario do discord' },
        { name: '</clear:1048971271389597859>', value: 'Limpe o chate, apague quantas mensagems quiser de 0-99' },
        { name: '</anunciar:1049399820277780551>', value: 'Envie um anuncio de modo rapido e facil utilizando esse comando' },
    );

    let painel = new Discord.ActionRowBuilder().addComponents(
        new Discord.StringSelectMenuBuilder()
            .setCustomId("painel_help")
            .setPlaceholder("Clique aqui!")
            .addOptions(
                {
                    label: "Painel Inicial",
                    //description: "",
                    emoji: "📖",
                    value: "painel"
                },
                {
                    label: "Utilidade",
                    description: "Veja meus comandos de utilidade.",
                    emoji: "✨",
                    value: "utilidade"
                },
                {
                    label: "Informação",
                    description: "Veja meus comandos de informações.",
                    emoji: "📚",
                    value: "informacao"
                },
                {
                    label: "Administração",
                    description: "Veja meus comandos de administração.",
                    emoji: "🔨",
                    value: "adm"
                }
            )
    )

    interaction.reply({ embeds: [embed_painel], components: [painel], ephemeral: true }).then( () => {
        interaction.channel.createMessageComponentCollector().on("collect", (c) => {
            let valor = c.values[0];

            if (valor === "painel") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_painel] })
            } else if (valor === "utilidade") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_utilidade] })
            } else if (valor === "informacao") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_informacao] })
            } else if (valor === "adm") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_adm] })
            }
        })
    })


    
  }
}