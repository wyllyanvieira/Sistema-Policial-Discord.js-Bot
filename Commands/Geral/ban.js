const Discord = require("discord.js")
const config =  require("../../config.json")

module.exports = {
  name: "exonerar",
  description: "[👑 Moderação] Banir um usuário.", 
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "user",
        description: "Mencione o usuário que queira banir para ser banido.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Insira o motivo do banimento.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "provas",
        description: "Forneça uma evidência para o aviso. Você pode enviar essas imagens para um site.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false
    },
],

  run: async (client, interaction) => {


    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply({ content: `<:icons_Wrong75:1198037616956821515> | Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let userr = interaction.options.getUser("user");
        let user = interaction.guild.members.cache.get(userr.id)
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "Não Descrito.";
        let evidence = interaction.options.getString("provas") || "Nenhuma Prova Anexada"
    
        user.ban({ reason: [motivo] }).then( () => {
            interaction.reply({content: '<:iconscorrect:1198037618361905345> | *O usuario foi exonerado com sucesso*', ephemeral: true})
            let canallogexoneras = interaction.guild.channels.cache.get(config.ADVERTENCIAS.exonerascanator);
            let embed_anuncio_exoneras = new Discord.EmbedBuilder()
            .setColor(config.embedcolor)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
            .setDescription(`MTD Policia informa que o Oficial  ${target}, recebeu a seguinte punição :  **EXONERAÇÃO**`)
            .addFields(
                { name: 'Oficial exonerado:', value: `${user.username}` },
                { name: 'Motivo da Exoneração', value: `${motivo}` },
                { name: 'Provas', value: `${evidence}` },
            );
            canallogexoneras.send({ embeds: [embed_anuncio_exoneras] })
        }).catch(e => {
            interaction.reply({content: '<:icons_Wrong75:1198037616956821515> | Não consigo banir esse usúario, pois não tenho as devidas permissoes.', ephemeral: true})
        })


  }}}
